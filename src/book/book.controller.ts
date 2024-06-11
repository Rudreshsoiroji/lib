import { NextFunction, Request, Response } from "express"
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";
import bookModel from "./bookModel";
import  fs  from "node:fs";
import { AuthReq } from "../middleware/autanticate";

const createBook = async   (req: Request ,res: Response,next:NextFunction) => {
  
    const {title, genre} = req.body;
  
  
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

//craete a model in database
const _req = req as AuthReq;
    
   const newBook = await bookModel.create({
    
        author:_req.userId,
        coverImage: uploadResult.secure_url,
        file: fileUploadResult.secure_url,
        genre,
        title,
    });


//delete temp files
try {
    await fs.promises.unlink(filePath);
    await fs.promises.unlink(bookFilePath);
    
} catch (error) {
    console.log(error);
    
    
}

    

    res.status(201).json({id: newBook._id})
}


const updateBook = async   (req: Request ,res: Response,next:NextFunction) => {

    const {title, genre} = req.body;


    // see if the book is present
    const bookId = req.params.bookId;

   const book = await  bookModel.findOne({_id: bookId})

   if (!book) {
    return next(createHttpError(404, "book not found"))
    
   }

   
   //see if the editor is authorises to edit
   const _req = req as AuthReq;
   if (book.author._id.toString() !== _req.userId ) {
    return next(createHttpError(403,"ypu cannot ypdate ithers message"))
    
   }

   //chect if image file exists

   const files = req.files as {[fieldname: string]:Express.Multer.File[]};
   let compleatedCoverInage = ""

   if (files.coverImage) {
    

    const coverImageMineType = files.coverImage[0].mimetype.split("/").at(-1);

      const fileName = files.coverImage[0].filename;



const filePath = path.resolve(__dirname, "../../public/data/uploads", fileName);


compleatedCoverInage = fileName;

     const uploadResult = await cloudinary.uploader.upload(filePath,{
        filename_override: compleatedCoverInage,
        folder: "Book-covers",
        format: coverImageMineType,
        
    }
    );

    compleatedCoverInage = uploadResult.secure_url;
    await fs.promises.unlink(filePath);

    
    
    
   
}
let completeFileName ="";
try {
    if (files.file) {
        const bookFileName = files.file[0].filename;
        const bookFilePath = path.resolve(__dirname, "../../public/data/uploads", bookFileName);
    
        completeFileName = bookFileName;
    
        const fileUploadResult = await cloudinary.uploader.upload(bookFilePath,{
            filename_override: completeFileName,
            resource_type: "raw",
            folder:"Book_pdf",
            format:"pdf"
        
    })
    completeFileName = fileUploadResult.secure_url;
        await fs.promises.unlink(bookFilePath);
    }
} catch (error) {
    console.log(error);
     
}

//updatein database

const bookUpdate = await bookModel.findOneAndUpdate(
    {
_id: bookId
},
{
    genre: genre,
    title:title,
    coverImage: compleatedCoverInage ? compleatedCoverInage : book.coverImage,
    file: completeFileName ? completeFileName : book.file,
    
},{
    new:true
}
)
res.json(bookUpdate);

}


const listBook = async (req: Request ,res: Response,next:NextFunction) =>{
try {
// since fing will return all use pagination
    const book = await bookModel.find()
    res.json(book)

} catch (error) {
    next(createHttpError(500,"Error while getting books"))
    
}
}

const book  = async(req: Request ,res: Response,next:NextFunction)=>{
const bookId = req.params.bookId;
    try {

 const singleBook = await bookModel.findOne({_id :bookId})

 if (!singleBook) {

     next(createHttpError(404, "book not found"))
    
 }
       return res.json(singleBook)
        
    } catch (error) {
        next(createHttpError(500, "bad request"))
        
    }

}
 
export {createBook , updateBook, listBook, book}