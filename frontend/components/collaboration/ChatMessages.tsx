import React, { useEffect, useState } from "react";
import {
  getDatabase,
  onValue,
  ref,
  set,
  push,
  query,
  orderByChild,
  onChildAdded,
} from "@firebase/database";

export interface ChatMessage {
  sender: string;
  author: string;
  message: string;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const [messageList, setMessageList] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const roomId = "999";
  let user: any;
  let receiver: any;
  try {
    user = localStorage.getItem("user") || "";
  } catch (error) {}
  try {
    user = localStorage.getItem("receiver") || "";
  } catch (error) {}
  const db = getDatabase();

  useEffect(() => {
    const messagesRef = ref(db, "chat/" + roomId + "/messages");
    const orderMessages = orderByChild("timestamp");
    onValue(messagesRef, (snapshot) => {
      setMessageList(snapshot.val());
      console.log(snapshot.val());
    });
  }, []);

  const handleSendMessage = () => {
    push(ref(db, "chat/" + roomId + "/messages"), {
      recipient: "Lily",
      author: user,
      message: newMessage,
      timestamp: new Date().getTime(),
    });
    if (newMessage.trim() !== "") {
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow p-4 overflow-y-auto">
        {messageList != undefined ? (
          Object.entries(messageList).map(([key, value]) => (
            <div
              key={key}
              className={`p-2 my-2 mx-4 rounded-xl ${
                value.sender === user
                  ? "self-start bg-gray-200"
                  : "self-end bg-blue-500 text-white"
              }`}
            >
              <strong>{value.author}</strong>: {value.message}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="p-4">
        <div className="bg-gray-200 rounded-lg p-2 flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full focus:outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
