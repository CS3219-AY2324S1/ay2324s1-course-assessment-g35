import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

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
    <Modal
      isOpen={true}
      onClose={() => setShowChangeQuestionModal(false)}
      isCentered
      size="md"
    >
      <ModalOverlay />
      <ModalContent className="p-6" style={{ borderRadius: "20px" }}>
        <div className="flex flex-col gap-y-2">
          <p className="font-poppins text-pp-darkpurple text-xl font-bold">
            Save your progress?
          </p>

          <p className="font-poppins text-pp-darkpurple text-base">
            Save to mark this question as completed
          </p>
          <div className="flex flex-row justify-between mt-2">
            <button
              onClick={handleSaveAndProceed}
              className="bg-pp-blue hover:bg-pp-accentblue rounded-3xl w-60 py-2 px-4 cursor-pointer font-poppins font-bold text-base text-white tracking-tighter"
            >
              Save
            </button>
            <button
              onClick={handleProceed}
              className="rounded-3xl w-60 py-2 px-4 cursor-pointer font-poppins font-bold text-base text-black tracking-tighter"
            >
              Switch Question
            </button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
