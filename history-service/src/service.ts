import db from "./utils/db.server";
import { Prisma } from "@prisma/client";

type HistoryResponse = {
  roomid: string;
  user1: string;
  user2: string;
  time: Date;
  code: string;
  questionid: number;
};

export const findHistoryByUserId = async (
  userId: string
): Promise<HistoryResponse[]> => {
  return await db.history.findMany({
    where: {
      OR: [{ user1: userId }, { user2: userId }],
    },
  });
};
