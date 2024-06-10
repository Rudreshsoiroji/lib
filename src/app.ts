import  express  from "express";
import globelErrorHandler from "./middleware/globelErrorHandler";
import userRouter from "./users/user.router";
import bookRouter from "./book/book.router";
const app = express();


app.use(express.json())

app.get('/', (req, res , next) => {

   
    res.json({
        message: "Hello world"
    })
})



 app.use("/api/users",userRouter);
 app.use("/api/book",bookRouter);


app.use(globelErrorHandler);


export default app;