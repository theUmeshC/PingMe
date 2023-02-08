import express from "express";
import { loginUser } from "../Controllers/UserController.js";

const userRouter = express.Router();

userRouter.get('/login', loginUser);

export default userRouter;