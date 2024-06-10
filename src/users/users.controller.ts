import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors";
import userModelSchems from "./userModelSchems";
import bcrypt from "bcrypt"
const userController = async(req: Request ,res: Response,next:NextFunction) =>{

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

    const error = createHttpError(400,"all fields are required");
    return next(error);
    }

const user = await userModelSchems.findOne({email})
if(user){
    const error = createHttpError(400,"email anready exists");
    next(error);
}

bcrypt

const hashedPass = await bcrypt.hash(password, 10)

    res.json({
        messager:"post on register"
    })
}

export {userController}