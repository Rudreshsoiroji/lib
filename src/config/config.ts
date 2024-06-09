import { config as conf } from "dotenv"
conf();

const _config = {

    port:process.env.PORT,
    mongodb:process.env.MONGO_CONNECTION_STRING
}

export const config = Object.freeze(_config)