import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Questions from "@/components/Questions/Questions";
import Header from "@/components/Header/Header";
import { ChakraProvider } from "@chakra-ui/react"
import QuestionForm from "@/components/Question Form/QuestionForm";

export default function Home() {
  return (
    <ChakraProvider>
      <div className="main">
       <Header />
       <Questions />
       <QuestionForm />
      </div>
    </ChakraProvider>
  );
}
