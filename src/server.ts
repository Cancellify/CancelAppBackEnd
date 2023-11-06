import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { createNewAccount, getAllUsers, login } from '../userController/userController';
import { createEvent } from '../eventController/eventController';






const cors = require("cors")


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({
  "/api": {
    "target": "http://localhost:8080",
    "pathRewrite": {"^/api" : ""},
   "secure": false
 }
}))



app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });

app.post("/accounts/new", createNewAccount)

app.post("/accounts/login", login)

app.get("/accounts/all", getAllUsers)

app.post("/events/create", createEvent)


  









  app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export { app }