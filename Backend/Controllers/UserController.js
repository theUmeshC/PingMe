import Users from "../Modules/Users.js";
import { v4 as uuidv4 } from "uuid";

export const loginUser = async (req, res) => {
  const { user } = req.body;
  const uEmail = user?.email;

  try {
    const databaseUser = await Users.findAll({ where: { email: uEmail } }).then(
      ([presentUser]) => {
        return presentUser;
      }
    );
    console.log(databaseUser);
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
    } else {
      await Users.findAll({ where: { email: uEmail } })
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

export const logoutUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await Users.findOne({ where: { user_id: userId } });
    if (user) {
      user.status = "offline";
      await user.save();
      return res.json("logged out");
    } else {
      console.log("user not found");
    }
  } catch (error) {
    res.status(401).json({ err: "server error" });
  }
};
