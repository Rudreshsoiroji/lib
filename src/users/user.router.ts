import  express  from "express";
import { createUser,userLogin } from "./users.controller";

const userRouter = express.Router();

userRouter.post("/register",createUser)
userRouter.post("/login", userLogin)

export default userRouter;