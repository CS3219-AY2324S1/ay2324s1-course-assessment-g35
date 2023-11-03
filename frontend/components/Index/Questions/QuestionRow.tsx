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

import Tag from "@/components/Tag";
// NOTE: later, just have an input as the question rather than all the components of the question
interface QuestionRowProps {
  title: string;
  description: string;
  difficulty: string;
  category: string[];
  date: string;
}

export default function QuestionRow({ title, description, difficulty, category, date }: QuestionRowProps) {
  return (
      <div className="bg-pp-accentgray flex flex-row py-2 px-4 rounded-3xl items-center">
        <div className ="w-3/12 flex flex-row gap-x-2">
          {/* TODO: center the title vertically */}
          <p className="font-poppins font-bold text-lg text-white tracking-tight">{title}</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-pp-blue">
          <path fillRule="evenodd" d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z" clipRule="evenodd" />
          </svg>

        </div>
        <div className="w-6/12 flex flex-row space-x-1">
          {category.map((item) => (
            <Tag title={item} />
          ))}
        </div>
        <div className="w-3/12">
          <p className="font-poppins text-base text-white tracking-tight">{date}</p>
        </div>
      </div>
  );
}