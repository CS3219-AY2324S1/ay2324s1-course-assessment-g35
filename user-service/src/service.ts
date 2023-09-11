import { User } from "@prisma/client";
import db from "./utils/db.server";

type UserDto = {
  id: string;
  username: string;
};

export const getAllUsers = async (): Promise<UserDto[]> => {
  return await db.user.findMany({
    select: {
      id: true,
      username: true,
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
