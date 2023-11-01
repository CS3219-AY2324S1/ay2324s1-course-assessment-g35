import express from "express";
import {
  createOrUpdateHistoryRecord,
  findHistoryByUserId,
  getAllHistory,
} from "./service";

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
    const { roomid, user1, user2, time, code, questionid } = req.body;
    const history = await createOrUpdateHistoryRecord({
      roomid,
      user1,
      user2,
      time,
      code,
      questionid,
    });
    return res.status(200).json(history);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
