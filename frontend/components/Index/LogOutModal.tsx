import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
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
}: Readonly<LogOutModalProps>) {
  return (
    <Modal isOpen={true} onClose={() => setShowLogOutModal(false)} isCentered>
      <ModalOverlay />
      <ModalContent className="p-2" style={{ borderRadius: "20px" }}>
        <ModalHeader className="font-poppins text-2xl text-pp-darkpurple tracking-tighter">
          Log out from PeerPrep?
        </ModalHeader>
        <ModalBody className="flex justify-between">
          <button
            onClick={confirmLogOut}
            className="bg-pp-blue hover:bg-pp-accentblue w-40 rounded-3xl p-2 cursor-pointer font-poppins font-bold text-base text-white tracking-tighter"
          >
            Yes, log out
          </button>
          <button
            onClick={handleCloseModal}
            className="w-40 rounded-3xl p-2 cursor-pointer font-poppins font-bold text-base text-pp-darkpurple tracking-tighter"
          >
            Cancel
          </button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
