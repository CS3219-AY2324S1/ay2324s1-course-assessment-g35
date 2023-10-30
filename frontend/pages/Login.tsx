import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignUpForm";
import React from "react";
import { useState } from "react";


export default function userLogin() {
  const [form, setForm] = useState("login");
  const toggleForm = () => {
    setForm(form === "login" ? "signup" : "login");
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="w-5/12 h-full">
          <div
            className="bg-pp-lightblue h-full flex justify-center items-center"
            style={{
              backgroundImage: "../public/images/login-title.png",
              backgroundSize: "cover",
              flexDirection: "column",
            }}
          >
            <h1 className="font-poppins text-white text-6xl leading-tight tracking-tight md:text-7xl">
              PeerPrep
            </h1>
            <text className="font-poppins text-white">
              Prepare for your interviews with ease, with Peerprep.
            </text>
          </div>
        </div>
        <div className="w-7/12 h-full">
          {form === "login" ? <LoginForm toggleForm={toggleForm}/> : <SignupForm toggleForm={toggleForm}/>}
        </div>
      </div>
    </>
  );
}
