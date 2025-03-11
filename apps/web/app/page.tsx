"use client";
import { TextInput } from "@repo/ui/text-input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [roomId, setRoomId]=useState("");
  const router = useRouter();
  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      backgroundColor: "lightgrey",
      display: "flex",
      justifyContent: "center",
      justifyItems: "center"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }}>
        <TextInput size="small" placeholder= "Room name" value={roomId} onchange={setRoomId}></TextInput>
        <button onClick={() => {
          router.push(`/room/${roomId}`)
        }} style={{
          borderRadius: "3px",
          borderWidth: "0px",
          height: "35px",
          width: "120px",
          marginLeft: "45px",
          backgroundColor:"saddlebrown",
          cursor: "pointer"
        }}>Join room</button>
      </div>
    </div>
  );
}