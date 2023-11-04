import  { createUser } from "../userModel/userModel"
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



  export { createNewAccount }