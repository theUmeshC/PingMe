import express from "express";
import {
  addFriend,
  addMessage,
  getFriends,
  getMessages,
  get_all_users,
} from "../Controllers/ChatController.js";

const chatRouter = express.Router();

chatRouter.post("/getAllUsers", get_all_users);

chatRouter.post("/addFriend", addFriend);

chatRouter.post("/getFriends", getFriends);

chatRouter.post("/getMessages", getMessages);

chatRouter.post("/sendMessage", addMessage);

export default chatRouter;
