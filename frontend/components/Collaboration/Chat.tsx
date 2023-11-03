import { useEffect, useMemo, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { MdOutlineClose } from "react-icons/md";

interface ChatComponentProps {
  roomId: string;
  socket: Socket;
  setShowChat: (val: boolean) => void;
}

type Message = {
  roomId: string;
  author: string;
  message: string;
  time: string;
};

const Chat: React.FC<ChatComponentProps> = ({
  socket,
  roomId,
  setShowChat,
}) => {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [allMessage, setAllMessage] = useState<Message[]>([]);
  const [sender, setSender] = useState<string>("");
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
        author: sender || "",
        message: currentMessage,
        time: `${hours}:${minutes}:${seconds}`,
      };
      setAllMessage((prevMessages) => [...prevMessages, messageData]);
      socket?.emit("send_message", messageData);
    }
  };

  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data: Message) => {
      setAllMessage((prevMessages) => [...prevMessages, data]); //update message state
    });
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    const sender = localStorage.getItem("user");
    setSender(sender || "Not set");
    alert(sender);
    const messages: Message[] = storedMessages
      ? JSON.parse(storedMessages)
      : [];
    setAllMessage(messages);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(allMessage));
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessage]);

  return (
    <div className="flex flex-col items-center justify-center h-full  relative">
      <MdOutlineClose
        className="absolute top-4 right-6 cursor-pointer hover:text-red-500"
        size={24}
        onClick={() => setShowChat(false)}
      />
      <div className="flex flex-col flex-grow w-full max-w-xl bg-pp-gray font-poppins shadow-xl rounded-lg overflow-hidden pt-6">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto w-full">
          {allMessage.map((message, index) => (
            <div
              key={index}
              className={`flex w-full mt-2 space-x-3 ${
                message.author === sender ? "justify-start" : "justify-end"
              }`}
            >
              {message.author === sender ? (
                <>
                  <div>
                    <div className=" p-3 rounded-r-lg rounded-bl-lg  bg-pp-blue ">
                      <p className="text-sm text-gray-800">{message.message}</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">
                      {message.time}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className=" p-3 rounded-r-lg rounded-bl-lg bg-pp-lightpurple">
                      <p className="text-sm">{message.message}</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">
                      {message.time}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="bg-pp-gray p-4">
          <input
            className="bg-white flex items-center h-10 w-full text-black rounded px-3 text-sm focus:outline-none"
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

export default Chat;
