import { useState } from "react";

interface ModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const EditModal: React.FC<ModalProps> = ({ setIsModalOpen }) => {
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {};

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-25"></div>
      <div className="bg-white rounded-lg p-6 relative z-10">
        <h2 className="text-2xl font-bold tracking-wide mb-4">User Edit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="inputField" className="block mb-2 font-semibold">
              Username
            </label>
            <input
              type="text"
              id="inputField"
              className="border border-gray-300 rounded px-4 py-2 w-full "
              value={username}
              onChange={handleUsername}
            />
          </div>
          <div className="mb-4">
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
          </div>
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
