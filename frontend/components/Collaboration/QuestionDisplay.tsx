// boilerplate for displaying a question
import React from "react";
import Tag from "./Tag";

export type Question = {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string[];
};

type QuestionDisplayProps = {
  question: Question | undefined;
  getQuestion: () => void;
};

export default function QuestionDisplay({
  question,
  getQuestion,
}: QuestionDisplayProps) {
  return (
    <>
      {/* NOTE: This is the actual implementation, will uncomment when the questions are linked */}
      {/* <div className="flex row justify-between items-center px-2">
        <h2 className="text-2xl font-semibold">{question?.title}</h2>
        <p className="text-sm">{question?.difficulty}</p>
      </div>
      
      <div className="flex row space-between space-x-1 px-2">
        {question?.category.map((item, index) => (
          <Tag title={item} />
        ))}
      </div>

      <div className="overflow-scroll">
        <p className="text-sm px-2">{question?.description}</p>
      </div>

      <div className="flex row justify-center">
        <div
          className="h-2/12 w-60 bg-pp-blue hover:bg-pp-accentblue py-2 px-4 rounded-[30px] text-white text-center font-bold cursor-pointer"
          onClick={getQuestion}
        >
          Change question
        </div>
      </div> */}

      {/* NOTE: below is for display purposes only, will delete when the questions are linked */}
      <div className="flex row justify-between items-center px-2">
        <h2 className="text-2xl font-semibold">Question Title</h2>
        <p>Difficulty Level</p>
      </div>
      
      <div className="flex row space-between space-x-1 px-2">
        <Tag title={"Databses"} />
        <Tag title={"Strings"} />
        <Tag title={"Algorithms"} />
      </div>

      <div className="overflow-scroll">
        <p className="text-sm px-2">
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
        <div
          className="h-2/12 w-60 bg-pp-blue hover:bg-pp-accentblue py-2 px-4 rounded-[30px] text-white text-center font-bold cursor-pointer"
          onClick={getQuestion}
        >
          Change question
        </div>
      </div>
    </>
  );
}
