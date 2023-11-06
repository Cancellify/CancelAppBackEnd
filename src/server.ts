import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { createNewAccount, getAllUsers, login } from '../userController/userController';
import { createEvent } from '../eventController/eventController';


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBqY97r-i6naLOHPBBxXjkiiWoWl3qn0mY",
//   authDomain: "cancellify-c378f.firebaseapp.com",
//   projectId: "cancellify-c378f",
//   storageBucket: "cancellify-c378f.appspot.com",
//   messagingSenderId: "869057201942",
//   appId: "1:869057201942:web:ab169856bf57071e00f237",
//   measurementId: "G-XRMEFGN5DL"
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);

// const serviceAccount = require(".details.json")
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "URL_TO_DATABASE"
// });  




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

// app.use(bodyParser.urlencoded());

// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'GET, OPTIONS')
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//   res.header('Access-Control-Allow-Credentials', true)
//   return next()
// });


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