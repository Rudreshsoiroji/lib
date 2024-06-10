import { config as conf } from "dotenv"
conf();

const _config = {

    port:process.env.PORT,
    mongodb:process.env.MONGO_CONNECTION_STRING,
    env: process.env.NODE_ENV,
    jasonSecret: process.env.JSONSECRET
}

export const config = Object.freeze(_config)