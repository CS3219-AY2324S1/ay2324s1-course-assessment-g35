// defines routes and corresponding handlers for microservice
import express from "express";
import {
  getRandomQuestionByDifficulty,
  getQuestionByName,
  getRandomQuestionByTag,
} from "./service"

export const questionsRouter = express.Router()

questionsRouter.get("/name", async (req, res) => {
  try {
    const name : string = req.query.name as string
    const questionByName = await getQuestionByName(name)
    return res.status(200).json(questionByName)
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
})

questionsRouter.get("/random/difficulty", async (req, res) => {
  try {
    const difficulty : string = req.query.difficulty as string
    const randomQuestionByDifficulty = await getRandomQuestionByDifficulty(difficulty)
    return res.status(200).json(randomQuestionByDifficulty)
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
})

questionsRouter.get("/random/tag", async (req, res) => {
  try {
    const tag : string = req.query.tag as string
    const randomQuestionByTag = await getRandomQuestionByTag(tag)
    return res.status(200).json(randomQuestionByTag)
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
})
