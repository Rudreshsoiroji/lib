import express from "express";
import createBook from "./book.controller";

const bookRouter = express.Router();


bookRouter.post("/createbook", createBook );

export default bookRouter;



