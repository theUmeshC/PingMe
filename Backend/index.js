import express from "express";
import cors from "cors";
import { config } from "dotenv";
import bodyParser from "body-parser";

import chatRouter from "./Routes/ChatRoutes.js";
import { oktaAuthRequired } from "./middleware/jwtVerifier.js";
import userRouter from "./Routes/UserRouter.js";

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

app.use("/users", userRouter);

app.use("/chat", oktaAuthRequired, chatRouter);

app.listen(port, () => {
  console.log(port)
});
