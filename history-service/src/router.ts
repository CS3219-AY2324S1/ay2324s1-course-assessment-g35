import express from "express";
import {
  createOrUpdateHistoryRecord,
  findHistoryByUserId as findHistoryByUserName,
  getAllHistory,
} from "./service";

export const historyRouter = express.Router();

historyRouter.get("/", async (req, res) => {
  try {
    const userName = typeof req.query.userName === "string" ? req.query.userName : "";
    const history = await findHistoryByUserName(userName);
    return res.status(200).json(history);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

historyRouter.get("/all", async (req, res) => {
  try {
    const history = await getAllHistory();
    return res.status(200).json(history);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

//User1, user2, roomId, time, code, questionId
historyRouter.post("/create", async (req, res) => {
  try {
    const { roomid, user1, user2, time, code, questionid, language } = req.body;
    const history = await createOrUpdateHistoryRecord({
      roomid,
      user1,
      user2,
      time,
      code,
      questionid,
      language,
    });
    return res.status(200).json(history);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
