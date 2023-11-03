import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeGenModalProps {
  handleCloseModal: () => void;
  setShowCodeGenModal: (status: boolean) => void;
}

export default function CodeGenModal({
  handleCloseModal,
  setShowCodeGenModal,
}: CodeGenModalProps) {
  const [generatedCode, setGeneratedCode] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const question = JSON.parse(localStorage.getItem("question"))[0];
  const [language, setLanguage] = useState<string>("");
  console.log(question);
  console.log(`Generate code for ${question.title} in ${language}`);
  const langs = ["java", "go", "python", "c", "cpp", "javascript"];
  const accessToken =
    "ya29.a0AfB_byCOJuBT1ahl2xU4HZDviwvzo5KHsBBRtsgoxFV5HyePoxO8IfzofD8DtLOICejZx7wkV7SeADg8Xj7LNUYpOhF4JezsbQneHdVC9zjB9zxOLa1TGpcOoQb25ZO2R9eLIslPEy5-reoWH2Qnsys43ok6FMdeMShgDPi9xJoaCgYKAXISARISFQGOcNnCb9drWyN_sjFzAFKJE8qJTQ0178";
  const startGenerate = () => {
    setGeneratedCode("");
    const body = {
      instances: [
        {
          prefix: `Generate code for ${question.title} in ${language}`,
        },
      ],
      parameters: {
        candidateCount: 1,
        maxOutputTokens: 1024,
        temperature: 0.2,
      },
    };
    setLoading(true);
    fetch(
      "https://us-central1-aiplatform.googleapis.com/v1/projects/astral-shape-402017/locations/us-central1/publishers/google/models/code-bison:predict",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        setGeneratedCode(data.predictions[0]?.content || "");
      })
      .catch((error) => console.log(error));
  };

  function processString(inputString: string) {
    const newlineIndex = inputString.indexOf("\n");

    if (newlineIndex !== -1) {
      // Remove characters before the first newline character
      // and remove the last 3 characters
      inputString = inputString.substring(
        newlineIndex + 1,
        inputString.length - 3
      );
    }

    return inputString;
  }

  const handleLangChange = (e: any) => {
    setLanguage(e.target.value);
    console.log(e.target.value);
  };

  return (
    <Center>
      <Modal
        isOpen={true}
        onClose={() => setShowCodeGenModal(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent className="p-2" style={{ borderRadius: "20px" }}>
          <ModalHeader className="font-poppins text-pp-darkpurple">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-6 h-6 text-pp-blue cursor-pointer mb-4"
              onClick={handleCloseModal}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            AI Code Generation
          </ModalHeader>

          <ModalBody className="flex justify-between">
            <div className="flex flex-col">
              <Select
                placeholder="Select a language"
                onChange={handleLangChange}
                value={language}
              >
                {langs.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </Select>
              <SyntaxHighlighter language="javascript">
                {generatedCode && processString(generatedCode)}
              </SyntaxHighlighter>

              <br />
              {loading && <Spinner></Spinner>}
              <div
                onClick={startGenerate}
                className="font-poppins bg-pp-blue hover:bg-pp-accentblue w-40 rounded-3xl p-2 text-white text-center font-bold cursor-pointer"
              >
                Generate
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
}
