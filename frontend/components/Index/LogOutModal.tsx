import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
} from "@chakra-ui/react";

interface LogOutModalProps {
  setShowLogOutModal: (status: boolean) => void;
  confirmLogOut: () => void;
  handleCloseModal: () => void;
}

export default function LogOutModal({
  setShowLogOutModal,
  confirmLogOut,
  handleCloseModal,
}: LogOutModalProps) {
  return (
    <Modal
      isOpen={true}
      onClose={() => setShowLogOutModal(false)}
      isCentered
    >
      <ModalOverlay />
      <ModalContent className="p-2" style={{ borderRadius: "20px" }}>
        <ModalHeader className="text-pp-darkpurple">
          Log out from PeerPrep?
        </ModalHeader>
        <ModalBody className="flex justify-between">
          <div
            onClick={confirmLogOut}
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
  );
}
