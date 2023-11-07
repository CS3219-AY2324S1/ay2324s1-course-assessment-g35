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
import { CHATSERVICE_URI, HISTORY_URI, QUESTION_URI } from "@/constants/uri";
import withAuth from "@/components/withAuth";
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
import ChangeQuestionModal from "@/components/Collaboration/ChangeQuestionModal";

function Collab() {
  const router = useRouter();
  const { roomId, myId, otherId, difficulty } = router.query;
  const [showChat, setShowChat] = useState<boolean>(false);
  const [question, setQuestion] = useState<Question>();
  const [showGenerateModal, setShowGenerateModal] = useState<boolean>(false);
  const [code, setCode] = useState<string | undefined>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("c");

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
      .get(`${QUESTION_URI.GET_RANDOM_QUESTION}?difficulty=${difficulty}`)
      .then((res) => {
        setQuestion(res.data);
        localStorage.setItem("question", JSON.stringify(res.data));

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
      localStorage.setItem("question", JSON.stringify(question));
    });
    return newSocket;
  }, [roomId]);

  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [showChangeQuestionModal, setShowChangeQuestionModal] =
    useState<boolean>(false);

  const handleLeaveClick = () => {
    setShowLeaveModal(true);
  };

  const handleSaveAndLeave = () => {
    console.log("SAVING PROGRESS AND LEAVING");

    saveToHistory();

    //CLEANUP local storage only
    localStorage.removeItem("code");
    localStorage.removeItem("question");

    router.push("/");
  };

  const saveToHistory = () => {
    // make call to history service to save qid, uid1, uid2, roomid, and code
    try {
      console.log("code", code);
      const payload = {
        roomid: roomId,
        questionid: question?._id,
        user1: myId,
        user2: otherId,
        time: new Date().toISOString(),
        code: code || "",
        language: selectedLanguage
      };
      axios.post(HISTORY_URI.CREATE_OR_UPDATE, payload);
    } catch (err) {
      console.log(err);
    }
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
            questionTitle={question?.title}
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

        {showChangeQuestionModal && (
          <ChangeQuestionModal
            setShowChangeQuestionModal={setShowChangeQuestionModal}
            getQuestion={getQuestion}
            saveToHistory={saveToHistory}
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
        <div className="bg-pp-gray font-poppins w-4/12 h-screen flex flex-col gap-4 p-4 resize-x overflow-auto max-w-7xl min-w-[300px] relative">
          <QuestionDisplay
            question={question}
            openChangeQuestionModal={() => setShowChangeQuestionModal(true)}
          />
          <div className="absolute w-0 h-0 border-b-[20px] border-l-[20px] border-l-transparent border-b-gray-300 border-solid right-0 bottom-0"></div>
        </div>

        {/* Code editor section */}
        <div className="bg-[#282A35] font-poppins h-screen flex flex-1 flex-col gap-4 p-4 overflow-auto min-w-[300px]">
          <div className="flex justify-end">
            <Tooltip
              label="Back to home"
              aria-label="Back to home"
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

          <button
            onClick={openCodeGenModal}
            disabled={question === undefined}
            className="w-40 bg-pp-blue hover:bg-pp-accentblue rounded-3xl py-2 cursor-pointer font-poppins font-bold text-base text-white tracking-tight"
          >
            Generate
          </button>

          <CodeEditor
            roomId={(roomId as string) || ""}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            code={code}
            setCode={setCode}
          />
        </div>

        {/* Chat and video section */}
        <div className="bg-pp-gray font-poppins w-2/12 h-screen flex flex-col gap-4">
          {/* <VideoComponent /> */}
          <div className="w-full bg-pp-gray mb-4">
            <VideoCall myId={myId} otherId={otherId} />
          </div>

          <button
            className="text-white bg-pp-blue rounded-3xl p-2 mt-4"
            onClick={() => setShowChat(!showChat)}
          >
            {showChat ? "Show video" : "Show chat"}
          </button>
          <div
            className={`w-1/6 absolute bottom-0 h-full ${
              showChat ? "block" : "hidden"
            }`}
          >
            <Chat
              socket={socket}
              roomId={(roomId as string) || ""}
              setShowChat={setShowChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(Collab);
