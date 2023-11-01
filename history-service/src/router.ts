import express from "express";
import { findHistoryByUserId } from "./service";

export const historyRouter = express.Router();

historyRouter.get("/", async (req, res) => {
  try {
    const userId = typeof req.query.userId === "string" ? req.query.userId : "";
    const history = await findHistoryByUserId(userId);
    return res.status(200).json(history);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

//User1, user2, roomId, time, code, questionId
historyRouter.get("/create", async (req, res) => {
  try {
    const userId = typeof req.query.userId === "string" ? req.query.userId : "";
    const history = await findHistoryByUserId(userId);
    return res.status(200).json(history);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
