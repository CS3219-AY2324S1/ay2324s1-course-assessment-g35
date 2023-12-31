import express from "express";
import {
  createUser,
  deleteUser,
  editUser,
  findUserByUsernameReturnsAllFields,
  findUserByIdReturnsWithoutPw,
} from "./service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyJWT from "./middleware/verifyJWT";

export const userRouter = express.Router();
export const KEY = process.env.JWT_KEY || "SECRET";

// ------------------ Users CRUD ------------------

userRouter.get("/", async (req, res) => {
  res.status(200).json();
});

// Get user details
userRouter.get("/retrieve", verifyJWT, async (req, res) => {
  if (!req.userPayload) {
    return res.status(400).json({
      status: "error",
      error: "Request missing id",
    });
  }
  console.log("id", req.userPayload.id);
  try {
    const users = await findUserByIdReturnsWithoutPw(req.userPayload.id);
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

// Create a new user
userRouter.post("/", async (req, res) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

// Edit user details
userRouter.post("/edit", verifyJWT, async (req, res) => {
  if (!req.userPayload) {
    return res.status(400).json({
      status: "error",
      error: "Request missing id",
    });
  }
  try {
    const user = await editUser(req.body, req.userPayload.id);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

// Delete user
userRouter.delete("/", verifyJWT, async (req, res) => {
  if (!req.userPayload) {
    return res.status(400).json({
      status: "error",
      error: "Request missing id",
    });
  }
  try {
    const users = await deleteUser(req.userPayload.id);
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

// ------------------ Authentication ------------------
userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Request is missing email or password",
      });
    }
    console.log(username, password);
    const user = await findUserByUsernameReturnsAllFields(username);
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid username. User not found." });
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
                token: "Bearer " + token,
                username: user.username,
              });
            }
          }
        );
      } else {
        res.status(400).json({
          message: "Wrong Password",
        });
      }
    });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

userRouter.get("/verify", verifyJWT, (_req, res) => {
  return res.sendStatus(204);
});
