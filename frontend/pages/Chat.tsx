import React, { useEffect, useMemo, useState } from "react";
import ChatComponent from "@/components/ChatComponent";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import VideoCall from "@/components/VideoCall";

export default function Chat() {
  const router = useRouter();
  const { roomId, myId, otherId } = router.query;
  const [showChat, setShowChat] = useState<boolean>(true);
  const socket: Socket = useMemo(() => {
    const newSocket = io("http://localhost:3002");
    newSocket.on("connect", () => {
      newSocket.emit("join_room", roomId);
    });
    return newSocket;
  }, [roomId]);

  return (
    <div className="h-screen w-screen flex">
      <div className="bg-slate-500 w-3/4  h-screen">
        <h1>Here</h1>
        <button onClick={() => setShowChat(!showChat)}>Click here</button>
      </div>
      <div className="flex w-1/4 h-screen">
        <div
          className={`w-1/4 absolute bottom-0 h-screen ${
            showChat ? "block" : "hidden"
          }`}
        >
          <ChatComponent
            socket={socket}
            roomId={(roomId as string) || ""}
            setShowChat={setShowChat}
          />
        </div>

        <div className="w-full">
          {/* <VideoComponent /> */}
          <VideoCall myId={myId} otherId={otherId} />
        </div>
      </div>
    </div>
  );
}
