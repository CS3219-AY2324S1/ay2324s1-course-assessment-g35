import React, { useEffect, useMemo, useState } from "react";
import Chat from "@/components/Collaboration/Chat";
import { useRouter } from "next/router";
import io, { Socket } from "socket.io-client";
import VideoCall from "@/components/Collaboration/VideoCall";
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
  Tooltip,
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
          {/* TODO: maybe move the save button to inside the code editor if possible so that it can look nicer if it's on the same row as language options */}
          <div className="flex justify-between">
            <Tooltip
                  label="Save solution"
                  aria-label="Save solution"
                  // bg="black"
                  closeDelay={200}
                >
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
            </Tooltip>
            <Tooltip
                  label="Save and Leave"
                  aria-label="Save and Leave"
                  // bg="black"
                  closeDelay={200}
                >
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
            </Tooltip>
          </div>
          <Button onClick={openCodeGenModal}>Generate</Button>

          <CodeEditor roomId={(roomId as string) || ""} />
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
