import Users from "../Modules/Users.js";
import { v4 as uuidv4 } from 'uuid';


export const loginUser = async (req, res) => {
  const { user } = req.body;
  try {
    const databaseUser = await Users.findAll({
      Where: { email: user.email },
    }).then(([presentUser]) => {
      return presentUser;
    });
    if (!databaseUser) {
      await Users.create({
        user_id: uuidv4(),
        username: user.name,
        first_name: user.given_name,
        last_name: user.family_name,
        email: user.email,
        status: "online",
      })
        .then((data) => {
          return res.json(data);
        })
        .catch((err) => console.log(err));
      console.log("hi");
    } else {
      Users.findAll({ Where: { email: user.email } })
        .then(([presentUser]) => {
          presentUser.status = "online";
          return presentUser.save();
        })
        .then((data) => res.json(data))
        .catch((err) => console.log(err));
    }
  } catch (error) {
    res.status(401).json({ err: "server error" });
  }
};
