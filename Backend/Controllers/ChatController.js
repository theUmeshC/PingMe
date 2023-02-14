import { v4 as uuidv4 } from "uuid";

import pool from "../utils/pool.js";

export const add_private_connection = (req, res) => {
  // user_private_connections.create({
  //   sender_id: req.body.sender_id,
  //   receiver_id: req.body.receiver_id,
  //   chat_id: req.body.chat_id,
  // });
};

export const addFriend = async (req, res) => {
  const { senderId, receiverId } = req.body;

  // const whereCondition = {
  //   [Op.or]: [
  //     {
  //       [Op.and]: [
  //         {
  //           receiver_id: receiverId,
  //         },
  //         {
  //           sender_id: senderId,
  //         },
  //       ],
  //     },
  //     {
  //       [Op.and]: [
  //         {
  //           sender_id: receiverId,
  //         },
  //         {
  //           receiver_id: senderId,
  //         },
  //       ],
  //     },
  //   ],
  // };
  // const connect = await user_private_connections
  //   .findAll({
  //     where: whereCondition,
  //   })
  //   .then(([data]) => data);
  // if (!connect) {
  //   await user_private_connections
  //     .create({
  //       chat_id: uuidv4(),
  //       sender_id: senderId,
  //       receiver_id: receiverId,
  //     })
  //     .then((data) => res.json(data))
  //     .catch((err) => res.error(err));
  // }

  const [connect] = (
    await pool.query(
      "SELECT * FROM friends where (sender_id = $1 and receiver_id =$2) or (sender_id = $2 and receiver_id =$1)",
      [senderId, receiverId]
    )
  ).rows;
    console.log(connect)
  if (!connect) {
    const data = (
      await pool.query("INSERT INTO friends values($1, $2, $3)", [
        uuidv4(),
        senderId,
        receiverId,
      ])
    ).rows;
    console.log('added to friends');
    res.json({ data, message: "added to friends list" });
  } else {
    console.log('already friends');
    res.json({ message: "already friends" });
  }
};

export const get_all_users = async (req, res) => {
  const { userId } = req.body;
  try {
    const users = (
      await pool.query("select * from users where user_id != $1", [userId])
    ).rows;
    console.log(users);
    res.json(users);
  } catch (error) {
    return res.error(error);
  }
  // try {
  //   const users = await Users.findAll({
  //     where: { user_id: { [Op.not]: `${userId}` } },
  //   })
  //     .then((users) => users)
  //     .catch((err) => console.log(err));
  //   return res.json(users);
  // } catch (error) {
  //   return res.error(error);
  // }
};

export const getFriends = async (req, res) => {
  const { userId } = req.body;
  let friends = [];
  const data = (
    await pool.query(
      "select users.* , friends.chat_id from users inner join friends on users.user_id = friends.sender_id AND friends.receiver_id= $1",
      [userId]
    )
  ).rows;
  friends = [...data];
  res.json(friends);
  console.log(friends, "asdjkassss");
};
