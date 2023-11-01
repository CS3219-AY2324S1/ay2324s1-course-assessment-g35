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
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{question?.title}</h2>
            <p className="text-gray-600">{question?.description}</p>
        </div>
    );
    }
