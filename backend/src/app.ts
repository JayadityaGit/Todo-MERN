import express, { NextFunction, Request, Response } from "express"

import  createHttpError, {isHttpError} from "http-errors";
import routes from "./routes/todoRoutes";
import morgan from "morgan"

export const app = express();

app.use(morgan("dev"))

app.use(express.json())

app.use("/api/todos", routes)


//make an erorr handler when the user try to access the unkonwn route

app.use((req, res, next)=>{

    next(createHttpError(404, "this route does not exist !!"))

})



// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction)=>{
      
    console.error(error);

    let errorMessage = "an unkown error occured";

    let statusCode = 500;

    if(isHttpError(error)){
        errorMessage = error.message;

        statusCode = error.status;
    }

    res.status(statusCode).json({error: errorMessage})
})


