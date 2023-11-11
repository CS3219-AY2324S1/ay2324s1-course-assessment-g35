import { Modal, ModalContent, ModalOverlay, Select } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface CodeGenModalProps {
  questionTitle: string | undefined;
  handleCloseModal: () => void;
  setShowCodeGenModal: (status: boolean) => void;
}

export default function CodeGenModal({
  questionTitle,
  handleCloseModal,
  setShowCodeGenModal,
}: CodeGenModalProps) {
  const [generatedCode, setGeneratedCode] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("");
  console.log(`Generate code for ${questionTitle} in ${language}`);
  const langs = ["java", "go", "python", "c", "cpp", "javascript"];

  // get token either from localStorage or from backend
  const getAccessToken = async () => {
    const fetchTokenFromBackend = async () => {
      // TODO: try catch
      const response = await axios.get("http://34.87.105.156:3010");

      const data = await response.data;
      const accessTokenObject = {
        token: data,
        time: Date.now(),
      };
      localStorage.setItem("aiToken", JSON.stringify(accessTokenObject));
      return data;
    };

    // if token not found in localStorage or token exceeded 55 mins from start time, fetch from backend
    const accessTokenFromLocalStorage = localStorage.getItem("aiToken");
    if (
      !accessTokenFromLocalStorage ||
      Date.now() - JSON.parse(accessTokenFromLocalStorage).time > 3300000
    ) {
      try {
        return await fetchTokenFromBackend();
      } catch (error) {
        console.log("Error getting ai token from backend: ", error);
      }
    } else {
      return JSON.parse(accessTokenFromLocalStorage).token;
    }
  };

  const startGenerate = async () => {
    const body = {
      instances: [
        {
          prefix: `Generate code for ${questionTitle} in ${language}`,
        },
      ],
      parameters: {
        candidateCount: 1,
        maxOutputTokens: 1024,
        temperature: 0.2,
      },
    };

    const token = await getAccessToken();
    setGeneratedCode("");
    setLoading(true);
    fetch(
      "https://us-central1-aiplatform.googleapis.com/v1/projects/astral-shape-402017/locations/us-central1/publishers/google/models/code-bison:predict",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
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
  };

  return (
    <Modal
      isOpen={true}
      onClose={() => setShowCodeGenModal(false)}
      isCentered
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent
        style={{ padding: "20px", height: "400px", borderRadius: "20px" }}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 text-pp-blue cursor-pointer"
            onClick={handleCloseModal}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-y-2 py-4">
          <h2 className="font-poppins text-2xl font-bold text-pp-darkpurple tracking-tight">
            AI Code Gen
          </h2>
          <div className="w-full flex flex-row gap-x-4">
            <div className="w-60">
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
            </div>
            <button
              onClick={startGenerate}
              className="w-40 bg-pp-blue hover:bg-pp-accentblue rounded-3xl py-2 cursor-pointer font-poppins font-bold text-base text-white tracking-tight"
            >
              Generate
            </button>
            {loading && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-pp-gray animate-spin fill-pp-blue"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            )}
          </div>
          <SyntaxHighlighter
            customStyle={{
              overflow: "scroll",
              maxHeight: 220,
              borderRadius: 20,
            }}
            language="javascript"
            wrapLines={true}
            showLineNumbers
          >
            {generatedCode ? [processString(generatedCode)] : []}
          </SyntaxHighlighter>

          <br />
        </div>
      </ModalContent>
    </Modal>
  );
}
