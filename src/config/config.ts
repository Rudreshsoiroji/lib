import { config as conf } from "dotenv"
conf();

const _config = {

    port:process.env.PORT,
    mongodb:process.env.MONGO_CONNECTION_STRING,
    env: process.env.NODE_ENV,
    jasonSecret: process.env.JSONSECRET,
    cloud_name: process.env.CLOUDANARY_NAME,
    api_key:process.env.CLOUDANARY_API_KEY , 
    api_secret: process.env.CLOUDANARY_API_SECRET, 
}

export const config = Object.freeze(_config)