import dotenv from "dotenv"
dotenv.config()
type config=Record<'WS_PORT'| 'HTTP_PORT'| 'SECRET_KEY', string>
if(!process.env.WS_PORT || !process.env.HTTP_PORT || !process.env.SECRET_KEY){
    throw new Error("Environment variables empty")
}

export const config:config={
    WS_PORT: process.env.WS_PORT,
    HTTP_PORT: process.env.HTTP_PORT,
    SECRET_KEY: process.env.SECRET_KEY
}