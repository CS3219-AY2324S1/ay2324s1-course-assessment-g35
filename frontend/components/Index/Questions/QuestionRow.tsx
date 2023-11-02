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
      <div className="bg-pp-accentgray flex flex-row p-2 rounded-3xl">
        <div className ="w-3/12">
          {/* TODO: center the title vertically */}
          <p className="font-poppins font-bold text-lg text-white tracking-tight">{title}</p>
          {/* open question detail modal here */}
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