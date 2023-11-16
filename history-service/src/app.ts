import cors from "cors";
import { config } from "dotenv";
import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { Server } from "http";
import createHttpError from "http-errors";
import { historyRouter } from "./router";
const cookieParser = require("cookie-parser");

config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", historyRouter);

// Catch invalid routes and create a 404 error
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});

// Error handler middleware
const errorhandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).send(err.message);
};

app.use(errorhandler);

const PORT: number = Number(process.env.PORT) || 8002;
const server: Server = app.listen(PORT, () => {
  console.log(`The application is listening on port ${PORT}!`);
});
