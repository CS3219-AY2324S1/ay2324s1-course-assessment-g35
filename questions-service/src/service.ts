// actual business logic for microservice - defines functions to handle specific operations
// interacts with database or other storage systems

import mongoose from "mongoose";
import { Question } from "./models/questionModel";

// const mongoURI = "mongodb://34.118.239.59/CS3219";
const mongoURI = "mongodb+srv://timothy:SThaeb4EvnBwD2YA@cluster0.jvtzlry.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to database");
});
db.on("error", (err) => {
  console.log(`Database error: ${err}`);
});

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

export const getAllQuestions = async () => {
  try {
    // Use the `find` method to retrieve all documents from the "Question" collection
    const allQuestions = await Question.find().exec();
    return allQuestions;
  } catch (error) {
    throw new Error(`Error while fetching questions: ${error}`);
  }
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
