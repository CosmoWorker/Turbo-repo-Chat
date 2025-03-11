import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket(){
    const [loading, setloading]=useState(true);
    const [socket, setSocket]=useState<WebSocket>();

    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYjc0N2QwOS1hY2U0LTRmNzgtODE5NS02Mzk0NDA5Yjg5NzgiLCJpYXQiOjE3NDE2MDUwNjd9.NH6YVD_iQSXrbMaO5Sw3gA1U5xlgHAWeurzW1-WZ-Ng`);
        ws.onopen=()=>{
            setloading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket, loading
    }
} 