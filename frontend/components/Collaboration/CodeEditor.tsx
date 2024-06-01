import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref, set } from "@firebase/database";
import { codeExamples } from "@/code_examples/codeExamples";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useParams } from "next/navigation";
import { Select } from "./CollaborationSelect";

import CodeResults from "./CodeResults";
import { dracula } from "@uiw/codemirror-theme-dracula";
import axios from "axios";

export type langs = "java" | "python" | "c" | "javascript";

// TODO: potential bug of one user refreshing while the other change language

const CodeEditor: React.FC<{
  roomId: string;
  selectedLanguage: langs;
  setSelectedLanguage: (lang: langs) => void;
  code: string | undefined;
  setCode: (newCode: string) => void;
  socketEmitLanguage: (lang: langs) => void;
}> = ({ roomId, selectedLanguage, setSelectedLanguage, code, setCode, socketEmitLanguage }) => {
  const params = useParams();

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stderr, setStderr] = useState("");

  const [showResults, setShowResults] = useState<boolean>(false);

  // useEffect to get localStorage language, if there exists
  useEffect(() => {
    const localLanguage = localStorage.getItem("language");
    if (localLanguage) {
      setSelectedLanguage(localLanguage as langs);
    }
  }, []);

  // save language in local storage
  useEffect(() => {
    localStorage.setItem("language", selectedLanguage);
  }, [selectedLanguage]);

  function writeUserData(code: string) {
    const db = getDatabase();
    set(ref(db, "rooms/" + roomId), {
      username: roomId,
      code: code,
    });
  }

  // upon lang change, change example code and save to db
  function handleLangChange(lang: langs) {
    setSelectedLanguage(lang);
    socketEmitLanguage(lang);
    setCode(codeExamples[lang]);
    writeUserData(codeExamples[lang]);
  }

  useEffect(() => {
    const db = getDatabase();
    if (roomId) { // ensure roomId present before fetching from db
      const roomRef = ref(db, `rooms/${roomId}`);
      onValue(roomRef, (snapshot) => {
        const data = snapshot.val();
        setCode(data?.code);
      });
    }
  }, [roomId]);

  const codeChanged = (data: string) => {
    setCode(data);
    writeUserData(data);
  };

  const runCode = () => {
    setLoading(true);
    setShowResults(true);
    const body = {
      content: code,
      language: selectedLanguage,
    };
    axios
      .post("http://34.142.198.105:3005/code", body)
      .then((response) => {
        setLoading(false);
        const data = response.data;
        if (data.stderr !== "") {
          setError(data.stderr);
          setStderr(data.stderr);
        } else {
          setError("");
          setOutput(data.stdout);
        }
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  };

  return (
    <>
      {/* initialize the code mirror with spaces already */}
      <div className="flex flex-col gap-3 text-black">
        <Select
          options={["java", "python", "c", "javascript"]}
          value={selectedLanguage}
          onChange={(evn) => handleLangChange(evn.target.value as langs)}
        />
        <CodeMirror
          value={code}
          onChange={codeChanged}
          theme={dracula}
          extensions={[loadLanguage(selectedLanguage) as Extension]}
          basicSetup={{
            foldGutter: false,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: false,
          }}
        />

        <button
          onClick={runCode}
          className="w-40 bg-pp-blue hover:bg-pp-accentblue rounded-3xl py-2 cursor-pointer font-poppins font-bold text-base text-white tracking-tight"
        >
          Run code
        </button>

        {showResults && (
          <CodeResults
            results={output}
            isLoading={loading}
            errorMsg={error}
            stderr={stderr}
          />
        )}
      </div>
    </>
  );
};

export default CodeEditor;
