import React, { useEffect, useMemo, useState } from "react";
import ChatComponent from "@/components/ChatComponent";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import VideoCall from "@/components/VideoCall";

export default function Chat() {
  const router = useRouter();
  const {roomId, myId, otherId} = router.query;

  const socket: Socket = useMemo(() => {
    const newSocket = io("http://localhost:3002");
    newSocket.on("connect", () => {
      newSocket.emit("join_room", roomId);
    });
    return newSocket;
  }, [roomId]);

  return (
    <div className="h-screen w-screen flex">
      <div className="bg-slate-500 w-1/2">
        <h1>Here</h1>
      </div>
      <div className="flex w-1/2">
        <div className="w-2/3">
          <ChatComponent socket={socket} roomId={(roomId as string) || ""} />
        </div>
        <div className="w-1/2">
          {/* <VideoComponent /> */}
          <VideoCall myId={myId} otherId={otherId} />
        </div>
      </div>
    </div>
  );
}
