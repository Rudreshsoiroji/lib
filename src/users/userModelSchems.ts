
import  mongoose from "mongoose";
import { Users } from "./userTypes";

const userSchema = new mongoose.Schema<Users>({ 

name: {
    type:String,
    reqired:true
},

email: {
    type:String,
    unique: true,
    reqired: true
},
password: {
    type:String,
    reqired: true,

}

 },


 {
    timestamps: true
}

);

export default mongoose.model<Users>("User", userSchema)