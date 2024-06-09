import  express  from "express";
import globelErrorHandler from "./middleware/globelErrorHandler";

const app = express();

app.get('/', (req, res , next) => {

   
    res.json({
        message: "Hello world"
    })
})


app.use(globelErrorHandler)


export default app;