import { v4 as uuidv4 } from "uuid";

import { user_private_connections } from "../Modules/Connections.js";
import Users from "../Modules/Users.js";
import { Sequelize } from "sequelize";

const Op = Sequelize.Op;

export const add_private_connection = (req, res) => {
  user_private_connections.create({
    sender_id: req.body.sender_id,
    receiver_id: req.body.receiver_id,
    chat_id: req.body.chat_id,
  });
};

export const addFriend = async (req, res) => {
  const { senderId, receiverId } = req.body;
  const whereCondition = {
    [Op.or]: [
      {
        [Op.and]: [
          {
            receiver_id: receiverId,
          },
          {
            sender_id: senderId,
          },
        ],
      },
      {
        [Op.and]: [
          {
            sender_id: receiverId,
          },
          {
            receiver_id: senderId,
          },
        ],
      },
    ],
  };
  const connect = await user_private_connections
    .findAll({
      where: whereCondition,
    })
    .then(([data]) => data);
  if (!connect) {
    await user_private_connections
      .create({
        chat_id: uuidv4(),
        sender_id: senderId,
        receiver_id: receiverId,
      })
      .then((data) => res.json(data))
      .catch((err) => res.error(err));
  }
};

export const get_all_users = async (req, res) => {
  const { userId } = req.body;

  try {
    const users = await Users.findAll({
      where: { user_id: { [Op.not]: `${userId}` } },
    })
      .then((users) => users)
      .catch((err) => console.log(err));
    return res.json(users);
  } catch (error) {
    return res.error(error);
  }
};
