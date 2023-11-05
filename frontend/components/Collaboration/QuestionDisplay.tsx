import React from "react";
import ReactMarkdown from "react-markdown";
import CategoryRow from "../Index/Questions/CategoryRow";
import { Tag } from "@chakra-ui/react";

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
      {/* NOTE: When questions linked, uncomment this but make sure the styling is the same as below if any changes */}
      <div className="flex row justify-between items-center px-2">
        <h2 className="text-2xl font-bold tracking-tight">{question?.title}</h2>
        <p className="text-base tracking-tight">{question?.difficulty}</p>
      </div>
      
      <div className="flex row space-between space-x-1 px-2">
      {question?.tags.map((item) => (
        <CategoryRow key={question._id} category={item} />
      ))}
      </div>
      <div className="overflow-scroll">
        {/* <p className="text-base px-2 tracking-tight">{question?.description}</p> */}
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

      {/* NOTE: below is for display purposes only, will delete when the questions are linked */}
      {/* <div className="flex row justify-between items-center px-2">
        <h2 className="text-2xl font-bold tracking-tight">Question Title</h2>
        <p className="text-base tracking-tight"> Difficulty Level</p>
      </div>

      <div className="flex row space-between space-x-1 px-2">
        <CategoryRow category={"Strings"} />
        <CategoryRow category={"Algorithms"} />
        <CategoryRow category={"Bit Manipulation"} />
        {question?.category.map((item) => (
          <CategoryRow category={item} />
        ))}
      </div>

      <div className="overflow-scroll">
        <ReactMarkdown>{question?.description}</ReactMarkdown>
        <p className="text-base px-2 tracking-tight">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          dignissim iaculis ipsum et porta. Ut sit amet metus ut neque
          vestibulum mollis. Praesent at erat augue. Duis a tortor ornare,
          gravida leo vel, dignissim elit. Aliquam vitae mi lacus. Aenean vitae
          purus diam. Donec sed eros a massa scelerisque euismod. Nulla maximus
          orci massa, eu tempor lorem volutpat sit amet. Fusce in enim vel risus
          viverra tempus sed in quam. Integer euismod libero sed ipsum placerat
          molestie sit amet sed ex. Fusce laoreet, nunc commodo congue
          imperdiet, nisl magna faucibus elit, quis vehicula purus lectus nec
          ipsum. Aenean elementum diam at turpis pharetra, ut lobortis lorem
          rutrum. In venenatis rhoncus urna, quis laoreet nulla tristique quis.
          Sed vehicula lacus ac est tempor, in placerat arcu ultricies. Etiam
          sagittis turpis purus, et semper elit sodales eget. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Cras vitae bibendum ante. Praesent suscipit augue vel arcu
          accumsan semper. Sed congue ipsum eu porttitor dictum. Donec eu dolor
          arcu. Aliquam massa ipsum, scelerisque ac accumsan id, eleifend eu
          turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Integer dignissim iaculis ipsum et porta. Ut sit amet metus ut neque
          vestibulum mollis. Praesent at erat augue. Duis a tortor ornare,
          gravida leo vel, dignissim elit. Aliquam vitae mi lacus. Aenean vitae
          purus diam. Donec sed eros a massa scelerisque euismod. Nulla maximus
          orci massa, eu tempor lorem volutpat sit amet. Fusce in enim vel risus
          viverra tempus sed in quam. Integer euismod libero sed ipsum placerat
          molestie sit amet sed ex. Fusce laoreet, nunc commodo congue
          imperdiet, nisl magna faucibus elit, quis vehicula purus lectus nec
          ipsum. Aenean elementum diam at turpis pharetra, ut lobortis lorem
          rutrum. In venenatis rhoncus urna, quis laoreet nulla tristique quis.
          Sed vehicula lacus ac est tempor, in placerat arcu ultricies. Etiam
          sagittis turpis purus, et semper elit sodales eget. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Cras vitae bibendum ante. Praesent suscipit augue vel arcu
          accumsan semper. Sed congue ipsum eu porttitor dictum. Donec eu dolor
          arcu. Aliquam massa ipsum, scelerisque ac accumsan id, eleifend eu
          turpis.
        </p>
      </div>

      <div className="flex row justify-center">
        <button
          onClick={getQuestion}
          className="bg-pp-blue hover:bg-pp-accentblue rounded-3xl py-2 px-6 cursor-pointer font-poppins font-bold text-base text-white tracking-tight"
        >
          Change question
        </button>
      </div> */}
    </>
  );
}
