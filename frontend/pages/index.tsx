import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import QuestionForm from "@/components/Question Form/QuestionForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <QuestionForm></QuestionForm>

    </>
  );
}
