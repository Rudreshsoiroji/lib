import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";

export interface AuthReq extends Request{
    userId:string;
}

const autenticate =   (req: Request ,res: Response,next:NextFunction) => {

    const token = req.header("Authorization");
    if (!token) {

      return  next(createHttpError(401,"validation error authorisation toke is required"))
        
    }

    try {
        
        
            const tokenparse = token.split(" ")[1]
        
            const decoded = verify(tokenparse, config.jasonSecret as string);
        
            const _req = req as AuthReq;
        
            _req.userId = decoded.sub as string;
        
        
            
            
          
          
            next();
    } catch (error) {
        return next(createHttpError(404, "token expired"));
        
    }
}

export default autenticate;