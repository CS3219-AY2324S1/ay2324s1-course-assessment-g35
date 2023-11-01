import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignupForm";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Login() {
  const [form, setForm] = useState("login");
  const toggleForm = () => {
    setForm(form === "login" ? "signup" : "login");
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="w-5/12 h-full">
          <div
            className="bg-gradient-to-r from-pp-lightblue to-pp-lightpurple h-full flex justify-center items-center"
            style={{
              backgroundImage: "../public/images/login-title.png",
              backgroundSize: "cover",
              flexDirection: "column",
            }}
          >
            <motion.h1
              initial={{ opacity: 0 }} // Initial state (completely transparent)
              animate={{ opacity: 1 }} // Animation state (fully visible)
              transition={{ duration: 1.5 }}
              className="font-poppins text-white text-6xl leading-tight tracking-tight md:text-7xl"
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
            <SignUpForm toggleForm={toggleForm} />
          )}
        </div>
      </div>
    </>
  );
}
