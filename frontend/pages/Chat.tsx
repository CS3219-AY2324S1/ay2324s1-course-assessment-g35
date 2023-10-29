import React, { useEffect, useMemo, useState } from "react";
import ChatComponent from "@/components/ChatComponent";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import VideoComponent from "@/components/VideoComponent";
import CodeEditor from "@/components/collaboration/CodeEditor";

export default function Chat() {
  const router = useRouter();
  const { roomId } = router.query; // Extracting roomId from the URL
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
      <div className="bg-slate-500 w-1/2">
        <CodeEditor roomId="hihi" />
      </div>
      <div className="flex w-1/2">
        <div className="w-2/3">
          <ChatComponent socket={socket} roomId={(roomId as string) || ""} />
        </div>
        <div className="w-1/2">
          <VideoComponent />
        </div>
      </div>
    </div>
  );
}
