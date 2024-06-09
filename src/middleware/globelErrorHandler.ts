import { HttpError } from "http-errors";
import { config } from "../config/config";
import { NextFunction ,Request ,Response} from "express";

const globelErrorHandler = (err:HttpError , req:Request, res:Response , next:NextFunction) =>{

    const statuscode = err.statuscode || 500;
    return res.status(statuscode).json({
        message: err.message,
        stack: config.env === "development" ? err.stack : ""
    })
}

export default globelErrorHandler