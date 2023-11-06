import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
interface SaveModalProps {
  handleSaveAndLeave: () => void;
  handleCloseModal: () => void;
  setShowLeaveModal: (status: boolean) => void;
}

export default function LeaveModal({
  handleSaveAndLeave,
  handleCloseModal,
  setShowLeaveModal,
}: SaveModalProps) {
  return (
    <Modal
      isOpen={true}
      onClose={() => setShowLeaveModal(false)}
      isCentered
      size="md"
    >
      <ModalOverlay />
      <ModalContent className="p-2" style={{ borderRadius: "20px" }}>
        <ModalHeader className="font-poppins text-2xl text-pp-darkpurple tracking-tighter">
          Leaving the room?
        </ModalHeader>
        <ModalBody className="flex justify-between">
          <button
            onClick={handleSaveAndLeave}
            className="bg-pp-blue hover:bg-pp-accentblue rounded-3xl w-40 p-2 cursor-pointer font-poppins font-bold text-base text-white tracking-tighter"
          >
            Save & leave
          </button>
          <button
            onClick={handleCloseModal}
            className="rounded-3xl w-40 p-2 cursor-pointer font-poppins font-bold text-base text-black tracking-tighter"
          >
            Cancel
          </button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
