import  { createUser, getUser, getAll } from "../userModel/userModel"
import express, { Express, Request, Response } from 'express';
import crypto from "crypto"


async function createNewAccount(req: Request, res: Response) {
    try {
      // Destructuring req.body data
      const { username, password, email, firstName, lastName } = req.body;
     
      // Create salt
      const salt = crypto.randomBytes(6).toString("hex");
      const saltedPassword = salt + password;
      
      // Hash-ing password
      const hash = crypto.createHash("sha256");
      const hashSaltedPassword = hash.update(saltedPassword).digest("hex");
      
      // Create new account data
      const newAccountData = {
        username: username,
        hashed_salt_password: hashSaltedPassword,
        salt: salt,
        email: email,
        first_name: firstName,
        last_name: lastName,
      };
     

      await createUser(newAccountData);
      res.status(201).send("Account created");
    } catch (error: any) {
      res.status(409).send(`Failed to create account: ${error.message}`);
    }
  }

  async function login(req: Request, res: Response) {
    try {
      // Destructuring req.body data
      const { username: inputUsername, password: inputPassword } = req.body;
      
      
      // Retrive account data based on username
      let accountData = await getUser(inputUsername);
     
      
      // Throw error if username is wrong
      if (!accountData) {
      
        throw new Error ();
      }
  
      // Create hash password
      const saltedInputPassword = accountData.salt + inputPassword ;
   
      const hash = crypto.createHash("sha256");
      const hashSaltedInputPassword = hash.update(saltedInputPassword).digest("hex");
  
      // Throw error if password is wrong
      if (hashSaltedInputPassword !== accountData.hashed_salt_password) {
        throw new Error ();
      }

      // If password match, 
      const sentAccountData = {
        firstName: accountData.first_name,
        lastName: accountData.last_name,
        username: accountData.username,
      }

   
      res.status(200).send(JSON.stringify(sentAccountData));
    

    } catch (err) {
      res.status(401).send("Invalid Username or Password");
    }
  }


  async function getAllUsers(req: Request, res: Response) {
    try {
      const data = await getAll();

      res.status(200).send(data);
     

    } catch (err) {
      res.status(401).send("Invalid Request");
    }
  }





  export { createNewAccount, login, getAllUsers }