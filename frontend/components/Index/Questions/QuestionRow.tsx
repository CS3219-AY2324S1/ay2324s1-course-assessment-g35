// export type Question = {
//   _id: string;
//   title: string;
//   description: string;
//   difficulty: string;
//   category: string[];
// };

// type QuestionDisplayProps = {
//   question: Question | undefined;
//   getQuestion: () => void;
// };

// export default function QuestionDisplay({
//   question,
//   getQuestion,
// }: QuestionDisplayProps) {

import { useEffect, useState } from "react";
import CategoryRow from "@/components/Index/Questions/CategoryRow";
import QuestionModal from "./QuestionModal";
import { History } from "../Questions";
import { QUESTION_URI } from "@/constants/uri";
import axios from "axios";
// NOTE: later, just have an input as the question rather than all the components of the question
// TODO: change the props to link with the history
interface QuestionRowProps {
  history: History;
}

export default function QuestionRow({
  history
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
      axios.get(`${QUESTION_URI.GET_BY_ID}/${history.questionid}`)
        .then((res) => {
          console.log(res.data);
          setTitle(res.data.title);
          setDescription(res.data.description);
          setDifficulty(res.data.difficulty);
          setCategory(res.data.tags);
        })
        .catch((err) => {
          alert("Error getting question. Please try again later. " + err);
        });
    }
    fetchQuestion();
  }
  , []);

  const jsDate = new Date(history.time);
  const formattedDateTime = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(jsDate);


  return (
    <div className="bg-pp-accentgray flex flex-row py-2 px-4 rounded-3xl items-center">
      {showQuestionModal && (
        <QuestionModal
          title={title}
          description={description}
          difficulty={difficulty}
          category={category}
          date={formattedDateTime}
          // TODO: edit the input as the whole question once linked w history
          // question={question}
          handleCloseModal={handleCloseModal}
          setShowQuestionModal={setShowQuestionModal}
        />
      )}

      <div className="w-4/12 flex flex-row gap-x-2">
        <div className="w-8/12">
          <p className="font-poppins font-bold text-lg text-white tracking-tight truncate">
            {title}
          </p>
        </div>
        <div className="w-/12">
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
      </div>
      
      {/* TODO: any styling to differentiate the levels needed? can refer to colors for tags */}
      <div className="w-1/12 font-poppins font-bold text-lg text-white tracking-tight">
        <p>
          {difficulty}
        </p>
      </div>
      <div className="w-6/12 flex flex-row space-x-1">
        {category.map((item) => (
          <CategoryRow category={item} />
        ))}
      </div>

      <div className="w-1/12">
        <p className="font-poppins text-base text-white tracking-tight">
          {formattedDateTime}
        </p>
      </div>
    </div>
  );
}
