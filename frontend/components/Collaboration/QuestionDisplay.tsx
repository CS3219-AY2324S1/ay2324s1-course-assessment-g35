import React from "react";
import CategoryRow from "../Index/Questions/CategoryRow";
import styles from "./QuestionDisplay.module.css";

export type Question = {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
};

type QuestionDisplayProps = {
  question: Question | undefined;
  openChangeQuestionModal: () => void;
};

export default function QuestionDisplay({
  question,
  openChangeQuestionModal,
}: QuestionDisplayProps) {

  return (
    <>
      <div className="flex row justify-between items-center px-2">
        <h2 className="text-2xl font-bold tracking-tight">{question?.title}</h2>
        <p className="text-base tracking-tight">{question?.difficulty}</p>
      </div>
      
      <div className="flex row space-between space-x-1 px-2">
      {question?.tags.map((item) => (
        <CategoryRow key={item} category={item} />
      ))}
      </div>
      <div className={`overflow-scroll px-2 leading-7 ${styles.body}`}>
        {question?.description && <div dangerouslySetInnerHTML={{ __html: question?.description }} />}
      </div>

      <div className="flex row justify-center">
        <div
          className="h-2/12 w-60 bg-pp-blue hover:bg-pp-accentblue py-2 px-4 rounded-3xl text-white text-center font-bold cursor-pointer"
          onClick={openChangeQuestionModal}
        >
          Change question
        </div>
      </div>
    </>
  );
}
