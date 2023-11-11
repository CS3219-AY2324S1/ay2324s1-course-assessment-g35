import express from "express";
import {
  getAllQuestions,
  addQuestion,
  deleteQuestion,
} from "./service";

export const questionsAssignmentRouter = express.Router();


// get all questions
questionsAssignmentRouter.get("/all", async (req, res) => {
  try {
    const allQuestions = await getAllQuestions();
    return res.status(200).json(allQuestions);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});



// add question, only allow if role is admin
questionsAssignmentRouter.post("/add", async (req, res) => {
    console.log(req.body);
    if (req.userPayload?.role !== "ADMIN") {
    return res.status(401).json({
      error: "Unauthorized role, not allowed to add questions",
    });
    }
  try {
    const question = await addQuestion(req.body);
    return res.status(200).json(question);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});



// delete question, only allow if role is admin
questionsAssignmentRouter.delete("/delete/:id", async (req, res) => {
    if (req.userPayload?.role !== "ADMIN") {
        return res.status(401).json({
          error: "Unauthorized role, not allowed to delete questions",
        });
    }
  try {
    const id: string = req.params.id as string;
    const question = await deleteQuestion(id);
    return res.status(200).json(question);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});