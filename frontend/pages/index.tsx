import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Questions from "@/components/Questions/Questions";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <div className="main">
       <Header />
       <Questions />
    </div>
  );
}
