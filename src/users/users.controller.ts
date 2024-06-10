import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors";
import userModelSchems from "./userModelSchems";
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { Users } from "./userTypes";
const userController = async(req: Request ,res: Response,next:NextFunction) =>{

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

    const error = createHttpError(400,"all fields are required");
    return next(error);
    }


// check unique email

try {
    
    const user = await userModelSchems.findOne({email})
    if(user){
        const error = createHttpError(400,"email anready exists");
        next(error);
    }
} catch (error) {
   return next(createHttpError(500,"error with the server"))
   }
   
   // hash the oassword using rounds
   const hashedPass = await bcrypt.hash(password, 10)
   
   let newUser:Users;

   try {
       
       //create user in database
        newUser = await userModelSchems.create({
           name,
           email,
           password:hashedPass
           })
           } catch (error) {
               
               return next(createHttpError(500,"error with the server"))
}

try {
    
    //token generation
    const token = sign({sub:newUser._id}, config.jasonSecret as string , {expiresIn:"7d"});
    
    //response
        res.json({
           accessToken: token
        });
} catch (error) {
    return next(createHttpError(500, "error while sending the jwt token"))
    
}
}

export {userController}