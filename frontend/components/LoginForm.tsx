import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { USER_URI } from "@/constants/uri";

interface LoginFormProps {
  toggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  toggleForm,
}: LoginFormProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(USER_URI.LOGIN, {
        username: username,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.username);
      router.push("/");
    } catch (error: any) {
      setError(error?.response?.data?.message || "Error signing in!");
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
          Welcome back!
        </h1>
        <form className="md:space-y-4 w-6/12">
          <div>
            <input
              type="username"
              name="username"
              id="username"
              className="font-poppins rounded-3xl bg-pp-gray text-white sm:text-sm block w-full p-2.5 focus:outline-none"
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
              className="font-poppins rounded-3xl bg-pp-gray text-white sm:text-sm block w-full p-2.5 focus:outline-none"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="font-poppins w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="remember"
                className="font-poppins text-gray-500 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
          </div>

          {error && (
            <div className="font-poppins text-pp-red text-md font-poppins">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="font-poppins rounded-3xl w-full text-white bg-pp-blue hover:bg-pp-accentblue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>

          <p className="font-poppins text-sm font-light text-white dark:text-gray-400">
            Don’t have an account yet?{" "}
            <span
              onClick={toggleForm}
              className="font-poppins text-pp-blue font-bold text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
