import express from "express"
import { login, signup } from "../controllers/userControllers.js"



const userRouter = express.Router();


userRouter.post("/login",login);
userRouter.post("/signup",signup)

export {userRouter};