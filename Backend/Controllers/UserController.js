import { v4 as uuidv4 } from "uuid";
import pool from "../utils/pool.js";

export const loginUser = async (req, res) => {
  const { user } = req.body;
  const uEmail = user.email;

  try {
    const databaseUser = (
      await pool.query("select username from users where email = $1", [uEmail])
    ).rows;

    if (databaseUser.length > 0) {
      await pool.query("UPDATE users SET status = $1 where email=$2", [
        "online",
        uEmail,
      ]);
      const [userDb] = (
        await pool.query("select * from users where email = $1", [uEmail])
      ).rows;
      res.json(userDb);
    } else {
      await pool.query("Insert into users values($1, $2, $3, $4, $5, $6)", [
        uuidv4(),
        user.name,
        user.given_name,
        user.family_name,
        user.email,
        "offline",
      ]);
      const [userDb] = (
        await pool.query("select * from users where email = $1", [uEmail])
      ).rows;
      res.json(userDb);
    }
  } catch (error) {
    res.status(401).json({ err: "server error" });
  }

  // try {
  //   const databaseUser = await Users.findAll({ where: { email: uEmail } }).then(
  //     ([presentUser]) => {
  //       return presentUser;
  //     }
  //   );
  //   if (!databaseUser) {
  //     await Users.create({
  //       user_id: uuidv4(),
  //       username: user.name,
  //       first_name: user.given_name,
  //       last_name: user.family_name,
  //       email: user.email,
  //       status: "online",
  //     })
  //       .then((data) => {
  //         return res.json(data);
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     await Users.findAll({ where: { email: uEmail } })
  //       .then(([presentUser]) => {
  //         presentUser.status = "online";
  //         return presentUser.save();
  //       })
  //       .then((data) => res.json(data))
  //       .catch((err) => console.log(err));
  //   }
  // } catch (error) {
  //   res.status(401).json({ err: "server error" });
  // }
};

export const logoutUser = async (req, res) => {
  const { userId } = req.body;

  try {
    await pool.query("UPDATE users SET status = $1 where user_id=$2", [
      "offline",
      userId,
    ]);
    res.json("logged out");
  } catch (error) {
    res.status(401).json({ err: "server error" });
  }
  // try {
  //   const user = await Users.findOne({ where: { user_id: userId } });
  //   if (user) {
  //     user.status = "offline";
  //     await user.save();
  //     return res.json("logged out");
  //   } else {
  //     console.log("user not found");
  //   }
  // } catch (error) {
  //   res.status(401).json({ err: "server error" });
  // }
};
