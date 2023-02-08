import express from "express";
import { loginUser } from "../Controllers/UserController.js";
import { oktaAuthRequired } from "../middleware/jwtVerifier.js";

const userRouter = express.Router();

userRouter.post("/login", oktaAuthRequired, loginUser);

export default userRouter;
