import { useState } from "react";
import { UserType } from "@/pages/Profile";
import axios from "axios";
import router from "next/router";

interface AboutProps {
  user: UserType | undefined;
  fetchAndSetUser: () => void;
}

const Profile: React.FC<AboutProps> = ({ user, fetchAndSetUser }) => {
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
  );
};

export default Profile;
