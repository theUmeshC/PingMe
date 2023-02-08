import Users from "../Modules/Users.js";

export const loginUser = (req, res) => {
  const { username, email } = req.body;
  Users.create({
    user_id: Math.random(),
    username,
    email,
    status: "active",
  })
    .then(() => {
      res.json("User Registered");
    })
    .catch((error) => {
      if (error) {
        res.status(400).json({ error: error });
      }
    });
};
