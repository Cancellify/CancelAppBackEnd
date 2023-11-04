import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { createNewAccount } from '../userController/userController';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });

app.post("/accounts/new", createNewAccount)


  









  app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});