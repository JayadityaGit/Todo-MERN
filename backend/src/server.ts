//create a simple hello world server

import { app } from "./app";
import mongoose from "mongoose";
import "dotenv/config"
import env from "./util/validateEnv"


const port = env.PORT;


async function mongo() {
    try {
        
        await mongoose.connect(env.MONGO_CONNECT)

        app.listen(port, ()=>{
            console.log("server has been started on the port "+port)
        })
        

    } catch (error) {
        console.error(error)
    }
}

mongo()





