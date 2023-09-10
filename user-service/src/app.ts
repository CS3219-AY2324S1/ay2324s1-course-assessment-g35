import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from 'express';
import { Server } from 'http';
import createHttpError from 'http-errors';
import { config } from 'dotenv';

config();

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound());
});

const errorhandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send('err.message');
}

app.use(errorhandler);

const PORT: number = Number(process.env.PORT) || 3000;
const server: Server = app.listen(PORT, () => {
  console.log(`The application is listening on port ${PORT}!`);
});

