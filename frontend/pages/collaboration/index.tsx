import CodeEditor from "@/components/collaboration/CodeEditor";

const Collaboration = ({ roomId }: { roomId: string }) => {
  roomId = "hehe";
  return (
    <>
      <div className="flex flex-row">
        <div className="w-6/12	">
          <CodeEditor roomId={roomId} />
        </div>
        <div className="w-6/12	"></div>
      </div>
    </>
  );
};

export default Collaboration;
