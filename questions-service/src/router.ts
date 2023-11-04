// defines routes and corresponding handlers for microservice
import express from "express";
import {
  getRandomQuestionByDifficulty,
  getQuestionByName,
  getRandomQuestionByTag,
  getAllQuestions,
  getQuestionById,
} from "./service";

export const questionsRouter = express.Router();

questionsRouter.get("/id/:id", async (req, res) => {
  try {
    const id: string = req.params.id as string;
    const questionById = await getQuestionById(id);
    return res.status(200).json(questionById);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

questionsRouter.get("/name", async (req, res) => {
  try {
    const name: string = req.query.name as string;
    const questionByName = await getQuestionByName(name);
    return res.status(200).json(questionByName);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

questionsRouter.get("/random/difficulty", async (req, res) => {
  try {
    const difficulty: string = req.query.difficulty as string;
    const randomQuestionByDifficulty = await getRandomQuestionByDifficulty(
      difficulty
    );
    return res.status(200).json(randomQuestionByDifficulty);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

questionsRouter.get("/random/tag", async (req, res) => {
  try {
    const tag: string = req.query.tag as string;
    const randomQuestionByTag = await getRandomQuestionByTag(tag);
    return res.status(200).json(randomQuestionByTag);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

questionsRouter.get("/all", async (req, res) => {
  try {
    const allQuestions = await getAllQuestions();
    return res.status(200).json(allQuestions);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
