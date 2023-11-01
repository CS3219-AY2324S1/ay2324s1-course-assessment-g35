import About from "@/components/Profile/Profile";
import Description from "@/components/Profile/Description";
import Questions from "@/components/Index/Questions";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import { USER_URI } from "@/constants/uri";

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
      const response = await axios.get(USER_URI.GET_TOKEN, {
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

  return (
    <div className="w-screen h-screen bg-gray-100 px-5 py-4 flex flex-col gap-4">
      <Container>
        <About user={user} fetchAndSetUser={fetchAndSetUser} />
      </Container>
    </div>
  );
}
