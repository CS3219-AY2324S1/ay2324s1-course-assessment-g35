import db from "./utils/db.server";

type UserDto = {
    id: string;
    username: string;
}

export const getAllUsers = async (): Promise<UserDto[]> => {
    return await db.user.findMany(
        {
            select: {
                id: true,
                username: true
            }
        }
    );
}