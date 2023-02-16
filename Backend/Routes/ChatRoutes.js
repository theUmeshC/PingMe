import express from "express";
import {
  addFriend,
  addMessage,
  addUsersToGroup,
  getFriends,
  getGroups,
  getMessages,
  get_all_users,
} from "../Controllers/ChatController.js";

const chatRouter = express.Router();

chatRouter.post("/getAllUsers", get_all_users);

chatRouter.post("/addFriend", addFriend);

chatRouter.post("/getFriends", getFriends);

chatRouter.post("/getMessages", getMessages);

chatRouter.post("/sendMessage", addMessage);

chatRouter.post("/addToGroup", addUsersToGroup);

chatRouter.post("/getGroups", getGroups);

export default chatRouter;
