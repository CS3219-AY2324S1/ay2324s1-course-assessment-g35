import db from "./utils/db.server";
import { Prisma } from "@prisma/client";

type HistoryResponseType = {
  id: string;
  questionID: string;
  timestamp: Date;
  attemptNo: number;
  userId: string;
};

export const findHistoryByUserId = async (
  userId: string
): Promise<HistoryResponseType[] | null> => {
  return await db.history.findMany({
    where: {
      userId: userId,
    },
  });
};
