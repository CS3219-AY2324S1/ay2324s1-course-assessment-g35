import About from "@/components/About";
import Description from "@/components/Description";
import Questions from "@/components/Questions";
import React from "react";

export default function Profile() {
  return (
    <div className="w-screen h-screen bg-gray-100 px-5 py-4 flex flex-col gap-4">
      <div className="flex gap-4 mb-7">
        <Description />
        <About />
      </div>
      <div className="flex">
        <Questions />
      </div>
    </div>
  );
}
