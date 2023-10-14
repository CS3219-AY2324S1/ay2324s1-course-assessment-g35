import React, { useEffect, useMemo, useState } from "react";
import ChatComponent from "@/components/ChatComponent";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
import io from "socket.io-client";

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
    <>
      <ChatComponent socket={socket} roomId={(roomId as string) || ""} />
    </>
  );
}
