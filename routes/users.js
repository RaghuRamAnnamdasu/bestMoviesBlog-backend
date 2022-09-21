import express from "express";
import {createUSer, getUserByName} from "./helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

  
async function genHashedPassword(password){
  const no_of_rounds = 10;
  const salt = await bcrypt.genSalt(no_of_rounds);
  const hashedPassword = await bcrypt.hash(password,salt);
  return hashedPassword;
}


  router.post('/signup', async function (req, res) {
    const {username,password} = req.body;
    const userFromDB = await getUserByName(username);

      if(userFromDB){
        res.status(400).send({"message" : "User name already exists"});
      }else if(password.length < 8){
        res.status(400).send({"message" : "Password Shall have minimum 8 characters"});
      }else{
        const hashedPassword = await genHashedPassword(password);
        const result = await createUSer({username : username , password : hashedPassword});
        console.log(hashedPassword);
        res.send(result);
      }
  })

  router.post('/login', async function (req, res) {
    const {username,password} = req.body;
    const userFromDB = await getUserByName(username);
    const storedPassword = userFromDB.password;
    const passwordMatch = await bcrypt.compare(password,storedPassword);
    console.log(passwordMatch);

      if(!userFromDB){
        res.status(401).send({"message" : "Invalid Credentials"});
      }else if(!passwordMatch){
        res.status(401).send({"message" : "Invalid Credentials"});
      }else{
        const token = jwt.sign({id : userFromDB._id},process.env.secretKey);
        res.send({"message" : "Successful Login", token : token});
      }
  })

export const usersRouter = router;


