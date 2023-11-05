import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref, set, child, get } from "@firebase/database";
import { codeExamples } from "@/code_examples/codeExamples";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";

import CodeResults from "./CodeResults";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { Select } from "@chakra-ui/react";

const CodeEditor = ({ roomId }) => {
  console.log(roomId);
  const [code, setCode] = useState<string>("");
  const [selectedLang, setSelectedLang] = useState<string>("c");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stderr, setStderr] = useState("");
  const langs: string[] = ["java", "go", "python", "c", "cpp", "javascript"];
  const sortedLangs = langs.sort();

  const db = getDatabase();
  const dbRef = ref(getDatabase());
  const roomIdentifier = `rooms/${roomId}`;
  const modeIdentifier = `mode/${roomId}`;
  const roomRef = ref(db, roomIdentifier);
  const modeRef = ref(db, modeIdentifier);
  useEffect(() => {
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      setCode(data?.code);
    });
  }, []);
  const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLang(event.target.value);
  };

  useEffect(() => {
    set(modeRef, {
      mode: selectedLang,
    });
    setCode(codeExamples[selectedLang]);
  }, [selectedLang]);

  useEffect(() => {
    console.log(code);
    writeUserData(code);
  }, [code]);

  useEffect(() => {
    onValue(modeRef, (snapshot) => {
      console.log(snapshot.val().mode);
      setSelectedLang(snapshot.val().mode);
    });
  }, []);

  useEffect(() => {
    set(modeRef, {
      mode: selectedLang,
    });
  }, []);

  const [showResults, setShowResults] = useState<boolean>(false);
  useEffect(() => {
    get(child(modeRef, modeIdentifier))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setSelectedLang(snapshot.val().mode);
        } else {
          setSelectedLang("c");
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    get(child(dbRef, roomIdentifier))
      .then((snapshot) => {
        // if (snapshot.exists()) {
        //   console.log(snapshot.val());
        //   setCode(snapshot.val().code);
        // } else {
        //   console.log("No data available");
        // }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const writeUserData = (code: string) => {
    // set(roomRef, {
    //   username: roomId,
    //   code: code,
    // });
  };
  return (
    <>
      {/* initialize the code mirror with spaces already */}
      <div className="flex flex-col gap-3 text-black">
        <Select value={selectedLang} onChange={handleLangChange}>
          {sortedLangs.map((lang, index) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
        </Select>
        {selectedLang && (
          <CodeMirror
            value={code}
            onChange={setCode}
            theme={dracula}
            extensions={[loadLanguage(selectedLang)]}
            basicSetup={{
              foldGutter: false,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: false,
            }}
          />
        )}

        <button className="w-40 bg-pp-blue hover:bg-pp-accentblue rounded-3xl py-2 cursor-pointer font-poppins font-bold text-base text-white tracking-tight">
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
