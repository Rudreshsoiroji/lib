import { log } from "console";
import app from "./src/app";
import { config } from "./src/config/config";
import connectDb from "./src/config/db";

const startServer = async () => {
// db connection
    await connectDb();

    const port = config.port || 3000

    app.listen(port , ()=>{

     console.log(`The app is connected on port ${port}`);
        
    })
}

startServer();