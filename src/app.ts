import  express  from "express";
import globelErrorHandler from "./middleware/globelErrorHandler";
import userRouter from "./users/user.router";
import bookRouter from "./book/book.router";
import cors from "cors";
import { config } from "./config/config";
const app = express();

app.use(cors({

    origin:config.frountend_url,
}
    
))


app.use(express.json())

app.get('/', (req, res , next) => {

   
    res.json({
        message: "Hello world"
    })
})



 app.use("/api/users",userRouter);
 app.use("/api/books",bookRouter);


app.use(globelErrorHandler);


export default app;