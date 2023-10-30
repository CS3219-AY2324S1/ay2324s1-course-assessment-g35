import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/NavBar";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/Login";
  const isSignUpPage = router.pathname === '/SignUp'
  return (
    <ChakraProvider>
      {!isLoginPage && !isSignupPage}

      <Component {...pageProps} />{" "}
    </ChakraProvider>
  );
}
