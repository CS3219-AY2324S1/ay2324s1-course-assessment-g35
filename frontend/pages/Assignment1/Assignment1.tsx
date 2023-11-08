
import Questions from "./components/Questions/Questions";
import Header from "./components/Header/Header";
import { ChakraProvider } from "@chakra-ui/react"

export default function Assignment1() {
  return (
    <ChakraProvider>
      <div className="main">
        <Header />
        <Questions />
      </div>
    </ChakraProvider>
  );
}