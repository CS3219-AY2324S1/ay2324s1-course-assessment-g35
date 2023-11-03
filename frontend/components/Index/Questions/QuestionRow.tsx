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

import { useState } from "react";
import CategoryRow from "@/components/CategoryRow";
import QuestionModal from "./QuestionModal";
// NOTE: later, just have an input as the question rather than all the components of the question
// TODO: change the props to link with the history
interface QuestionRowProps {
  title: string;
  description: string;
  difficulty: string;
  category: string[];
  date: string;
}

export default function QuestionRow({
  title,
  description,
  difficulty,
  category,
  date,
}: QuestionRowProps) {
  const [showQuestionModal, setShowQuestionModal] = useState<boolean>(false);
  const handleOpenQuestion = () => {
    setShowQuestionModal(true);
  };

  const handleCloseModal = () => {
    setShowQuestionModal(false);
  };

  return (
    <div className="bg-pp-accentgray flex flex-row py-2 px-4 rounded-3xl items-center">
      {showQuestionModal && (
        <QuestionModal
          title={title}
          description={description}
          difficulty={difficulty}
          category={category}
          date={date}
          // TODO: edit the input as the whole question once linked w history
          // question={question}
          handleCloseModal={handleCloseModal}
          setShowQuestionModal={setShowQuestionModal}
        />
      )}

      <div className="w-3/12 flex flex-row gap-x-2">
        <p className="font-poppins font-bold text-lg text-white tracking-tight">
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

      <div className="w-6/12 flex flex-row space-x-1">
        {category.map((item) => (
          <CategoryRow category={item} />
        ))} 
      </div>

      <div className="w-3/12">
        <p className="font-poppins text-base text-white tracking-tight">
          {date}
        </p>
      </div>
    </div>
  );
}
