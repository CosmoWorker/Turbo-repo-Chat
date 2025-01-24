import {WebSocket, WebSocketServer} from 'ws';
import jwt from "jsonwebtoken"
import {config} from "@repo/backend-common/config"
import {prismaClient} from "@repo/db/client"

const wss= new WebSocketServer({port: config.WS_PORT})
type User={
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const users: User[]=[];

const checkUser=(token: string): string|null=>{
    try{
        const decoded=jwt.verify(token, config.SECRET_KEY);
        if(typeof decoded=="string"|| !decoded.userId) return null;
        return decoded.userId; 
    }catch(e){
        return null;
    }
}

wss.on('connection', function connection(ws, req){
    const url=req.url;
    if(!url) return;
    const queryParams=new URLSearchParams(url.split("?")[1])
    const token=queryParams.get("token")||"";
    const userId=checkUser(token);

    if(userId==null){
        ws.close();
        return;
    }

    users.push({
        userId,
        rooms:[],
        ws
    })

    ws.on('message', async function message(data) {
        let parsedData;
        if(typeof data!=="string"){
            parsedData=JSON.parse(data.toString());
        }else{
            parsedData=JSON.parse(data);
        }//{type: "join_room", roomId: 2}

        if(parsedData.type==='join_room'){
            const user=users.find(x=>x.ws===ws)
            user?.rooms.push(parsedData.roomId);
        }
        if(parsedData.type==='leave_room'){
            const user=users.find(x=>x.ws===ws);
            if(!user) return;
            user.rooms=user.rooms.filter(room=>room!==parsedData.roomId);
        }
        if(parsedData.type==="chat"){
            const roomId=parsedData.roomId;
            const message=parsedData.message;
            await prismaClient.chat.create({
                data:{
                    roomId,
                    message,
                    userId
                }
            });
            users.forEach(user=>{
                if(user.rooms.includes(roomId)){
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        userId: roomId
                    }));
                }
            });
        }
    })
})