import ChatComponent, {
  ChatMessage,
} from "@/components/collaboration/ChatMessages";
import CodeEditor from "@/components/collaboration/CodeEditor";

const Collaboration = ({ roomId }: { roomId: string }) => {
  roomId = "hehe";
  const chatData: ChatMessage[] = [
    { sender: "user", author: "You", message: "Hello! How can I help you?" },
    { sender: "assistant", author: "ChatBot", message: "Hi there!" },
    // Add more chat messages as needed
  ];
  return (
    <>
      <div className="flex flex-row">
        <div className="w-6/12	">
          <CodeEditor roomId={roomId} />
        </div>
        <div className="w-6/12	">
          <ChatComponent messages={chatData} />
        </div>
      </div>
    </>
  );
};

export default Collaboration;
