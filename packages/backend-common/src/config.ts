require("dotenv").config();
type Config={
    WS_PORT: number,
    HTTP_PORT: number,
    SECRET_KEY: string
}

console.log("env vairable: ", process.env.HTTP_PORT);
if(!process.env.WS_PORT || !process.env.HTTP_PORT || !process.env.SECRET_KEY){
    throw new Error("Environment variables might be empty")
}

export const config:Config={
    WS_PORT: Number(process.env.WS_PORT),
    HTTP_PORT: Number(process.env.HTTP_PORT),
    SECRET_KEY: process.env.SECRET_KEY      
}