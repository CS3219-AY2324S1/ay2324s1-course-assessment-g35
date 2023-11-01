import { useState } from "react";
import axios from "axios";
import router from "next/router";

import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

export interface UserType {
  username: string;
  email: string;
  role: string;
}

interface ProfileModalProps {
  user: UserType | undefined;
  fetchAndSetUser: () => void;
  setShowProfileModal: (status: boolean) => void;
  handleCloseModal: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  fetchAndSetUser,
  setShowProfileModal,
  handleCloseModal,
}) => {
  const [isChangedEmail, setChangedEmail] = useState<boolean>(false);

  const handleDeleteClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete("http://localhost:8000/", {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(response.data);
      localStorage.removeItem("token");
      router.push("/Login");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "An error occurred!");
    }
  };

  const [email, setEmail] = useState<string>("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setChangedEmail(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // TODO: automatically close the modal when the email has been changed or change how it looks,
    // ie. remove input text and hide update button

    e.preventDefault();
    console.log(email);

    const payload = {
      email: email,
    };

    try {
      // get jwt from local storage and send it to backend
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:8000/edit",
        payload,
        config
      );
      fetchAndSetUser();
    } catch (error: any) {
      console.error("An error occurred:", error);
      alert(error.message || "An error occurred!");
    }
  };

  return (
    <Modal isOpen={true} onClose={() => setShowProfileModal(false)} isCentered>
      <ModalOverlay />
      <ModalContent
        style={{ padding: "20px", height: "400px", borderRadius: "20px" }}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 text-pp-lightblue cursor-pointer"
            onClick={handleCloseModal}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </div>

        <div className="w-full h-full">
          <div
            className="h-full flex justify-center"
            style={{ flexDirection: "column" }}
          >
            <div>
              <div className="font-poppins">Username</div>
              <div className="mt-2 rounded-3xl text-pp-gray bg-gray-400 font-poppins sm:text-sm block w-full p-2.5 focus:outline-none">
                {user?.username}
              </div>
              <form className="md:space-y-4" onSubmit={handleSubmit}>
                <div>
                  <div className="font-poppins mt-2">Email</div>
                  <input
                    type="text"
                    name="email"
                    id="emailChange"
                    placeholder={user?.email}
                    className="mt-2 rounded-3xl bg-pp-gray text-white font-poppins sm:text-sm block w-full p-2.5 focus:outline-none"
                    required
                    value={email}
                    onChange={handleEmail}
                  />
                </div>
              </form>
            </div>

            <div className="mt-6 flex justify-between">
              <div>
                {isChangedEmail && (
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="font-poppins bg-pp-lightblue text-white px-4 py-2 rounded-3xl hover:bg-pp-darkblue"
                  >
                    Update profile
                  </button>
                )}
              </div>

              <div>
                <button
                  // TODO: get a pp-dark-red for the hover
                  className="bg-pp-red hover:bg-red-700 text-white py-2 px-4 rounded-3xl"
                  onClick={handleDeleteClick}
                >
                  Delete account
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
