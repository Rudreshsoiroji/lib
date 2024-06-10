import { NextFunction, Request, Response } from "express"

const userController = (req: Request ,res: Response,next:NextFunction)=>{
    res.json({
        messager:"post on register"
    })
}

export {userController}