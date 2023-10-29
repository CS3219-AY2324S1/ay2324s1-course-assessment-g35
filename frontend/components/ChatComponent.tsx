import { useEffect, useMemo, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

interface ChatComponentProps {
  roomId: string;
  socket: Socket;
}

type Message = {
  roomId: string;
  author: string;
  message: string;
  time: string;
};

const ChatComponent: React.FC<ChatComponentProps> = ({ socket, roomId }) => {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [allMessage, setAllMessage] = useState<Message[]>(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
      setCurrentMessage("");
    }
  };

  const sendMessage = async () => {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");
    if (currentMessage !== "") {
      const messageData: Message = {
        roomId: roomId,
        author: socket?.id || "",
        message: currentMessage,
        time: `${hours}:${minutes}:${seconds}`,
      };
      setAllMessage((prevMessages) => [...prevMessages, messageData]);
      socket?.emit("send_message", messageData);
    }
  };

  useMemo(() => {
    socket.off("receive_message").on("receive_message", (data: Message) => {
      setAllMessage((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(allMessage));
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessage]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-800 p-10">
      <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto w-full">
          {allMessage.map((message, index) => (
            <div
              key={index}
              className={`flex w-full mt-2 space-x-3 ${
                message.author === socket?.id ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`flex-shrink-0 h-10 w-10 rounded-full  ${
                  message.author === socket?.id ? "bg-blue-300 " : "bg-gray-300"
                }`}
              ></div>
              <div>
                <div
                  className={` p-3 rounded-r-lg rounded-bl-lg ${
                    message.author === socket?.id
                      ? "bg-blue-300"
                      : "bg-gray-300"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                </div>
                <span className="text-xs text-gray-500 leading-none">
                  {message.time}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="bg-gray-300 p-4">
          <input
            className="flex items-center h-10 w-full rounded px-3 text-sm focus:outline-none"
            type="text"
            placeholder="Type your message…"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
