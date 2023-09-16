import express from "express";
import { createUser, deleteUser, getAllUsers, findUser } from "./service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export const userRouter = express.Router();
const KEY = process.env.JWT_KEY || "SECRET";

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

userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: "error",
        error: "Request missing email or password",
      });
    }
    const user = await findUser(username);
    if (!user) {
      return res.status(400).json({ status: "error", error: "User Not Found" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          role: user.role,
          username: user.username,
        };
        jwt.sign(
          payload,
          KEY,
          {
            expiresIn: 60 * 60 * 24 * 30,
          },
          (_err, token) => {
            if (token) {
              return res.status(200).json({
                success: true,
                user: {
                  role: payload.role,
                  username: payload.username,
                  token: token,
                },
              });
            }
          }
        );
      } else {
        res.status(400).json({
          error: "Password and email does not match.",
        });
      }
    });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

userRouter.post("/validate", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({
      error: "No token found",
    });
  }
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), KEY);
    return res.status(200).json(decoded);
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
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
