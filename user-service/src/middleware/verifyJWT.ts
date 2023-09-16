import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { KEY } from "../router";

type UserPayloadType = {
    id: string;
    role: string;
    username: string;
    iat: number;
    exp: number;
};

declare global {
    namespace Express {
        interface Request {
            userPayload?: UserPayloadType;
        }
    }
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(401).json({
        error: "No token found",
      });
    }
    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), KEY);
        req.userPayload = decoded as UserPayloadType;
        next();
    } catch (error) {
      return res.status(401).json({
        error: "Invalid token",
      });
    }
};

export default verifyJWT;