import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/NavBar";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/credentials";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/Login";
  const isSignUpPage = router.pathname === "/SignUp";
  const app = initializeApp(firebaseConfig);
  console.log(firebaseConfig);

  return (
    <ChakraProvider>
      {!isLoginPage && !isSignUpPage}
      <Component {...pageProps} />{" "}
    </ChakraProvider>
  );
}
