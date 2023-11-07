import db from "./utils/db.server";
import { Prisma } from "@prisma/client";

type HistoryType = {
  roomid: string;
  user1: string;
  user2: string;
  time: Date;
  code: string;
  questionid: string;
};

export const findHistoryByUserId = async (
  userId: string
): Promise<HistoryType[]> => {
  const history = await db.history.findMany({
    where: {
      OR: [{ user1: userId }, { user2: userId }],
    },
  });

  // Sort the history by the 'time' property from most recent to least recent
  history.sort((a, b) => b.time.getTime() - a.time.getTime());

  return history;
};

export const getAllHistory = async (): Promise<HistoryType[]> => {
  return await db.history.findMany({});
};

export const createOrUpdateHistoryRecord = async (data: HistoryType) => {
  try {
    const { roomid, questionid } = data;

    // Check if a record with the same roomId and questionId exists
    const existingRecord = await db.history.findFirst({
      where: {
        roomid,
        questionid,
      },
    });

    if (existingRecord) {
      // If the record exists, update it
      const updatedRecord = await db.history.update({
        where: {
          roomid_questionid: {
            roomid: roomid,
            questionid: questionid,
          },
        },
        data,
      });

      return { message: "History record updated", record: updatedRecord };
    } else {
      // If the record doesn't exist, create a new record
      const newRecord = await db.history.create({
        data,
      });

      return { message: "History record created", record: newRecord };
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create or update history record");
  }
};
