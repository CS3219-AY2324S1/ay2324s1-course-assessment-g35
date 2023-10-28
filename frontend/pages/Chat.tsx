import React, { useEffect, useMemo, useState } from "react";
import ChatComponent from "@/components/ChatComponent";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import VideoComponent from "@/components/VideoComponent";

export default function Chat() {
  const router = useRouter();
  const { roomId } = router.query; // Extracting roomId from the URL
  const [showChat, setShowChat] = useState<boolean>(false);
  // const [socket, setSocket] = useState<any>(null);

  const socket: Socket = useMemo(() => {
    const newSocket = io("http://localhost:3002");
    newSocket.on("connect", () => {
      newSocket.emit("join_room", roomId);
    });
    return newSocket;
  }, [roomId]);

  return (
    <div className="h-screen w-screen flex">
      <div className="bg-slate-500 w-3/4 mt-12 h-screen">
        <h1>Here</h1>
        <button onClick={() => setShowChat(!showChat)}>Click here</button>
      </div>
      <div className="flex w-1/4 h-screen mt-12">
        {showChat ? (
          <div className="w-full">
            <ChatComponent socket={socket} roomId={(roomId as string) || ""} />
          </div>
        ) : (
          <div className="w-full ">
            <VideoComponent />
          </div>
        )}
      </div>
    </div>
  );
}
