import express from "express";

import { registerUser } from "../Controllers/UserController.js";

const router = express.Router();

router.get('/register', registerUser)

export default router;