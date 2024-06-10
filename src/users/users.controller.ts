import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors";
import userModelSchems from "./userModelSchems";
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { Users } from "./userTypes";
const createUser = async(req: Request ,res: Response,next:NextFunction) =>{

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
        res.status(201).json({
           accessToken: token
        });
} catch (error) {
    return next(createHttpError(500, "error while sending the jwt token"))
    
}
}

const userLogin = async(req:Request,res:Response,next:NextFunction) =>{
    //validate
const {email, password } = req.body
if(!email || !password)
    {
        return next(createHttpError(400, "All fields are required"))
    }


    
    const user = await userModelSchems.findOne({email});
    
    if(!user){
        return next(createHttpError(404,"user not found please register"))
    }



const isMatch = await bcrypt.compare(password, user.password)
if(!isMatch){
    return next(createHttpError(401,"password dosent match"))
}


const token = sign({sub:user._id}, config.jasonSecret as string , {expiresIn:"7d"});

    res.json({token:token})

}

export {createUser, userLogin}