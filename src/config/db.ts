import mongoose from "mongoose";
import { config } from "./config";



const connectDb = async () =>{
    try {
        mongoose.connection.on("connected", ()=>{

            console.log("Connected successfully");
            
            
            })
        // on connection error
         mongoose.connection.on("Error", (err)=>{

            console.log("Error In connection ", err);
            
            
            })
         await mongoose.connect(config.mongodb as string)
// whem connected
       
        
    } catch (error) {

        console.log("Failed to  connect to Database ",error);

        process.exit(1);
        
        
    }
}

export default connectDb;