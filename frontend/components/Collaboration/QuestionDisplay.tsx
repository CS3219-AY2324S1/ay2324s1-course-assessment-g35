// boilerplate for displaying a question
import React from "react";

export type Question = {
    _id: string;
    title: string;
    description: string;
    difficulty: string;
    category: string[];
};

type QuestionDisplayProps = {
  question: Question | undefined;
};

export default function QuestionDisplay({ question }: QuestionDisplayProps) {
    return (
        <div className="bg-pp-gray p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl font-semibold mb-4">{question?.title}</h2>
            <p>{question?.description}</p>
        </div>
    );
    }
