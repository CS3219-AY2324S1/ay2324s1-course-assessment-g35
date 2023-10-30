import { Button, Tooltip, Select } from "@chakra-ui/react";
import io from "socket.io-client";
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
import Countdown from "@/components/Main/Countdown";
import { useRouter } from "next/router";
import axios from "axios";
import Questions from "@/components/Main/Questions";
import { LogoutIcon, ProfileIcon } from "@/icons";

let socket: any;

const Match = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [buttonText, setButtonText] = useState("Get Matched");
  const [matchingStarted, setMatchingStarted] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const { width, height } = useWindowSize();
  const [difficulty, setDifficulty] = useState("");
  const dropdownOptions = ["Easy", "Medium", "Hard"];
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleOptionChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    setDifficulty(e.currentTarget.value);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setShowLogoutModal(false);
  };

  const stopMatching = () => {
    setMatchingStarted(false);
    setShowSpinner(false);
    socket.emit("leave", { difficulty: difficulty });
    setButtonText("Get Matched");
  };

  console.log(matchingStarted);
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
      setButtonText("Stop Matching...");
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

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    router.push("/Login");
  };
  return (
    <div className="flex flex-col h-screen w-screen bg-pp-darkpurple">
      <Center>
        <Modal isOpen={showModal} onClose={handleCloseModal} isCentered>
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
        <Modal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          isCentered
        >
          <ModalOverlay />
          <ModalContent className="p-2">
            <ModalHeader>Log out from PeerPrep?</ModalHeader>
            <ModalBody className="flex justify-between">
              <div
                onClick={confirmLogout}
                className="bg-pp-blue w-40 rounded-[30px] p-2 text-white text-center font-bold cursor-pointer"
              >
                Yes, log out
              </div>
              <div
                onClick={handleCloseModal}
                className="w-40 p-2 text-black text-center font-bold cursor-pointer"
              >
                Cancel
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Center>

      <div className="bg-gradient-to-r from-pp-blue to-pp-lightpurple flex-col ml-11 mr-11 my-10 rounded-[30px]">
        <div className="px-9 py-8">
          <div className="flex justify-between">
            <Tooltip
              label="Profile"
              aria-label="Profile"
              bg="pp-blue"
              closeDelay={200}
            >
              <div className="cursor-pointer">
                <ProfileIcon />
              </div>
            </Tooltip>
            <Tooltip
              label="Log out"
              aria-label="Profile"
              bg="pp-darkpurple"
              closeDelay={200}
            >
              <div className="cursor-pointer" onClick={handleLogout}>
                <LogoutIcon />
              </div>
            </Tooltip>
          </div>
          <div className="flex justify-between">
            <div className="flex-col">
              <h1 className="text-white text-6xl font-bold tracking-wide mt-40">
                Hello Sonny!
              </h1>

              <h2 className="text-white text-md font-medium">
                Ready to PeerPrep today?
              </h2>
            </div>
            <div className="flex-col mt-44">
              <label className="text-md font-medium text-white">
                Select a difficulty level
              </label>
              <div className="flex items-center mt-2">
                <Select
                  bg="white"
                  width={44}
                  placeholder="Difficulty Level"
                  className="cursor-pointer bg-white text-pp-darkpurple"
                  onChange={handleOptionChange}
                  value={difficulty}
                >
                  {dropdownOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>

                <div className="flex items-center ml-6">
                  <div
                    className="bg-pp-blue w-60 rounded-[30px] p-2 text-white text-center font-bold cursor-pointer"
                    onClick={handleButtonClick}
                  >
                    {buttonText}{" "}
                    {matchingStarted && (
                      <Countdown
                        seconds={10}
                        isRunning={matchingStarted}
                        onTimerEnd={stopMatching}
                      />
                    )}
                  </div>
                  {showSpinner && <Spinner className="ml-4" />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {matchFound && <Confetti width={width} height={height} />}
      </div>
      <div>
        {/* <button onClick={handleSubmit}>Validation test</button> */}
        {/* <br /> */}
        <div className="ml-11 mr-11">
          <Questions />
        </div>
      </div>
    </div>
  );
};

export default Match;
