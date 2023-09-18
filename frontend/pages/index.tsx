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
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push("/Profile")}>Profile</button>
      <br />
      <button onClick={handleSubmit}>Click me</button>
      <br />
      <button onClick={() => localStorage.removeItem("token")}>
        Remove token
      </button>
    </>
  );
}
