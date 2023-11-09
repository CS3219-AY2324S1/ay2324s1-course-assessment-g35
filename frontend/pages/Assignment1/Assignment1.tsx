
import Questions from "./components/Questions/Questions";
import Header from "./components/Header/Header";
import { ChakraProvider, Modal, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import withAuth from "@/components/withAuth";
import { useEffect, useState } from "react";
import ProfileModal, { UserType } from "@/components/Index/ProfileModal";
import axios from "axios";
import { USER_URI } from "@/constants/uri";
import { ProfileIcon } from "@/icons";

function Assignment1() {

  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);


  const handleProfile = () => {
    setShowProfileModal(true);
  };

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

  const handleCloseModal = () => {
    setShowProfileModal(false);
  };

  const handleUpdateModalStatus = () => {
    handleCloseModal();
    setShowFeedbackModal(true);
    console.log(showFeedbackModal);
  };

  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);

  return (
    <ChakraProvider>
            {showProfileModal && (
        <ProfileModal
          user={user}
          fetchAndSetUser={fetchAndSetUser}
          setShowProfileModal={setShowProfileModal}
          handleCloseModal={handleCloseModal}
          updateModalStatus={handleUpdateModalStatus}
        />
      )}

      {showFeedbackModal && (
        <Modal
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          isCentered
        >
          <ModalOverlay />
          <ModalContent className="p-2" style={{ borderRadius: "20px" }}>
            <ModalHeader className="font-poppins text-pp-darkpurple">
              Profile successfully updated!
            </ModalHeader>
          </ModalContent>
        </Modal>
      )}


      <div className="main">
        <Header />
        <div onClick={handleProfile} className="cursor-pointer">
          <ProfileIcon />
        </div>
        <Questions />
      </div>
    </ChakraProvider>
  );
}

export default withAuth(Assignment1);