import About from "@/components/About";
import Description from "@/components/Description";
import Questions from "@/components/Questions";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

 export interface UserType {
  username: string;
  email: string;
  role: string;
}

export default function Profile() {

  //fetch user data using axios
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchAndSetUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/", {
        headers: {
          Authorization: `${token}`,
        },
      });
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAndSetUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  const handleDeleteClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete("http://localhost:8000/", {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(response.data);
      localStorage.removeItem("token");
      router.push("/Login");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "An error occurred!");
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 px-5 py-4 flex flex-col gap-4">
      <div className="flex gap-4 mb-7">
        <Description username={user?.username} />
        <About user={user} fetchAndSetUser={fetchAndSetUser} />
      </div>
      <div className="flex">
        <Questions />
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded h-fit ml-auto"
          onClick={handleDeleteClick}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
