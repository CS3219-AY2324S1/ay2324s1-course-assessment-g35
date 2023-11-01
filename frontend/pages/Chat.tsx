import React, { use, useEffect, useMemo, useState } from "react";
import ChatComponent from "@/components/ChatComponent";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import VideoCall from "@/components/VideoCall";
import CodeEditor from "@/components/Collaboration/CodeEditor";
import axios from "axios";
import { Question } from "@/components/Collaboration/QuestionDisplay";
import QuestionDisplay from "@/components/Collaboration/QuestionDisplay";

export default function Chat() {
  const router = useRouter();
  console.log(router.query);
  const { roomId, myId, otherId, difficulty } = router.query;
  const [showChat, setShowChat] = useState<boolean>(false);
  const [question, setQuestion] = useState<Question>();

  // useEffect to retrieve question if none found in localstorage
  useEffect(() => {
    if (localStorage.getItem("question")) {
      setQuestion(JSON.parse(localStorage.getItem("question") as string));
    } else {
      getQuestion();
    }

    // cleanup socket, but not local storage
    return () => {
      socket.disconnect();
    }
  }
  , []);

  const getQuestion = () => {
    axios.get(`http://localhost:8001/random/difficulty?difficulty=${difficulty}`).then((res) => {
      console.log("QUESTION RESPONSE DATA: ", res.data);
      setQuestion(res.data);
      localStorage.setItem("question", JSON.stringify(res.data)); //todo: remove upon completion

      const questionPayload = {
        roomId: roomId,
        question: res.data,
      };

      socket.emit("question", questionPayload);

    }).catch((err) => {
      alert("Error getting question. Please try again later. " + err);
    });
  }

  const handleSaveProgress = () => {
    console.log("SAVING PROGRESS");
    // make call to history service to save qid, uid1, uid2, roomid, and code
  }

  const handleSaveAndLeave = () => {
    console.log("SAVING PROGRESS AND LEAVING");
    // make call to history service to save qid, uid1, uid2, roomid, and code

    //CLEANUP local storage only
    localStorage.removeItem("question");

    router.push("/");
  }

  const socket: Socket = useMemo(() => {
    const newSocket = io("http://localhost:3002");
    newSocket.on("connect", () => {
      newSocket.emit("join_room", roomId);
    });
    newSocket.on("question", (question) => {
      console.log(question);
      setQuestion(question);
    });
    return newSocket;
  }, [roomId]);

  return (
    <div className="h-screen w-screen flex">
      <div className="bg-slate-500 w-2/6 h-screen flex flex-col">
        <QuestionDisplay question={question} />
        <button className="bg-slate-300 rounded p-2" onClick={getQuestion}>Change Question</button>
        <button className="bg-slate-400 rounded p-2" onClick={handleSaveProgress}>Save Progress</button>
        <button className="bg-slate-500 rounded p-2" onClick={handleSaveAndLeave}>Save and Leave</button>
      </div>
      <div className="bg-slate-500 w-3/6 h-screen">
        <CodeEditor roomId={roomId} />
        <button onClick={() => setShowChat(!showChat)}>Click here</button>
      </div>
      <div className="flex w-1/6 h-screen">
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
