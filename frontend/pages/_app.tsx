import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/NavBar";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/credentials";

// TODO: Replace the following with your app's Firebase project configuration

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/Login";
  const app = initializeApp(firebaseConfig);

  return (
    <ChakraProvider>
      {!isLoginPage && <Navbar />}
      <Component {...pageProps} />{" "}
    </ChakraProvider>
  );
}
