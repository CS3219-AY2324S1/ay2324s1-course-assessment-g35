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
    };
  }, []);

  const getQuestion = () => {
    axios
      .get(`http://localhost:8001/random/difficulty?difficulty=${difficulty}`)
      .then((res) => {
        setQuestion(res.data);
        localStorage.setItem("question", JSON.stringify(res.data)); //todo: remove upon completion

        const questionPayload = {
          roomId: roomId,
          question: res.data,
        };

        socket.emit("question", questionPayload);
      })
      .catch((err) => {
        alert("Error getting question. Please try again later. " + err);
      });
  };

  const handleSaveProgress = () => {
    console.log("SAVING PROGRESS");
    // make call to history service to save qid, uid1, uid2, roomid, and code
  };

  const handleSaveAndLeave = () => {
    console.log("SAVING PROGRESS AND LEAVING");
    // make call to history service to save qid, uid1, uid2, roomid, and code

    //CLEANUP local storage only
    localStorage.removeItem("question");

    router.push("/");
  };

  const socket: Socket = useMemo(() => {
    const newSocket = io("http://localhost:3002");
    newSocket.on("connect", () => {
      newSocket.emit("join_room", roomId);
    });
    newSocket.on("question", (question) => {
      setQuestion(question);
    });
    return newSocket;
  }, [roomId]);

  return (
    <div className="h-screen w-screen flex bg-pp-darkpurple text-white">
      <div className="w-2/6 flex flex-col gap-3 p-6">
        <QuestionDisplay question={question} />
        <button className="bg-slate-300 rounded p-2" onClick={getQuestion}>
          Change Question
        </button>
        <button
          className="bg-slate-400 rounded p-2"
          onClick={handleSaveProgress}
        >
          Save Progress
        </button>
        <button
          className="bg-slate-500 rounded p-2"
          onClick={handleSaveAndLeave}
        >
          Save and Leave
        </button>
      </div>
      <div className="w-3/6">
        <CodeEditor roomId={roomId || ""} />
        <button className="bg-slate-900 rounded p-2" onClick={() => setShowChat(!showChat)}>Show Chat / Video</button>
      </div>
      <div className="flex w-1/6 h-screen">
        <div
          className={`w-1/6 absolute bottom-0 h-screen ${
            showChat ? "block" : "hidden"
          }`}
        >
          <ChatComponent
            socket={socket}
            roomId={(roomId as string) || ""}
            setShowChat={setShowChat}
          />
        </div>

        <div className="w-full h-full bg-pp-gray">
          {/* <VideoComponent /> */}
          <VideoCall myId={myId} otherId={otherId} />
        </div>
      </div>
    </div>
  );
}
