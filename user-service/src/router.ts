import express from "express";
import { createUser, deleteUser, getAllUsers } from "./service";

export const userRouter = express.Router();

//GET: List all users
userRouter.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

userRouter.delete("/:userid", async (req, res) => {
  try {
    const users = await deleteUser(req.params.userid);
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
