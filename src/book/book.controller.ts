import { NextFunction, Request, Response } from "express"
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";

const createBook = async   (req: Request ,res: Response,next:NextFunction) => {
  
  
  
    //upload to cloudinary

const files = req.files as {[fieldname: string]:Express.Multer.File[]};
const coverImageMineType = files.coverImage[0].mimetype.split("/").at(-1);

const fileName = files.coverImage[0].filename;
const filePath = path.resolve(__dirname, "../../public/data/uploads", fileName);

let uploadResult;

try {
     uploadResult = await cloudinary.uploader.upload(filePath,{
        filename_override: fileName,
        folder: "Book-covers",
        format: coverImageMineType,
        
    }
    );
    
    } catch (error) {

         console.log(error);
        return next(createHttpError(500,"Error while uploading image"))
        
        
    }


    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(__dirname, "../../public/data/uploads", bookFileName);

    let fileUploadResult;
try {
    
   fileUploadResult = await cloudinary.uploader.upload(bookFilePath,{
         filename_override: bookFileName,
         resource_type: "raw",
         folder:"Book_pdf",
         format:"pdf"

    });
} catch (error) {
    console.log(Error);
    return next(createHttpError(500,"Error while uploading pdf"))
    
    
}
    console.log("upload result :" ,uploadResult);
    console.log("upload result :" ,fileUploadResult);
    

    res.json({})
}

export default createBook;