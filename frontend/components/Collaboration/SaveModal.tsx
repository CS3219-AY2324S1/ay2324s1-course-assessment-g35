import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
interface SaveModalProps {
  handleSave: () => void;
  handleSaveAndLeave: () => void;
  handleCloseModal: () => void;
  setShowSaveModal: (status: boolean) => void;
}

export default function SaveModal({
  handleSave,
  handleSaveAndLeave,
  handleCloseModal,
  setShowSaveModal
}: SaveModalProps) {
  return (
    <Modal isOpen={true} onClose={() => setShowSaveModal(false)} isCentered>
      <ModalOverlay />
      <ModalContent className="p-2" style={{ borderRadius: "20px" }}>
        <ModalHeader className="font-poppins text-pp-darkpurple">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 text-pp-blue cursor-pointer mb-4"
            onClick={handleCloseModal}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Save changes?
        </ModalHeader>

        <ModalBody className="flex justify-between">
          <div
            onClick={handleSave}
            className="font-poppins bg-pp-blue hover:bg-pp-accentblue w-40 rounded-3xl p-2 text-white text-center font-bold cursor-pointer"
          >
            Save
          </div>
          <div
            onClick={handleSaveAndLeave}
            className="font-poppins bg-pp-blue hover:bg-pp-accentblue w-40 rounded-3xl p-2 text-white text-center font-bold cursor-pointer"
          >
            Save & leave
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
