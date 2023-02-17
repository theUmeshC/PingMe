import express from "express";
import cors from "cors";
import { config } from "dotenv";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";

import chatRouter from "./Routes/ChatRoutes.js";
import { oktaAuthRequired } from "./middleware/jwtVerifier.js";
import userRouter from "./Routes/UserRouter.js";

config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log('connected');

  socket.on("login", (userID) => {
    socket.join(userID);
    socket.emit("connected to socket")
  } )
 
  socket.on("join room", (chatId) => {
    socket.join(chatId);
    console.log(chatId);
  })

  socket.on('send message', (newMessage, chatId, senderId, sender_name) => {
    console.log(newMessage, chatId);
    socket.to(chatId).emit("receive message", {newMessage, senderId, timestamp: new Date(), sender_name} )
  })
});

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

server.listen(port, () => {
  console.log(port);
});
