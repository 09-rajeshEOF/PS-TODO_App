import { Request,Response } from "express";
import mongoose from "mongoose";
const conn = async(req:Request,res:Response) => {
   try {
    await mongoose.connect("mongodb+srv://Rajesh:56280rpn_SU@cluster0.nrm66oj.mongodb.net/").then(
        () => {
            console.log('DataBase connected !!!')
        });
   } catch (error) {
    res.status(400).json(
       { message : "Not connected !!!"}
    );
   }
}
export default conn;