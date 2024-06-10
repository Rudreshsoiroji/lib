import { Date } from "mongoose";
import { Users } from "../users/userTypes";

export interface Book {
    _id: string;
    title:string;
    author:Users;
    coverImage:string;
    genre:string;
    file:string;
    craetedAt: Date;
    updatedAt: Date;
}

