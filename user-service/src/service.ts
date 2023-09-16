import { User } from "@prisma/client";
import db from "./utils/db.server";
import bcrypt from "bcryptjs";

type UserCreateRequestType = {
  username: string;
  password: string;
  email: string;
};

type UserEditRequestType = {
  email: string;
};

type UserResponseType = {
  id: string;
  username: string;
  // password: string;
  role: string;
  email: string;
};

export const createUser = async (
  user: UserCreateRequestType
): Promise<UserResponseType | undefined> => {
  const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
  return await prisma?.user.create({
    data: {
      username: user.username,
      password: hashedPassword, // Store the hashed password in the database
      role: 'USER',
      email: user.email,
    },
  });
};


//get id from req.reqPayload.id
export const editUser = async (
  user: UserEditRequestType, id: string
): Promise<UserResponseType | undefined> => {
  return await prisma?.user.update({
    where: {
      id: id,
    },
    data: {
      email: user.email,
    },
  });
};

export const deleteUser = async (userid: string): Promise<UserResponseType> => {
  return await db.user.delete({
    where: {
      id: userid,
    },
  });
};

export const findUserWithoutPw = async (userid: string): Promise<UserResponseType | null> => {
  return await db.user.findFirst({
    where: {
      id: userid,
    },
    select: {
      id: true,
      username: true,
      role: true,
      email: true,
    },
  });
};

export const findUserAllFields = async (id: string): Promise<User | null> => {
  return await db.user.findFirst({
    where: {
      id: id,
    },
  });
};
