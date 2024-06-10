import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors";

const userController = async(req: Request ,res: Response,next:NextFunction) =>{

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

    const error = createHttpError(400,"all fields are required");
    return next(error);
    }




    res.json({
        messager:"post on register"
    })
}

export {userController}