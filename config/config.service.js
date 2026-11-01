import { config } from "dotenv";
import { resolve } from "node:path";

const NODE_ENV = process.env.NODE_ENV

const envPath = {
    development: ".env.development",
    production: ".env.production"
}

config({path:resolve(`config/${envPath[NODE_ENV]}`)});


export const PORT = +process.env.PORT
export const DB_URI = process.env.DB_URI
export const Redis_Url = process.env.Redis_Url
export const SALT_ROUNDS = process.env.SALT_ROUNDS
export const ACCESS_TOKEN_SIGNATURE = process.env.ACCESS_TOKEN_SIGNATURE
export const REFRESH_TOKEN_SIGNATURE = process.env.REFRESH_TOKEN_SIGNATURE
export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
export const EMAIL = process.env.EMAIL
export const PASSWORD = process.env.PASSWORD
export const AUDIENCE_GMAIL = process.env.AUDIENCE_GMAIL
