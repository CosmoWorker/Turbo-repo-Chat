import axios from "axios"
import { HTTP_URL } from "../config"
import { ChatRoomClient } from "./ChatRoomClient";


async function getChats(roomId: string){
    const res= await axios.get(`${HTTP_URL}/chats/${roomId}`, {
        headers:{
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYjc0N2QwOS1hY2U0LTRmNzgtODE5NS02Mzk0NDA5Yjg5NzgiLCJpYXQiOjE3NDE2MDUwNjd9.NH6YVD_iQSXrbMaO5Sw3gA1U5xlgHAWeurzW1-WZ-Ng",
        }
    })
    return res.data.messages;
}

export async function ChatRoom({id}:{
    id : string
}){
    const messsages=await getChats(id);
    
    return <ChatRoomClient id={id} messages={messsages}/>
}