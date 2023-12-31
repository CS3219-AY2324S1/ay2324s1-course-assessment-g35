import { useEffect, useState } from "react";
import CategoryRow from "@/components/Index/Questions/CategoryRow";
import QuestionModal from "./QuestionModal";
import { History } from "../Questions";
import { QUESTION_URI } from "@/constants/uri";
import axios from "axios";

interface QuestionRowProps {
  history: History;
  setEasyCount: React.Dispatch<React.SetStateAction<number>>;
  setMediumCount: React.Dispatch<React.SetStateAction<number>>;
  setHardCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function QuestionRow({
  history,
  setEasyCount,
  setMediumCount,
  setHardCount,
}: QuestionRowProps) {
  const [showQuestionModal, setShowQuestionModal] = useState<boolean>(false);
  const handleOpenQuestion = () => {
    setShowQuestionModal(true);
  };

  const handleCloseModal = () => {
    setShowQuestionModal(false);
  };

  const [title, setTitle] = useState<string>("Loading...");
  const [description, setDescription] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("Loading...");
  const [category, setCategory] = useState<string[]>([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      axios
        .get(`${QUESTION_URI.GET_BY_ID}/${history.questionid}`)
        .then((res) => {
          console.log(res.data);
          setTitle(res.data.title);
          setDescription(res.data.description);
          setDifficulty(res.data.difficulty);
          setCategory(res.data.tags);

          // increase count according to difficulty
          if (res.data.difficulty === "Easy") {
            setEasyCount((prevCount) => prevCount + 1);
          } else if (res.data.difficulty === "Medium") {
            setMediumCount((prevCount) => prevCount + 1);
          } else if (res.data.difficulty === "Hard") {
            setHardCount((prevCount) => prevCount + 1);
          }
        })
        .catch((err) => {
          alert("Error getting question. Please try again later. " + err);
        });
    };
    fetchQuestion();
  }, []);

  const peer = history.user2;
  const jsDate = new Date(history.time);
  const formattedDateTime = new Intl.DateTimeFormat("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).format(jsDate);

  return (
    <div className="bg-pp-accentgray flex flex-row py-2 px-4 rounded-3xl items-center">
      {showQuestionModal && (
        <QuestionModal
          handleCloseModal={handleCloseModal}
          setShowQuestionModal={setShowQuestionModal}
          history={history}
        />
      )}

      <div className="w-4/12 flex flex-row gap-x-2">
        <p className="font-poppins font-bold text-lg text-white tracking-tight truncate">
          {title}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-pp-blue cursor-pointer"
          onClick={handleOpenQuestion}
        >
          <path
            fillRule="evenodd"
            d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="w-6/12 flex flex-row gap-x-4 items-center">
        <p className="w-2/12 font-poppins font-bold text-lg text-white tracking-tight">
          {difficulty}
        </p>
        <div className="w-10/12 flex row space-x-1 px-2">
          {category.map((item) => (
            <CategoryRow category={item} />
          ))}
        </div>
      </div>

      <div className="w-1/12">
        <p className="font-poppins font-bold text-base text-white tracking-tight">
          {peer}
        </p>
      </div>

      <div className="w-1/12">
        <p className="font-poppins text-base text-white tracking-tight">
          {formattedDateTime}
        </p>
      </div>
    </div>
  );
}
