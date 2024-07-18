import { Request,Response } from "express";
import mongoose from "mongoose";

const conn = async(req?: Request, res?: Response) => {
   try {
     await mongoose.connect("mongodb+srv://Rajesh:56280rpn_SU@cluster0.nrm66oj.mongodb.net/");
     if (res) {
       res.status(200).json({ message: 'DataBase connected !!!' });
     } else {
       console.log('DataBase connected !!!');
     }
   } catch (error) {
     if (res) {
       res.status(400).json({ message: 'Not connected !!!' });
     } else {
       console.log('Not connected !!!');
     }
   }
 }
 export default conn;