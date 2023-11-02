import { USER_URI } from "@/constants/uri";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

interface SignUpFormProps {
  toggleForm: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  toggleForm,
}: SignUpFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = {
        username: username,
        password: password,
        email: email,
      };
      console.log(body);
      const response = await axios.post(USER_URI.REGISTER, body);
      console.log(response.data);
      alert("Account created successfully!");
      toggleForm();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "An error occurred!");
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins"
        rel="stylesheet"
      ></link>
      <div
        className="bg-pp-darkpurple h-full w-full flex justify-center items-center"
        style={{ flexDirection: "column" }}
      >
        <h1 className="font-poppins text-white text-xl font-bold leading-tight tracking-tight md:text-2xl my-4">
          Welcome to PeerPrep!
        </h1>
        <form className="md:space-y-4 w-6/12">
          <div>
            <input
              type="username"
              name="username"
              id="username"
              className="bg-pp-gray text-white font-poppins sm:text-sm rounded-3xl block w-full p-2.5 focus:outline-none"
              placeholder="Username"
              required
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="bg-pp-gray text-white font-poppins sm:text-sm rounded-3xl block w-full p-2.5 focus:outline-none"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="bg-pp-gray text-white font-poppins sm:text-sm rounded-3xl block w-full p-2.5 focus:outline-none"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="font-poppins rounded-3xl w-full text-white bg-pp-blue hover:bg-pp-accentblue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center"
          >
            Sign up
          </button>

          <p className="font-poppins text-sm font-light text-white">
            Already have an account?{" "}
            <span
              onClick={toggleForm}
              className="font-poppins text-pp-blue font-bold text-primary-600 hover:underline dark:text-primary-500"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
