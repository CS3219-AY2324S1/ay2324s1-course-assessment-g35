import axios from "axios";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface FormProps {
  name: string;
  password: string;
  email: string;
  dob: string;
  number: number;
  school: string;
  gender: string;
  setName: (name: string) => void;
  setPassword: (password: string) => void;
  setEmail: (email: string) => void;
  setGender: (email: string) => void;
  setSchool: (school: string) => void;
  setDOB: (dob: string) => void;
  setNumber: (number: number) => void;
  setTutorDone: (ready: boolean) => void;
  setStudentDone: (ready: boolean) => void;
}
const Form: React.FC<FormProps> = ({
  name,
  password,
  email,
  dob,
  number,
  school,
  gender,
  setName,
  setPassword,
  setEmail,
  setDOB,
  setNumber,
  setTutorDone,
  setStudentDone,
  setSchool,
  setGender,
}) => {
  const [isStudent, setIsStudent] = useState<Boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name: name,
      password: password,
      age: new Date(dob),
    };
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-teal-300 shadow-md rounded px-6 py-5 md:h-120 md:w-96"
    >
      <div className="flex flex-col justify-center items-center">
        <p className="text-gray-700 font-bold text-2xl ">User Signup Form</p>
      </div>

      <div>
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded py-1.5 px-3 border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="text"
            id="name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded py-1.5 px-3 border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded py-1.5 px-3 border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex gap-2">
          {isStudent ? (
            <div className="mb-4">
              <label
                htmlFor="school"
                className="block text-gray-700 font-bold mb-2"
              >
                School:
              </label>
              <select
                id="school"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full border rounded py-1.5 px-3 border-gray-400 focus:outline-none focus:border-blue-500 h-10"
              >
                <option value="junior college">Junior College</option>
                <option value="primary school">Primary School</option>
                <option value="secondary school">Secondary School</option>
              </select>
            </div>
          ) : (
            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-gray-700 font-bold mb-2"
              >
                Date of Birth:
              </label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
                className="w-full border rounded py-1.5 px-3 border-gray-400 focus:outline-none focus:border-blue-500 h-10"
              />
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="pricing"
              className="block text-gray-700 font-bold mb-2"
            >
              Contact Number:
            </label>
            <input
              type="text"
              id="pricing"
              value={number}
              onChange={(e) =>
                setNumber(e.target.value === "" ? 0 : parseInt(e.target.value))
              }
              className="w-full  border rounded py-2 px-3 border-gray-400 focus:outline-none focus:border-blue-500 h-10"
            />
          </div>
        </div>
        <div className="mb-2">
          <label
            htmlFor="gender"
            className="block text-gray-700 font-bold mb-2 "
          >
            Gender
          </label>
          <input
            type="radio"
            id="male"
            value="male"
            checked={gender === "male"}
            onChange={handleGenderChange}
            className="mr-1"
          />
          <label htmlFor="male" className="mr-2 font-medium">
            Male
          </label>
          <input
            type="radio"
            id="female"
            value="female"
            checked={gender === "female"}
            onChange={handleGenderChange}
            className="mr-1"
          />
          <label htmlFor="female" className="font-medium">
            Female
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="bg-customIntro hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Register
      </button>
    </form>
  );
};

export default Form;

{
}
