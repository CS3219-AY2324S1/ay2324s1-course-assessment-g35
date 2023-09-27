import { Button, ButtonGroup } from "@chakra-ui/react";
import io from "Socket.IO-client";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

let socket: any;

const Match = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [buttonText, setButtonText] = useState("START MATCHING");
  const [matchingStarted, setMatchingStarted] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const { width, height } = useWindowSize();

  console.log(matchingStarted);
  const matchButton = async () => {
    if (matchingStarted == true) {
      setMatchingStarted(false);
      setShowSpinner(false);

      setButtonText("START MATCHING");
    } else {
      // Start matching PROCESS
      setMatchingStarted(true);
      setShowSpinner(true);
      const rando = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

      socket.emit("queue", {
        id: rando.toString(),
        difficulty: "easy",
        matchingBoolean: true,
        // Add more key-value pairs as needed
      });
      setButtonText("STOP MATCHING...");
    }
  };

  const socketInitializer = async () => {
    socket = io("http://localhost:3001");

    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    socket.on("match", (msg: string) => {
      setMatchFound(true);
      setButtonText("U FOUND MATCH!!!");
      setShowSpinner(false);
    });
    socket.on("queue", (msg: string) => {
      console.log(msg);
    });
  };

  useEffect(() => {
    socketInitializer();
  }, []);
  return (
    <>
      {showSpinner && <Spinner />}
      <Button colorScheme="blue" onClick={matchButton}>
        {buttonText}
      </Button>
      {matchFound && <Confetti width={width} height={height} />}
    </>
  );
};

export default Match;
