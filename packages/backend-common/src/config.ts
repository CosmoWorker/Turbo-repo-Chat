import dotenv from "dotenv";
dotenv.config();
type config={
    WS_PORT: number,
    HTTP_PORT: number,
    SECRET_KEY: string
}
if(!process.env.WS_PORT || !process.env.HTTP_PORT || !process.env.SECRET_KEY){
    throw new Error("Environment variables empty")
}

export const config:config={
    WS_PORT: Number(process.env.WS_PORT),
    HTTP_PORT: Number(process.env.HTTP_PORT),
    SECRET_KEY: process.env.SECRET_KEY
}