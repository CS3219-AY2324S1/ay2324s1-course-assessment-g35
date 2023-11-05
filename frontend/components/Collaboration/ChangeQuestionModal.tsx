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
    }

    const handleProceed = () => {
        getQuestion();
        setShowChangeQuestionModal(false);
    }

    return (
      <Center>
        <Modal isOpen={true} onClose={() => setShowChangeQuestionModal(false)} isCentered>
          <ModalOverlay />
          <ModalContent className="p-2" style={{ borderRadius: "20px" }}>
            <ModalHeader className="font-poppins text-pp-darkpurple">
                {/* TODO: ADD CLOSE MODAL BUTTON */}
              Change question?
            </ModalHeader>
  
            <ModalBody>
              <div>Save if you want to keep a record of your work for this question.</div>
              <div className="flex justify-between">
                <button
                    onClick={handleSaveAndProceed}
                    className="bg-pp-blue hover:bg-pp-accentblue rounded-3xl w-40 py-2 px-4 cursor-pointer font-poppins font-bold text-base text-white tracking-tighter"
                >
                    Save & Proceed
                </button>
                <button
                    onClick={handleProceed}
                    className="rounded-3xl w-40 py-2 px-4 cursor-pointer font-poppins font-bold text-base text-black tracking-tighter"
                >
                    Proceed without saving
                </button>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Center>
    );
  }
  