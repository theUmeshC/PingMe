import express from "express";
import cors from "cors";
import { config } from "dotenv";

import sequelize from "./utils/database.js";
import router from "./Routes/AuthRoutes.js";
import chatRouter from "./Routes/ChatRoutes.js";

config();

const app = express();

const port = process.env.PORT || "6000";

app.use(cors());

app.use(express.json());

app.use("/users", router);

app.use("/chat", chatRouter);

sequelize
  .sync()
  .then(() => {
    console.log("connected to database successfully");
    app.listen(port, () => {
      console.log(port);
    });
  })
  .catch((err) => console.log(err));
