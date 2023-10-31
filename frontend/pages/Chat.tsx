import React, { useEffect, useMemo, useState } from "react";
import ChatComponent from "@/components/ChatComponent";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import VideoCall from "@/components/VideoCall";
import CodeEditor from "@/components/Collaboration/CodeEditor";

export default function Chat() {
  const router = useRouter();
  console.log(router.query);
  const { roomId, myId, otherId } = router.query;
  const [showChat, setShowChat] = useState<boolean>(false);

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
        <CodeEditor roomId={roomId} />
        <button onClick={() => setShowChat(!showChat)}>Click here</button>
      </div>
      <div className="flex w-1/4 h-screen mt-12">
        {showChat ? (
          <div className="w-full">
            <ChatComponent socket={socket} roomId={(roomId as string) || ""} />
          </div>
        ) : (
          <div className="w-full ">
            {/* <VideoComponent /> */}
            <VideoCall myId={myId} otherId={otherId} />
          </div>
        )}
      </div>
    </div>
  );
}
