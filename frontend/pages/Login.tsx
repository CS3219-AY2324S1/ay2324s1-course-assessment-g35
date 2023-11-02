import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Login() {
  const [form, setForm] = useState("login");
  const toggleForm = () => {
    setForm(form === "login" ? "signup" : "login");
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins"
        rel="stylesheet"
      ></link>
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="w-5/12 h-full">
          <div
            className="bg-login-pattern bg-no-repeat bg-cover h-full flex justify-center items-center"
            style={{
              flexDirection: "column",
            }}
          >
            <motion.h1
              initial={{ opacity: 0 }} // Initial state (completely transparent)
              animate={{ opacity: 1 }} // Animation state (fully visible)
              transition={{ duration: 1.5 }}
              className="font-poppins text-white text-6xl font-bold leading-tight tracking-tight md:text-7xl"
            >
              PeerPrep
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} // Initial state (completely transparent)
              animate={{ opacity: 1 }} // Animation state (fully visible)
              transition={{ duration: 1.5 }}
              className="font-poppins text-white mt-4"
            >
              Prepare for your interviews with ease, with Peerprep.
            </motion.p>
          </div>
        </div>
        <div className="w-7/12 h-full">
          {form === "login" ? (
            <LoginForm toggleForm={toggleForm} />
          ) : (
            <SignupForm toggleForm={toggleForm} />
          )}
        </div>
      </div>
    </>
  );
}
