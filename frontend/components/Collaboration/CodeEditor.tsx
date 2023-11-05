import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref, set } from "@firebase/database";
import { codeExamples } from "@/code_examples/codeExamples";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useParams } from "next/navigation";
import { Select } from "./CollaborationSelect";

import CodeResults from "./CodeResults";
import { dracula } from "@uiw/codemirror-theme-dracula";
import axios from "axios";

const CodeEditor: React.FC<{
  roomId: string;
  code: string;
  setCode: (newCode: string) => void;
}> = ({ roomId, code, setCode }) => {
  const params = useParams();
  console.log(params);

  const [selectedLang, setSelectedLang] = useState<string>("c");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stderr, setStderr] = useState("");
  const langs = ["java", "go", "python", "c", "cpp", "javascript"];

  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    setSelectedLang("c");
  }, []);

  function writeUserData(code: string) {
    const db = getDatabase();
    set(ref(db, "rooms/" + roomId), {
      username: roomId,
      code: code,
    });
  }

  function handleLangChange(lang: keyof typeof langs) {
    console.log(lang);
    setSelectedLang(lang.toString());
    try {
      setCode(codeExamples[lang.toString()]);
    } catch (error) {}
  }

  useEffect(() => {
    const db = getDatabase();
    const roomRef = ref(db, `rooms/${roomId}`);
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      setCode(data?.code);
    });
  }, []);

  const codeChanged = (data: string) => {
    setCode(data);
    writeUserData(data);
  };

  const runCode = () => {
    setLoading(true);
    setShowResults(true);
    alert(code);
    const body = {
      content: code,
      language: selectedLang,
    };
    // fetch("http://localhost:3005/code", {
    //   method: "POST",
    //   body: JSON.stringify(body), // Stringify the body object
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setLoading(false);
    //     alert(data);
    //     if (data.stderr != "") {
    //       setError(data.stderr);
    //       setStderr(data.stderr);
    //     } else {
    //       setError("");
    //       setOutput(data.stdout);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    axios
      .post("http://localhost:3005/code", body)
      .then((response) => {
        setLoading(false);
        const data = response.data;
        alert(JSON.stringify(data)); // Convert response data to a string for the alert
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
          options={langs.sort()}
          onChange={(evn) =>
            handleLangChange(evn.target.value as keyof typeof langs)
          }
        />
        <CodeMirror
          value={code}
          onChange={codeChanged}
          theme={dracula}
          extensions={[loadLanguage(selectedLang)]}
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
