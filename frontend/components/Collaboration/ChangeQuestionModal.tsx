import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface ChangeQuestionModalProps {
  setShowChangeQuestionModal: (arg0: boolean) => void;
  getQuestion: () => void;
  saveToHistory: () => void;
}

export default function ChangeQuestionModal({
  setShowChangeQuestionModal,
  getQuestion,
  saveToHistory,
}: ChangeQuestionModalProps) {
  const handleSaveAndProceed = () => {
    saveToHistory();
    getQuestion();
    setShowChangeQuestionModal(false);
  };

  const handleProceed = () => {
    getQuestion();
    setShowChangeQuestionModal(false);
  };

  const handleClose = () => {
    setShowChangeQuestionModal(false);
  };

  return (
    // <Modal isOpen={true} onClose={() => setShowProfileModal(false)} isCentered>
    //   <ModalOverlay />
    //   <ModalContent
    //     style={{ padding: "20px", height: "400px", borderRadius: "20px" }}
    //   >
    //     <div>
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         strokeWidth={3}
    //         stroke="currentColor"
    //         className="w-6 h-6 text-pp-blue cursor-pointer"
    //         onClick={handleCloseModal}
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    //         />
    //       </svg>
    //     </div>

    // <div className="w-full h-full">
    //   <div className="h-full flex flex-col gap-y-4 justify-center">
    // <div className="font-poppins text-pp-darkpurple text-[30px] font-bold">
    //   Profile
    // </div>
    //     <div className="flex flex-col">
    //       <p className="font-poppins text-base tracking-tigher">Username</p>
    //       <div className="rounded-3xl text-pp-gray bg-gray-400 font-poppins text-sm block w-full p-2.5 focus:outline-none tracking-tight">
    //         {user?.username}
    //       </div>
    //     </div>
    //     <div className="flex justify-between pt-4">
    //       <div>
    //         {isChangedEmail && (
    //           <button
    //             onClick={handleSubmit}
    //             type="submit"
    //             className="bg-pp-blue hover:bg-pp-accentblue w-40 rounded-3xl p-2 cursor-pointer font-poppins text-base text-white tracking-tight"
    //           >
    //             Update profile
    //           </button>
    //         )}
    //       </div>
    //       <div>
    //         <button
    //           className="bg-pp-red hover:bg-pp-accentred w-40 rounded-3xl p-2 cursor-pointer font-poppins text-base text-white tracking-tight"
    //           onClick={handleDeleteClick}
    //         >
    //           Delete account
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    //   </ModalContent>
    // </Modal>

    <Modal
      isOpen={true}
      onClose={() => setShowChangeQuestionModal(false)}
      isCentered
    >
      <ModalOverlay />
      <ModalContent className="gap-y-4 "style={{ padding: "20px", borderRadius: "20px" }}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 text-pp-blue cursor-pointer"
            onClick={handleClose}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </div>
        
        <div className="flex flex-col gap-y-2">
          <p className="font-poppins text-pp-darkpurple text-lg font-bold">
            Change question?
          </p>

          <p className="font-poppins text-pp-darkpurple text-base">Save to keep your work for this question.</p>
          <div className="flex flex-row justify-between">
            <button
              onClick={handleSaveAndProceed}
              className="bg-pp-blue hover:bg-pp-accentblue rounded-3xl w-60 py-2 px-4 cursor-pointer font-poppins font-bold text-base text-white tracking-tighter"
            >
              Save & change
            </button>
            <button
              onClick={handleProceed}
              className="rounded-3xl w-60 py-2 px-4 cursor-pointer font-poppins font-bold text-base text-black tracking-tighter"
            >
              Change question
            </button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
