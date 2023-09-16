import { User } from "@prisma/client";
import db from "./utils/db.server";
import bcrypt, { decodeBase64 } from "bcryptjs";
import { PrismaClient, Prisma } from "@prisma/client";

type UserRequest = {
  username: string;
  password: string;
  role: string;
};

type UserResponse = {
  id: string;
  username: string;
};

export const getAllUsers = async (): Promise<UserResponse[]> => {
  return await db.user.findMany({
    select: {
      id: true,
      username: true,
    },
  });
};

export const createUser = async (
  user: UserRequest
): Promise<User | undefined> => {
  const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
  return await prisma?.user.create({
    data: {
      username: user.username,
      password: hashedPassword, // Store the hashed password in the database
      role: user.role,
    },
  });
};

export const deleteUser = async (userid: string): Promise<User> => {
  return await db.user.delete({
    where: {
      id: userid,
    },
  });
};

export const findUser = async (username: string): Promise<User | null> => {
  return await db.user.findFirst({
    where: {
      username: username,
    },
  });
};
