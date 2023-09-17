import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import EditModal from "@/components/EditModal";
import { UserType } from "@/pages/Profile";

interface AboutProps {
  user: UserType | undefined;
  fetchAndSetUser: () => void;
}

const About: React.FC<AboutProps> = ({ user, fetchAndSetUser }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className="w-full md:w-9/12 mx-2 h-64 shadow-lg">
      {isModalOpen && <EditModal setIsModalOpen={setIsModalOpen} fetchAndSetUser={fetchAndSetUser} />}
      <div className="bg-white p-3 shadow-sm rounded-sm">
        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 text-2xl">
          <span className="text-black">
            <AiOutlineUser className="text-2xl" />
          </span>
          <span className="tracking-wide font-bold text-2xl">About</span>
        </div>
        <div className="text-gray-700">
          <div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Username</div>
              <div className="px-4 py-2">{user?.username}</div>
            </div>
            {/* <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Last Name</div>
              <div className="px-4 py-2">Sim</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Gender</div>
              <div className="px-4 py-2">Male</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Contact No.</div>
              <div className="px-4 py-2">+65 99999999</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Current Address</div>
              <div className="px-4 py-2">Tampines st 123 blk 123</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">School</div>
              <div className="px-4 py-2">National University Of Singapore</div>
            </div> */}
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
            {/* <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Birthday</div>
              <div className="px-4 py-2">June 29, 2000</div>
            </div> */}
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none hover:shadow-xs p-3 my-4"
        >
          Edit personal Details
        </button>
      </div>
    </div>
  );
};

export default About;
