import { Select, Tooltip } from "@chakra-ui/react";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
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

  const [matchWithoutDifficulty, setMatchWithoutDifficulty] =
    useState<boolean>(false);
  const [matchingStarted, setMatchingStarted] = useState<boolean>(false);
  const [matchFound, setMatchFound] = useState<boolean>(false);

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

  // Start of matching related
  const stopMatching = () => {
    setMatchingStarted(false);
    socket.emit("leave", { difficulty: difficulty });
  };

  const handleMatching = async () => {
    if (matchingStarted == true) {
      stopMatching();
    } else {
      // Start matching PROCESS
      if (difficulty != "") {
        setMatchingStarted(true);
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

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins"
        rel="stylesheet"
      ></link>
      <div className="flex flex-col h-screen w-screen bg-pp-darkpurple">
        {showProfileModal && (
          <ProfileModal
            user={user}
            fetchAndSetUser={fetchAndSetUser}
            setShowProfileModal={setShowProfileModal}
            handleCloseModal={handleCloseModal}
          />
        )}

        {showLogOutModal && (
          <LogOutModal
            setShowLogOutModal={setShowLogOutModal}
            confirmLogOut={confirmLogout}
            handleCloseModal={handleCloseModal}
          />
        )}

        {matchingStarted && (
          <MatchingModal
            handleMatching={handleMatching}
            matchFound={matchFound}
          />
        )}
        {matchFound && (
          <Confetti
            width={width}
            height={height}
            colors={["#88D9E6", "#69B6C2", "#6C6EA0", "#FFFFFF", "#BEE460"]}
            drawShape={(ctx) => {
              // NOTE: i can change this later i just thought it's fun that you can change the shapes
              ctx.beginPath();
              for (let i = 0; i < 22; i++) {
                const angle = 0.2 * i;
                const x = (0.2 + 1.5 * angle) * Math.cos(angle);
                const y = (0.2 + 1.5 * angle) * Math.sin(angle);
                ctx.lineTo(x, y);
              }
              ctx.stroke();
              ctx.closePath();
            }}
          />
        )}

        <div className="bg-gradient-to-r from-pp-blue to-pp-lightpurple flex-col ml-11 mr-11 my-10 rounded-[20px]">
          <div className="px-9 py-8">
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

        {/* TODO: get questions from question service */}
        <div>
          <div className="ml-11 mr-11 rounded-[20px]">
            <Questions />
          </div>
        </div>

        {/* TODO: activity sidebar */}
      </div>
    </>
  );
};

export default withAuth(Dashboard);
