// actual business logic for microservice - defines functions to handle specific operations
// interacts with database or other storage systems

import mongoose from "mongoose";
import { Question } from "./models/questionModel";

const mongoURI = "mongodb://34.118.230.187:27017/";
mongoose.connect(mongoURI, {});
const db = mongoose.connection;

// check if this is the correct response type
type QuestionResponseType = {
  title: string;
  description: string;
  difficulty: string;
  tags: Array<string>[];
};

export const getQuestionByName = async (name: string) => {
  return await Question.find({ title: { $eq: name } });
};

export const getRandomQuestionByDifficulty = async (difficulty: string) => {
  return await Question.aggregate([
    { $match: { difficulty: difficulty } },
    { $sample: { size: 1 } },
  ]);
};

export const getRandomQuestionByTag = async (tag: string) => {
  return await Question.aggregate([
    { $match: { tags: tag } },
    { $sample: { size: 1 } },
  ]);
};
