import axios from "axios";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.post(
        "http://localhost:8000/users/validate",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={handleSubmit}>Click me</button>
      <br />
      <button onClick={() => localStorage.removeItem("token")}>
        Remove token
      </button>
      <br />
      <button onClick={() => router.push("/Profile")}>Profile</button>
    </>
  );
}
