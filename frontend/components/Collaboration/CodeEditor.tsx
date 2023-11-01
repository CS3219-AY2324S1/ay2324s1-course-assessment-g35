import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref, set } from "@firebase/database";
import { codeExamples } from "@/code_examples/codeExamples";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useParams } from "next/navigation";
import { Button, Spinner } from "@chakra-ui/react";
import { Select } from "./CollaborationSelect";

const CodeEditor = ({ roomId }: { roomId: string }) => {
  const params = useParams();
  console.log(params);

  const [selectedLang, setSelectedLang] = useState<string>("c");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stderr, setStderr] = useState("");
  const langs = ["java", "go", "python", "c", "cpp", "javascript"];

  useEffect(() => {
    setSelectedLang("c");
  }, []);

  const [code, setCode] = useState<string>();
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
    const body = {
      files: [
        {
          name: "index.js",
          content: code,
        },
      ],
    };
    fetch("/api/code", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data.message);
        if (data.message.error != "") {
          setError(data.message.error);
          setStderr(data.message.stderr);
        } else {
          setError("");
          setOutput(data.message.stdout);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <Select
          options={langs.sort()}
          onChange={(evn) =>
            handleLangChange(evn.target.value as keyof typeof langs)
          }
        />
        <div className="h-3/6">
          <CodeMirror
            value={code}
            onChange={codeChanged}
            extensions={[loadLanguage(selectedLang)]}
            basicSetup={{
              foldGutter: false,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: false,
            }}
          />
        </div>

        <Button onClick={runCode}>RUN CODE</Button>
        <div className="grow">
          <ResultSection
            results={output}
            isLoading={loading}
            errorMsg={error}
            stderr={stderr}
          />
        </div>
      </div>
    </>
  );
};

const OutputShow = ({ output }: { output: string }) => {
  return <>{output}</>;
};

interface ResultSectionProps {
  results: string;
  isLoading: boolean;
  errorMsg: string;
  stderr: string;
}

const ResultSection: React.FC<ResultSectionProps> = ({
  results,
  isLoading,
  errorMsg,
  stderr,
}) => {
  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Results</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Output</h3>
          {errorMsg != "" ? (
            <>
              <ErrorComponent message={errorMsg} />
              <ErrorComponent message={stderr} />
            </>
          ) : (
            <p className="text-gray-600">{results}</p>
          )}
        </div>
      )}
    </div>
  );
};

const ErrorComponent = ({ message }: { message: string }) => {
  return (
    <>
      <p className="text-red-500">{message}</p>
    </>
  );
};

export default CodeEditor;
