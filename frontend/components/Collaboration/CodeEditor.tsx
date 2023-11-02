import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref, set } from "@firebase/database";
import { codeExamples } from "@/code_examples/codeExamples";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { Button } from "@chakra-ui/react";
import { Select } from "./CollaborationSelect";
import JudgeItem from "./Judge";

const CodeEditor = ({ roomId }: { roomId: string }) => {
  const [selectedLang, setSelectedLang] = useState<string>("c");
  const [codeToSend, setCodeToSend] = useState<string>("");
  const [runJudge, setRunJudge] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const langs = ["java", "go", "python", "c", "cpp", "javascript"];
  const db = getDatabase();
  const [code, setCode] = useState<string>();

  useEffect(() => {
    if (roomId) {
      setSelectedLang("c");
      handleLangChange("c" as keyof typeof langs);
    }
  }, [roomId]);

  const langChangeFirebase = (lang: keyof typeof langs) => {
    set(ref(db, `rooms/${roomId}`), {
      mode: lang,
    });
  };

  const writeUserData = (code: string) => {
    set(ref(db, `rooms/${roomId}`), {
      username: roomId,
      code: code,
    });
  };

  function handleLangChange(lang: keyof typeof langs) {
    langChangeFirebase(lang);
    setSelectedLang(lang.toString());
    try {
      setCode(codeExamples[lang.toString()]);
      codeChanged(codeExamples[lang.toString()]);
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
    setRunJudge(true);
    console.log("first");
    setLoading(true);
    console.log(code);
    setCodeToSend(code || "");
  };

  return (
    <>
      <div className="flex flex-col gap-3 text-black">
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
          {runJudge ? <JudgeItem code={codeToSend} /> : <></>}
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
