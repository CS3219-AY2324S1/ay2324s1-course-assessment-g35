import { useState } from "react";

const Description: React.FC = () => {
  return (
    <div className="mx-auto">
      <div className="bg-white rounded-sm shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 tracking-wide">Profile Page</h1>
        <div className="flex items-center">
          <div>
            <h2 className="text-lg font-semibold">Kenneth</h2>
            <p className="text-gray-600">Computer Science Student</p>
          </div>
        </div>
        <div className="mt-4">
          <p>
            I am a year 3 Computer Science student specialising in Software
            Engineering.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Description;
