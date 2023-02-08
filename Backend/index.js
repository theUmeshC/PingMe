import express from "express";
import cors from "cors";
import { config } from "dotenv";
import bodyParser from "body-parser";

import sequelize from "./utils/database.js";
import router from "./Routes/AuthRoutes.js";
import chatRouter from "./Routes/ChatRoutes.js";
import { oktaAuthRequired } from "./middleware/jwtVerifier.js";

config();

const app = express();

const port = process.env.PORT || "6000";

app.use(bodyParser.json());

app.use(
  cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.use("/", oktaAuthRequired, (req, res, next) => {
  const { user } = req.body;
  res.json(user);
});

app.use("/users", router);

app.use("/chat", chatRouter);

sequelize
  // .sync({alter: true})
  .sync()
  .then(() => {
    console.log("connected to database successfully");
    app.listen(port, () => {
      console.log(port);
    });
  })
  .catch((err) => console.log(err));
