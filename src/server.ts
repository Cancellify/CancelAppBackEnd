import express, { Express, Request, Response } from 'express';
import crypto from "crypto"
import { createNewAccount, getAllUsers, login } from '../userController/userController';
import { createEvent } from '../eventController/eventController';
import { config } from 'process';
const cors = require("cors")
const session = require("express-session")
// const pgSession = require('connect-pg-simple')(session)
// require("dotenv").config(".env")


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
const SECRET = crypto.randomBytes(22).toString("hex");
app.use(session({
//   store: new pgSession({
//     pool: process.env.DATABASE_URL,
//     tableName: 'session'
// }),
  secret: SECRET,
  cookie: {maxAge: 60000,
  secure: true},
  resave: false,
  saveUninitialized: true,
  
}))

app.post("/accounts/new", createNewAccount)

app.post("/accounts/login", login)

app.get("/accounts/all", getAllUsers)

app.post("/events/create", createEvent)


  









  app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export { app }