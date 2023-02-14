import express from "express";
import {
  addFriend,
  add_private_connection,
  getFriends,
  get_all_users,
} from "../Controllers/ChatController.js";

const chatRouter = express.Router();

chatRouter.get("/connections", add_private_connection);

chatRouter.post("/getAllUsers", get_all_users);

chatRouter.post("/addFriend", addFriend);

chatRouter.post("/getFriends", getFriends);

export default chatRouter;
