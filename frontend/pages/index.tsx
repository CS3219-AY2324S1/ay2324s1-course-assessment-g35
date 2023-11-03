import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Countdown from "@/components/Index/Countdown";
import { useRouter } from "next/router";
import axios from "axios";
import Questions from "@/components/Index/Questions";
import { LogoutIcon, ProfileIcon } from "@/icons";
import ProfileModal from "@/components/Index/ProfileModal";
import MatchingModal from "@/components/Index/MatchingModal";
import LogOutModal from "@/components/Index/LogOutModal";
import { MATCHINGSERVICE_URI, USER_URI } from "@/constants/uri";
import withAuth from "@/components/withAuth";
import React from "react";
import { Rain } from "react-rainfall";

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

const Dashboard = () => {
  const router = useRouter();
  const { width, height } = useWindowSize();

  const [difficulty, setDifficulty] = useState("");
  const dropdownOptions = ["Easy", "Medium", "Hard"];

  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showLogOutModal, setShowLogOutModal] = useState<boolean>(false);
  const [showMatchingModal, setShowMatchingModal] = useState<boolean>(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);

  const [matchWithoutDifficulty, setMatchWithoutDifficulty] =
    useState<boolean>(false);
  const [matchingStarted, setMatchingStarted] = useState<boolean>(false);
  const [matchFound, setMatchFound] = useState<boolean>(false);
  const [showTryAgainModal, setShowTryAgainModal] = useState<boolean>(false);

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

  const handleLogout = () => {
    setShowLogOutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    router.push("/Login");
  };

  const handleProfile = () => {
    setShowProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowLogOutModal(false);
    setShowProfileModal(false);
  };

  const handleOptionChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    setDifficulty(e.currentTarget.value);
    if (e.currentTarget.value != "") {
      setMatchWithoutDifficulty(false);
    }
  };

  const handleUpdateModalStatus = () => {
    handleCloseModal();
    setShowFeedbackModal(true);
    console.log(showFeedbackModal);
  };

  // Start of matching related
  const stopMatching = () => {
    setMatchingStarted(false);
    setShowMatchingModal(false);
    socket.emit("leave", { difficulty: difficulty });
    setShowTryAgainModal(true);
  };

  const cancelMatching = () => {
    setMatchingStarted(false);
    setShowMatchingModal(false);
    socket.emit("leave", { difficulty: difficulty });
  };

  const handleMatching = async () => {
    if (matchingStarted == true) {
      cancelMatching();
    } else {
      // Start matching PROCESS
      if (difficulty != "") {
        setMatchingStarted(true);
        setShowMatchingModal(true);
        socket.emit("queue", {
          difficulty: difficulty,
        });
      } else {
        setMatchWithoutDifficulty(true);
      }
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
      setTimeout(() => {
        router.push(
          `/Collab?roomId=${msg.roomId}&myId=${msg.myId}&otherId=${msg.otherId}&difficulty=${msg.difficulty}`
        );
      }, 3000);
    });

    socket.on("queue", (msg: string) => {
      console.log(msg);
    });
  };

  useEffect(() => {
    // TODO: might need a cleanup function
    socketInitializer();
  }, []);
  // End of matching related

  useEffect(() => {
    if (showFeedbackModal) {
      const timer = setTimeout(() => {
        setShowFeedbackModal(false);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showFeedbackModal]);

  useEffect(() => {
    if (showTryAgainModal) {
      const timer = setTimeout(() => {
        setShowTryAgainModal(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showTryAgainModal]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins"
        rel="stylesheet"
      ></link>

      {showProfileModal && (
        <ProfileModal
          user={user}
          fetchAndSetUser={fetchAndSetUser}
          setShowProfileModal={setShowProfileModal}
          handleCloseModal={handleCloseModal}
          updateModalStatus={handleUpdateModalStatus}
        />
      )}

      {showLogOutModal && (
        <LogOutModal
          setShowLogOutModal={setShowLogOutModal}
          confirmLogOut={confirmLogout}
          handleCloseModal={handleCloseModal}
        />
      )}

      {showMatchingModal && matchingStarted && (
        <MatchingModal
          handleMatching={handleMatching}
          matchFound={matchFound}
          setShowMatchingModal={setShowMatchingModal}
        />
      )}

      {showFeedbackModal && (
        <Modal
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          isCentered
        >
          <ModalOverlay />
          <ModalContent className="p-2" style={{ borderRadius: "20px" }}>
            <ModalHeader className="font-poppins text-pp-darkpurple">
              Profile successfully updated!
            </ModalHeader>
          </ModalContent>
        </Modal>
      )}

      {showTryAgainModal && (
        <Modal
          isOpen={showTryAgainModal}
          onClose={() => setShowTryAgainModal(false)}
          size="full"
        >
          <ModalOverlay />
          <ModalContent>
            <div className="bg-pp-darkpurple flex flex-col h-screen w-screen">
              <div
                className="flex items-center justify-center h-screen w-screen"
                style={{
                  flexDirection: "column",
                }}
              >
                <Rain />
                <div className="text-center">
                  <h1 className="font-poppins text-white text-2xl font-bold tracking-tighter">
                    Oops! It seems there's no match at the moment.
                  </h1>
                  <br />
                  <h1 className="font-poppins text-white text-base tracking-tight mt-4">
                    Take a breather, explore some other options, and let's try
                    again later.
                  </h1>
                </div>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}

      <div className="flex flex-col gap-y-8 p-8 h-screen w-screen bg-pp-darkpurple">
        <div className="flex flex-row gap-x-8">
          <div className="bg-gradient-to-r from-pp-blue to-pp-lightpurple flex-col rounded-[20px] w-8/12">
            {/* Start of profile dashboard */}
            <div className="p-8">
              <div className="flex justify-between">
                <Tooltip
                  label="Profile"
                  aria-label="Profile"
                  bg="pp-blue"
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
                  <h1 className="font-poppins text-white text-6xl font-black tracking-tight mt-40">
                    Hello {user?.username}!
                  </h1>
                  <p className="font-poppins text-white text-2xl mt-2 tracking-tight">
                    Ready to PeerPrep today?
                  </p>
                </div>
                <div className="flex-col mt-44">
                  {matchWithoutDifficulty && (
                    <label className="font-poppins text-base tracking-tight text-pp-red">
                      Please choose a difficulty
                    </label>
                  )}

                  {!matchWithoutDifficulty && (
                    <label className="font-poppins text-base tracking-tight text-white">
                      Select a difficulty level
                    </label>
                  )}

                  <div className="flex flex-row space-x-4 items-center mt-2">
                    <Select
                      bg="white"
                      width={44}
                      placeholder="Difficulty Level"
                      className="font-poppins cursor-pointer bg-white text-pp-darkpurple tracking-tight"
                      onChange={handleOptionChange}
                      value={difficulty}
                    >
                      {dropdownOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <button
                      onClick={handleMatching}
                      className="bg-pp-blue hover:bg-pp-accentblue w-40 rounded-3xl p-2 cursor-pointer font-poppins font-bold text-lg text-white tracking-tight"
                    >
                      Get matched
                      {matchingStarted && (
                        <Countdown
                          seconds={30}
                          isRunning={matchingStarted}
                          onTimerEnd={stopMatching}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End of profile dashboard */}

          {/* Start of activity */}
          <div className="w-4/12">
            <div className="bg-pp-gray rounded-[20px]">
              <p>activity will go here</p>
            </div>
          </div>
          {/* End of activity */}
        </div>
        {/* TODO: I want to have the title be fixed and only scroll the questions but I can't configure it with the divs - either just the questions scroll but no BG or the whole thing scrolls  */}
        <Questions />
      </div>
    </>
  );
};

export default withAuth(Dashboard);
