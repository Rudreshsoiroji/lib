import  express  from "express";
import globelErrorHandler from "./middleware/globelErrorHandler";
import userRouter from "./users/user.router";

const app = express();

app.get('/', (req, res , next) => {

   
    res.json({
        message: "Hello world"
    })
})
 app.use("/api/users",userRouter);

app.use(globelErrorHandler)


export default app;