import { Button } from "@chakra-ui/react";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import Countdown from "@/components/Main/Countdown";
import { useRouter } from "next/router";
import axios from "axios";
import Questions from "@/components/Main/Questions";

let socket: any;

type MatchMessage = {
  roomId: string;
  myId: string;
  otherId: string;
};

const Match = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [buttonText, setButtonText] = useState("START MATCHING");
  const [matchingStarted, setMatchingStarted] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const { width, height } = useWindowSize();
  const [difficulty, setDifficulty] = useState("");
  const dropdownOptions = ["Easy", "Medium", "Hard"];
  const [showModal, setShowModal] = useState(false);

  const handleOptionChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    setDifficulty(e.currentTarget.value);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const stopMatching = () => {
    setMatchingStarted(false);
    setShowSpinner(false);
    socket.emit("leave", { difficulty: difficulty });
    setButtonText("START MATCHING");
  };
  const handleButtonClick = async () => {
    if (matchingStarted == true) {
      stopMatching();
    } else {
      // Start matching PROCESS
      setMatchingStarted(true);
      setShowSpinner(true);
      socket.emit("queue", {
        difficulty: difficulty,
      });
      setButtonText("STOP MATCHING...");
    }
  };

  const socketInitializer = async () => {
    const token = localStorage.getItem("token");
    socket = io("http://localhost:3001", {
      auth: {
        token: token,
      },
    });

    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.on("connect_error", (err: any) => {
      alert(err.message);
    });

    socket.on("match", (msg: MatchMessage) => {
      setMatchFound(true);
      setShowSpinner(false);
      setShowModal(true);
      setButtonText("START MATCHING");
      setTimeout(() => {
        const chatLink = `http://localhost:3000/Chat?roomId=${msg.roomId}&myId=${msg.myId}&otherId=${msg.otherId}`;
        router.push(chatLink);
      }, 3000);
    });

    socket.on("queue", (msg: string) => {
      console.log(msg);
    });
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.post(
        "http://localhost:8000/users/validate",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <Modal isOpen={showModal} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Match Found!</ModalHeader>
          <ModalBody>
            <Text fontWeight="medium" mb="1rem">
              Taking you to your room now!
              <Spinner className="ml-6" />
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>

      <div className="bg-white h-full w-2/6 ">
        <div className="ml-10">
          <h1 className="text-6xl font-bold mb-8 tracking-wide mt-36">
            Welcome to Peerprep
          </h1>
          <h2 className="text-gray-400 mb-8 text-md">
            Get matched with other students based on difficulty level.
          </h2>
          <div className="w-64 mb-24">
            <label className="block text-md font-medium text-gray-700">
              Select a difficulty level
            </label>
            <select
              className="block w-full mt-1 border border-solid border-gray-300  shadow-sm focus:outline-none"
              onChange={handleOptionChange}
              value={difficulty}
            >
              <option value="" hidden>
                Difficulty level
              </option>
              {dropdownOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <Button
              colorScheme="blue"
              onClick={handleButtonClick}
              className="w-80 py-6 px-8"
            >
              {buttonText}{" "}
              {matchingStarted && (
                <Countdown
                  seconds={10}
                  isRunning={matchingStarted}
                  onTimerEnd={stopMatching}
                />
              )}
            </Button>
            {showSpinner && <Spinner className="ml-4" />}
          </div>
        </div>

        {matchFound && <Confetti width={width} height={height} />}
      </div>
      <div className="bg-gray-100 h-full w-4/6">
        <button onClick={handleSubmit}>Validation test</button>
        <br />
        <div className="p-8 mt-20">
          <Questions />
        </div>
      </div>
    </div>
  );
};

export default Match;
