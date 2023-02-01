import bcrypt from "bcrypt";

import Users from "../Modules/Users.js";

export const registerUser = (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username,
      password: hash,
    })
      .then(() => {
        res.json("User Registered");
      })
      .catch((error) => {
        if (error) {
          res.status(400).json({ error: error });
        }
      });
  });
};

