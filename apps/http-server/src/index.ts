import {config} from "@repo/backend-common/config"
import argon2 from "argon2";
import express from "express";
import {prismaClient} from "@repo/db/client"
import {CreateUserSchema, SigninSchema, CreateRoomSchema} from "@repo/common/types"
import { CustomRequest, auth } from "./auth";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json())

app.get("/signup", async(req, res) => {
    const parsedData=CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorred Inputs"
        })
        return;
    }
    try{
        const hashedPassword=await argon2.hash(parsedData.data.password);
        const user=await prismaClient.user.create({
            data:{
                email: parsedData.data.username,
                password: hashedPassword,
                name: parsedData.data.username
            }
        })
        res.json({
            userId: user.id
        })
    }catch(e){
        res.status(411).json({
            message: "Error signing up, exists"
        })
    }
})

app.get("/signin", async(req, res) => {
    const parsedData=SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Invalid Inputs"
        })
        return;
    }
    try{
        const user=await prismaClient.user.findFirst({
            where:{
                email: parsedData.data.username
            }
        })
        if(!user){
            res.status(401).json({
                message: "User not found, invalid"
            })
        }
        const isValidPassword=await argon2.verify(user.password, parsedData.data.password);
        if(isValidPassword){
            const token=jwt.sign({
                userId: user.id
            }, config.SECRET_KEY)
            res.json({
                token: token
            })
        }else{
            res.status(401).json({
                message : "Invalid credentials, password not correct"
            })
        }
    }catch(e){
        res.status(411).json({
            message: "Unauthorization Error during signing in"
        })
    }
})

app.post("/room", auth, async(req:CustomRequest, res) => {
    const parsedData= CreateRoomSchema.safeParse(req.body)
    if(!parsedData.success){
        res.json({
            message : "Incorrect Inputs"
        })
        return;
    }
    const userId=req.userId;
    if(!userId){
        res.status(403).json({
            message : "Unauthorized"
        })
        return;
    }
    try{
        const room = await prismaClient.room.create({
            data:{
                slug: parsedData.data.name,
                adminId: userId
            }
        })
        res.json({
            roomId: room.id
        })
    }catch(e){
        res.status(411).json({
            message: "Room exits & Error creating Room"
        })
    }
})

app.get("/chats/:roomId", auth, async(req, res)=>{
    
})

app.get("/room/:slug", auth, async(req, res)=>{

})


app.listen(3001);