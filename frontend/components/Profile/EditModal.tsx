import axios from "axios";
import { useState } from "react";

interface ModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
  fetchAndSetUser: () => void;
}

const EditModal: React.FC<ModalProps> = ({ setIsModalOpen, fetchAndSetUser }) => {
  const [email, setEmail] = useState<string>("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      setIsModalOpen(false);
      fetchAndSetUser();

    } catch (error: any) {
      console.error("An error occurred:", error);
      alert(error.message || "An error occurred!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-25"></div>
      <div className="bg-white rounded-lg p-6 relative z-10">
        <h2 className="text-2xl font-bold tracking-wide mb-4">User Edit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="inputField" className="block mb-2 font-semibold">
              Email
            </label>
            <input
              type="text"
              id="inputField"
              className="border border-gray-300 rounded px-4 py-2 w-full "
              value={email}
              onChange={handleEmail}
            />
          </div>
          {/* <div className="mb-4">
            <label className="block mb-2 font-semibold">Role:</label>
            <div className="flex">
              <label htmlFor="option1" className="flex items-center mb-2 mr-4">
                <input
                  type="radio"
                  id="option1"
                  value="option1"
                  checked={role === "option1"}
                  onChange={handleRole}
                  className="mr-2"
                />
                Admin
              </label>
              <label htmlFor="option2" className="flex items-center mb-2">
                <input
                  type="radio"
                  id="option2"
                  value="option2"
                  checked={role === "option2"}
                  onChange={handleRole}
                  className="mr-2"
                />
                User
              </label>
            </div>
          </div> */}
          <div className="flex gap-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;