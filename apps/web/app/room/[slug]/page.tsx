import axios from "axios";
import { HTTP_URL } from "../../config";
import { ChatRoom } from "../../components/ChatRoom";

async function getRoomId(slug: string){
    const res=await axios.get(`${HTTP_URL}/room/${slug}`, {
        headers: {
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYjc0N2QwOS1hY2U0LTRmNzgtODE5NS02Mzk0NDA5Yjg5NzgiLCJpYXQiOjE3NDE2MDUwNjd9.NH6YVD_iQSXrbMaO5Sw3gA1U5xlgHAWeurzW1-WZ-Ng",
        },
    });
    return res.data.room.id;
}

export default async function ChatRoomin({
    params
}:{
    params:{
        slug: string
    }
}){
    const slug=(await params).slug;
    const roomId=await getRoomId(slug);

    return <ChatRoom id={roomId}/>
}