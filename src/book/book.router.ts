import express from "express";
import  { createBook, listBook, updateBook } from "./book.controller";
import multer from "multer";
import path from "node:path";
import autenticate from "../middleware/autanticate";

const bookRouter = express.Router();


//file storage in locally
const upload = multer({
    dest: path.resolve(__dirname,"../../public/data/uploads"),
    limits:{fileSize:3e7}
})

//mention fields
//book create

bookRouter.post("/",autenticate, upload.fields([ 
    {name:"coverImage", maxCount:1},
    {name:"file", maxCount:1}
]) , createBook );



//book edit/patch
bookRouter.patch("/:bookId",autenticate, upload.fields([ 
    {name:"coverImage", maxCount:1},
    {name:"file", maxCount:1}
]) , updateBook );




bookRouter.get("/", listBook );
    
    export default bookRouter;