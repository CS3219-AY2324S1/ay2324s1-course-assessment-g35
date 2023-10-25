import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import EditModal from "@/components/Profile/EditModal";
import { UserType } from "@/pages/Profile";
import axios from "axios";
import router from "next/router";

interface AboutProps {
  user: UserType | undefined;
  fetchAndSetUser: () => void;
}

const About: React.FC<AboutProps> = ({ user, fetchAndSetUser }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
  
  return (
    <div className="w-full shadow-lg">
      {isModalOpen && <EditModal setIsModalOpen={setIsModalOpen} fetchAndSetUser={fetchAndSetUser} />}
      <div className="bg-white p-3 shadow-sm rounded">
        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 text-2xl mb-8">
          <span className="text-black">
            <AiOutlineUser className="text-2xl" />
          </span>
          <span className="tracking-wide font-bold text-2xl">Profile</span>
        </div>
        <div className="text-gray-700">
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Username</div>
              <div className="px-4 py-2">{user?.username}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Role</div>
              <div className="px-4 py-2">{ user?.role }</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Email</div>
              <div className="px-4 py-2">
                <a className="text-blue-800" href="mailto:kenneth@example.com">
                  { user?.email }
                </a>
              </div>
            </div>

        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none hover:shadow-xs p-3 my-4"
        >
          Edit personal Details
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded h-fit ml-auto"
          onClick={handleDeleteClick}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default About;
