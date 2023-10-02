import { Button, ButtonGroup, ModalFooter } from "@chakra-ui/react";
import io from "Socket.IO-client";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import {
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Countdown from "@/components/Countdown";

let socket: any;

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

  console.log(matchingStarted);
  const handleButtonClick = async () => {
    if (matchingStarted == true) {
      stopMatching();
    } else {
      // Start matching PROCESS
      setMatchingStarted(true);
      setShowSpinner(true);
      const rando = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      socket.emit("queue", {
        id: rando.toString(), // not used
        difficulty: difficulty,
        matchingBoolean: true, // dont need
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

    socket.on("match", (msg: string) => {
      setMatchFound(true);
      setShowSpinner(false);
      setShowModal(true);
      setButtonText("START MATCHING");
      setTimeout(() => {
        setMatchFound(false);
      }, 5000);
    });
    socket.on("queue", (msg: string) => {
      console.log(msg);
    });
  };

  useEffect(() => {
    socketInitializer();
  }, []);
  return (
    <div className="flex h-screen w-screen">
      <Center>
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Match Found!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Congratulations, you have found a match!
              <Button colorScheme="blue" className="mt-6">
                Start Coding Now
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Center>

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
              <option value="">Difficulty level</option>
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
              {buttonText}
              {" "}
              {matchingStarted && (<Countdown seconds={10} isRunning={matchingStarted} onTimerEnd={stopMatching} />)}
            </Button>
            {showSpinner && <Spinner className="ml-4" />}
          </div>
        </div>

        {matchFound && <Confetti width={width} height={height} />}
      </div>
      <div className="bg-blue-500 h-full w-4/6">
        <h1>Hello</h1>
      </div>
    </div>
  );
};

export default Match;
