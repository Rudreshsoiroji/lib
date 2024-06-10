import  express  from "express";
import { userController } from "./users.controller";

const userRouter = express.Router();

userRouter.post("/register",userController)

export default userRouter;