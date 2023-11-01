import {
  Center,
  Select,
  Spinner,
  Text,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Countdown from "@/components/Index/Countdown";
import { useRouter } from "next/router";
import axios from "axios";
import Questions from "@/components/Index/Questions";
import Profile from "@/components/Profile/Profile";
import { LogoutIcon, ProfileIcon } from "@/icons";
import { MATCHINGSERVICE_URI, USER_URI } from "@/constants/uri";

export interface UserType {
  username: string;
  email: string;
  role: string;
}

let socket: any;

type MatchMessage = {
  roomId: string;
  myId: string;
  otherId: string;
  difficulty: string;
};

const Match = () => {
  const router = useRouter();

  const [showSpinner, setShowSpinner] = useState(false);
  const [buttonText, setButtonText] = useState("Get matched");

  const [matchingStarted, setMatchingStarted] = useState<boolean>(false);
  const [matchFound, setMatchFound] = useState<boolean>(false);
  const { width, height } = useWindowSize();
  const [difficulty, setDifficulty] = useState("");
  const dropdownOptions = ["Easy", "Medium", "Hard"];
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  // Start of user profile related
  const [user, setUser] = useState<UserType>();
  const fetchAndSetUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(USER_URI.GET_TOKEN, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAndSetUser();
  }, []);
  // End of user profile

  // Start of logout related
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    router.push("/Login");
  };
  // End of logout related

  // Start of profile related
  const handleProfile = () => {
    setShowProfileModal(true);
  };
  // End of profile related

  const handleCloseModal = () => {
    setShowModal(false);
    setShowLogoutModal(false);
    setShowProfileModal(false);
  };

  const handleOptionChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    setDifficulty(e.currentTarget.value);
  };

  // Start of matching related
  const stopMatching = () => {
    setMatchingStarted(false);
    setShowSpinner(false);
    socket.emit("leave", { difficulty: difficulty });
    setButtonText("Get Matched");
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
      setButtonText("Stop Matching...");
    }
  };

  const socketInitializer = async () => {
    const token = localStorage.getItem("token");
    socket = io(MATCHINGSERVICE_URI, {
      auth: {
        token: token,
      },
    });

    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.on("connect_error", (err: any) => {
      console.error(err.message);
    });

    socket.on("match", (msg: MatchMessage) => {
      setMatchFound(true);
      setShowSpinner(false);
      setShowModal(true);
      setButtonText("START MATCHING");
      setTimeout(() => {
        router.push(`/Collab?roomId=${msg.roomId}&myId=${msg.myId}&otherId=${msg.otherId}&difficulty=${msg.difficulty}`);
      }, 3000);
    });

    socket.on("queue", (msg: string) => {
      console.log(msg);
    });
  };

  useEffect(() => { // todo: might need a cleanup function
    socketInitializer();
  }, []);
  // End of matching related

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const token = localStorage.getItem("token");
  //   console.log(token);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/users/validate",
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Include the token in the request headers
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="flex flex-col h-screen w-screen bg-pp-darkpurple">
      {/* Start of logout modal */}
      <Center>
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
        <Modal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          isCentered
        >
          <ModalOverlay />
          <ModalContent className="p-2" style={{ borderRadius: "20px" }}>
            <ModalHeader className="text-pp-darkpurple">
              Log out from PeerPrep?
            </ModalHeader>
            <ModalBody className="flex justify-between">
              <div
                onClick={confirmLogout}
                className="bg-pp-lightblue hover:bg-pp-darkblue w-40 rounded-3xl p-2 text-white text-center font-bold cursor-pointer"
              >
                Yes, log out
              </div>
              <div
                onClick={handleCloseModal}
                className="w-40 p-2 text-pp-darkpurple text-center font-bold cursor-pointer"
              >
                Cancel
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Center>
      {/* End of logout modal */}

      {/* Start of profile modal */}
      <Modal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          style={{ padding: "20px", height: "400px", borderRadius: "20px" }}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-6 h-6 text-pp-lightblue cursor-pointer"
              onClick={handleCloseModal}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </div>
          <Profile user={user} fetchAndSetUser={fetchAndSetUser} />
        </ModalContent>
      </Modal>
      {/* End of profile modal */}

      <div className="bg-gradient-to-r from-pp-lightblue to-pp-lightpurple flex-col ml-11 mr-11 my-10 rounded-[20px]">
        <div className="px-9 py-8">
          <div className="flex justify-between">
            <Tooltip
              label="Profile"
              aria-label="Profile"
              bg="pp-lightblue"
              closeDelay={200}
            >
              <div onClick={handleProfile} className="cursor-pointer">
                <ProfileIcon />
              </div>
            </Tooltip>
            <Tooltip
              label="Log out"
              aria-label="Logout"
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
                Hello {user?.username}!
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

                {/* TODO: get the button to route to the matching screen instead */}
                <div className="flex items-center ml-6">
                  <div
                    className="bg-pp-lightblue w-60 rounded-[30px] p-2 text-white text-center font-bold cursor-pointer"
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

      {/* TODO: get questions from question service */}
      <div>
        <div className="ml-11 mr-11 rounded-[20px]">
          <Questions />
        </div>
      </div>

      {/* TODO: activity sidebar */}
    </div>
  );
};

export default Match;
