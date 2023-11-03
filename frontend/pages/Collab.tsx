import React, { useEffect, useMemo, useState } from "react";
import Chat from "@/components/Collaboration/Chat";
import { useRouter } from "next/router";
import io, { Socket } from "socket.io-client";
import VideoCall from "@/components/VideoCall";
import CodeEditor from "@/components/Collaboration/CodeEditor";
import axios from "axios";
import QuestionDisplay, {
  Question,
} from "@/components/Collaboration/QuestionDisplay";
import { CHATSERVICE_URI, QUESTION_URI } from "@/constants/uri";
import withAuth from "@/components/withAuth";
import SaveModal from "@/components/Collaboration/LeaveModal";
import LeaveModal from "@/components/Collaboration/LeaveModal";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
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
  const openCodeGenModal = () => {
    setShowGenerateModal(true);
  };
  const handleCloseCodeGenModal = () => {
    setShowGenerateModal(false);
  };

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

  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);

  const handleLeaveClick = () => {
    setShowLeaveModal(true);
  };

  const handleSave = () => {
    console.log("SAVING PROGRESS");
    setShowSaveModal(true);
    // make call to history service to save qid, uid1, uid2, roomid, and code
  };

  const handleSaveAndLeave = () => {
    console.log("SAVING PROGRESS AND LEAVING");
    // make call to history service to save qid, uid1, uid2, roomid, and code

    //CLEANUP local storage only
    localStorage.removeItem("question");

    router.push("/");
  };

  const handleCloseModal = () => {
    setShowLeaveModal(false);
  };

  useEffect(() => {
    if (showSaveModal) {
      const timer = setTimeout(() => {
        setShowSaveModal(false);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showSaveModal]);

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
        {/* video on */}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
        </svg> */}

        {/* video off */}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.5 17.69c0 .471-.202.86-.504 1.124l-4.746-4.746V7.939l2.69-2.689c.944-.945 2.56-.276 2.56 1.06v11.38zM15.75 7.5v5.068L7.682 4.5h5.068a3 3 0 013 3zM1.5 7.5c0-.782.3-1.494.79-2.028l12.846 12.846A2.995 2.995 0 0112.75 19.5H4.5a3 3 0 01-3-3v-9z" />
        </svg> */}

        {/* volume on */}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
          <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
        </svg> */}

        {/* volume off */}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
        </svg> */}

        {showLeaveModal && (
          <LeaveModal
            handleSaveAndLeave={handleSaveAndLeave}
            handleCloseModal={handleCloseModal}
            setShowLeaveModal={setShowLeaveModal}
          />
        )}

        {showSaveModal && (
          <Modal
            isOpen={showSaveModal}
            onClose={() => setShowSaveModal(false)}
            isCentered
            size={"xs"}
          >
            <ModalOverlay />
            <ModalContent className="p-2" style={{ borderRadius: "20px" }}>
              <ModalHeader className="font-poppins text-pp-darkpurple">
                Progress saved!
              </ModalHeader>
            </ModalContent>
          </Modal>
        )}

        {/* Question section */}
        <div className="bg-pp-gray font-poppins w-4/12 h-screen flex flex-col gap-4 p-4">
          <QuestionDisplay question={question} getQuestion={getQuestion} />
        </div>

        {/* Code editor section */}
        <div className="bg-[#282A35] font-poppins w-6/12 h-screen flex flex-col gap-4 p-4 overflow-auto">
          <div className="flex justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="text-pp-blue w-8 h-8 cursor-pointer"
              onClick={handleSave}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              strokeWidth={1.5}
              className="text-pp-blue w-8 h-8 cursor-pointer"
              onClick={handleLeaveClick}
            >
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
          </div>
          <Button onClick={openCodeGenModal}>Generate</Button>

          <CodeEditor roomId={roomId || ""} />
        </div>

        {/* Chat and video section */}
        <div className="bg-pp-gray font-poppins w-2/12 h-screen flex flex-col gap-4">
          <button
            className="text-pp-red bg-slate-900 rounded p-2"
            onClick={() => setShowChat(!showChat)}
          >
            Show Chat / Video
          </button>
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
