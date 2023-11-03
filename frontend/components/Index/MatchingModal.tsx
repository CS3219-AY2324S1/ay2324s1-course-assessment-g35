import React, { useEffect, useState } from "react";
import { matchingFacts } from "@/public/data/Facts";
import { Modal, ModalContent } from "@chakra-ui/react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

interface MatchingModalProps {
  handleMatching: () => void;
  matchFound: boolean;
  setShowMatchingModal: (status: boolean) => void;
}

export default function MatchingModal({
  handleMatching,
  matchFound,
  setShowMatchingModal,
}: Readonly<MatchingModalProps>) {
  const handleClick = () => {
    handleMatching();
  };

  const [randomFact, setRandomFact] = useState("");
  const [factIndex, setFactIndex] = useState(0);
  const { width, height } = useWindowSize();

  const updateRandomFact = () => {
    const randomIndex = (factIndex + 1) % matchingFacts.length;
    const newRandomFact = matchingFacts[randomIndex];
    setRandomFact(newRandomFact);
    setFactIndex(randomIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateRandomFact();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [factIndex, matchingFacts]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * matchingFacts.length);
    const initialRandomFact = matchingFacts[randomIndex];
    setRandomFact(initialRandomFact);
    setFactIndex(randomIndex);
  }, [matchingFacts]);

  return (
    // TODO: remove the animation on opening the modal?
    <Modal
      isOpen={true}
      onClose={() => setShowMatchingModal(false)}
      size="full"
    >
      <ModalContent>
        <div className="bg-pp-darkpurple flex flex-col h-screen w-screen">
          {matchFound && (
            <Confetti
              width={width}
              height={height}
              colors={["#88D9E6", "#69B6C2", "#6C6EA0", "#FFFFFF", "#BEE460"]}
              drawShape={(ctx) => {
                // NOTE: can change it later lol
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
          <div className="flex space-x-2 p-4 h-1/12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-6 h-6 text-pp-blue cursor-pointer"
              onClick={handleClick}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            <p className="font-poppins text-white tracking-tight text-base">
              Stop matching
            </p>
          </div>
          <div
            className="flex items-center justify-center h-screen w-screen"
            style={{
              flexDirection: "column",
            }}
          >
            <h1 className="font-poppins text-white text-2xl font-bold tracking-tighter">
              {matchFound
                ? "We've found you a peer!"
                : "Hold on... We're finding you a peer"}
            </h1>

            {!matchFound && (
              <div
                className="flex items-center justify-center mt-4"
                style={{
                  flexDirection: "column",
                }}
              >
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-white animate-spin fill-pp-blue"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              </div>
            )}

            <p className="duration-1000 font-poppins text-white text-base tracking-tight mt-4">
              {matchFound ? "Taking you to your collab room now" : randomFact}
            </p>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
