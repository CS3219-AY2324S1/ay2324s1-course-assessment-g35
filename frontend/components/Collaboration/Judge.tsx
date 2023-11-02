import { useEffect, useState } from "react";

const JudgeItem = ({ code }: { code: string }) => {
  const question = JSON.parse(localStorage.getItem("question") || "")[0];
  const [result, setResult] = useState("hi");
  console.log(question.input.s);
  //language codes - javascript:63
  const d = {
    source_code: "console.log('hello world')",
    language_id: 63,
    expected_output: "hello world",
  };
  useEffect(() => {
    fetch(`http://localhost:2358/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "91266e531dmsh5f06080c8e5016dp1a58e5jsn71322a307735",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify(d),
    }).then((response) =>
      response.json().then((data) => {
        console.log(data);
        setResult(data.token);
      })
    );
  }, []);
  return <>{result}hihihi</>;
};

export default JudgeItem;
