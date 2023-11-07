import express, { Express, Request, Response } from 'express';
import crypto from "crypto"
import { createNewAccount, getAllUsers, login } from '../userController/userController';
import { createEvent, getAllEvents, cancelEvent } from '../eventController/eventController';
import { config } from 'process';
const cors = require("cors")
const session = require("express-session")
// const pgSession = require('connect-pg-simple')(session)
// require("dotenv").config(".env")


const app: Express = express();
const port: any = process.env.PORT || 8080;

app.use(express.json());
// app.use(cors({
//   "/api": {
//     "target": "https://cancellify-2681bafbf4fb.herokuapp.com/",
//     "pathRewrite": {"^/api" : ""},
//    "secure": false
//  }
// }))

// app.use(cors({
//   "/api": {
//     "target": "https://cancel-app-front-r80fkrd3d-william-brammers-projects.vercel.app/",
//     "pathRewrite": {"^/api" : ""},
//    "secure": false
//  }
// }))

app.use(cors({
  origin: true,
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
  credentials: true
}));

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

app.post("/events/all", getAllEvents)

app.patch("/events/cancel", cancelEvent)


  









  app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export { app }