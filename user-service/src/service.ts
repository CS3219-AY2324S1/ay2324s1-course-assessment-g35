import { User } from "@prisma/client";
import db from "./utils/db.server";

type UserRequest = {
  username: string;
  password: string;
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

export const createUser = async (user: UserRequest): Promise<User> => {
  return await db.user.create({
    data: {
      username: user.username,
      password: user.password,
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
