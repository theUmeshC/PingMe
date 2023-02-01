import express from "express";
import { add_private_connection } from "../Controllers/ChatController.js";

const chatRouter = express.Router();

chatRouter.get('/connections', add_private_connection);

export default chatRouter;