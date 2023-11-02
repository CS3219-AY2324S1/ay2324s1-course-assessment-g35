import React, { useEffect, useMemo, useState } from "react";
import Chat from "@/components/Collaboration/Chat";
import { useRouter } from "next/router";
import io, { Socket } from "socket.io-client";
import VideoCall from "@/components/VideoCall";
import CodeEditor from "@/components/Collaboration/CodeEditor";
import axios from "axios";
import QuestionDisplay, { Question } from "@/components/Collaboration/QuestionDisplay";
import { CHATSERVICE_URI, QUESTION_URI } from "@/constants/uri";
import withAuth from "@/components/withAuth";
import SaveModal from "@/components/Collaboration/SaveModal";
import { Button } from "@chakra-ui/react";
import CodeGenModal from "@/components/Collaboration/CodeGenModal";

function Collab() {
  const router = useRouter();
  const { roomId, myId, otherId, difficulty } = router.query;
  const [showChat, setShowChat] = useState<boolean>(false);
  const [question, setQuestion] = useState<Question>();
  const [showGenerateModal, setShowGenerateModal] = useState<boolean>(false);

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
      .get(`${QUESTION_URI.GET}?difficulty=${difficulty}`)
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

  const socket: Socket = useMemo(() => {
    const newSocket = io(CHATSERVICE_URI);
    newSocket.on("connect", () => {
      newSocket.emit("join_room", roomId);
    });
    newSocket.on("question", (question) => {
      setQuestion(question);
    });
    return newSocket;
  }, [roomId]);

  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const handleSaveClick = () => {
    setShowSaveModal(true);
  };

  const handleSave = () => {
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

  const openCodeGenModal = () => {
    setShowGenerateModal(true);
  };

  const handleCloseModal = () => {
    setShowSaveModal(false);
  };

  const handleCloseCodeGenModal = () => {
    setShowGenerateModal(false);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins"
        rel="stylesheet"
      ></link>
      <div>
        {showGenerateModal && (
          <CodeGenModal
            handleCloseModal={handleCloseCodeGenModal}
            setShowCodeGenModal={setShowGenerateModal}
          />
        )}
      </div>
      <div className="h-screen w-screen flex bg-pp-darkpurple text-white">
        {showSaveModal && (
          <SaveModal
            handleSave={handleSave}
            handleSaveAndLeave={handleSaveAndLeave}
            handleCloseModal={handleCloseModal}
            setShowSaveModal={setShowSaveModal}
          />
        )}

        <div className="bg-pp-accentgray font-poppins w-4/12 h-screen flex flex-col gap-3 p-4">
          <QuestionDisplay question={question} getQuestion={getQuestion} />
        </div>
        <div className="w-6/12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-pp-blue w-6 h-6"
            onClick={handleSaveClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
            />
          </svg>
          <Button onClick={openCodeGenModal}>Generate</Button>

        {/* Question section */}
        <div className="bg-pp-gray font-poppins w-4/12 h-screen flex flex-col gap-4 p-4">
          <QuestionDisplay question={question} getQuestion={getQuestion}/>
        </div>

        {/* Code editor section */}
        <div className="bg-[#282A35] font-poppins w-6/12 h-screen flex flex-col gap-4 p-4 overflow-auto">
          {/* TODO: maybe move the save button to inside the code editor if possible so that it can look nicer if it's on the same row as language options */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="text-pp-blue w-8 h-8 cursor-pointer"
              onClick={handleSaveClick}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
              />
            </svg>
          </div>
          <CodeEditor roomId={roomId || ""} />
        </div>

        {/* Chat and video section */}
        <div className="bg-pp-gray font-poppins w-2/12 h-screen flex flex-col gap-4">
          {/* <button
            className="text-pp-red bg-slate-900 rounded p-2"
            onClick={() => setShowChat(!showChat)}
          >
            Show Chat / Video
          </button> */}
          <div
            className={`w-1/6 absolute bottom-0 h-screen ${
              showChat ? "block" : "hidden"
            }`}
          >
            <Chat
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
    </>
  );
}

export default withAuth(Collab);
