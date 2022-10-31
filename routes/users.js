import express from "express";
import {createUSer, getUserByName} from "./helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { client } from "../index.js";
import { ObjectId } from "bson";

const router = express.Router();

async function genHashedPassword(password){
    const no_of_rounds = 10;
    const salt = await bcrypt.genSalt(no_of_rounds);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
  }


// Login route

  router.post('/login',async function (req, res) {


      const {email,password} = req.body[0];
      if(email === "admin@gmail.com" && password===process.env.adminPassword){
        const token = jwt.sign({id : "1234"},process.env.secretKey);
        res.send({"message" : "Successful Login", token : token});
      }else{
        res.status(401).send({"message" : "Invalid Credentials"});
      }
      
  })    



  export const usersRouter = router;


  