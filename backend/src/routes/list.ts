import { Router, Request, Response } from "express";
import { Request as ExpressJWTRequest } from 'express-jwt';
import mongoose from "mongoose";
import Users from "../models/user";
import Todo from "../models/todoList";
import jwt ,{Jwt} from "jsonwebtoken";
import { SECRET_KEY } from "../config";

const listRouter = Router(); 
listRouter.post('/addTasks', verifyToken, async (req: Request, res: Response) => {  
  try {  
    const { title, description } = req.body;  
    const user = (req as any).user;  

    if (!user) {  
      return res.status(401).json({ message: 'Can not verify user' });  
    }  

    const existingTodo = await Todo.findOne({ title, user: user._id });  

    if (existingTodo) {  
      return res.status(400).json({ message: 'Task already exists' });  
    }  

    const todo = new Todo({ title, description, user: user._id });  
    await todo.save();  
    res.status(200).json(todo);  

    user.todoList.push(todo._id as mongoose.Types.ObjectId);  
    await user.save();  
    console.log('add task success!')
  } catch (error) {  
    return res.status(401).json({ message: 'Got Invalid token ' });  
  }  
});

  
//update task   
listRouter.put('/updateTasks/:id', verifyToken,async (req: Request, res: Response) => {  
  try {  
      const user = (req as any).user;  
      const { title, description } = req.body;  
      const todoToUpdate = await Todo.findOne({ _id: req.params.id, user: user._id });  
      if (!todoToUpdate) {  
          return res.status(404).json({ message: 'Todo not found' });  
      }  
      todoToUpdate.title = title;  
      todoToUpdate.description = description;  
      await todoToUpdate.save();  
      return res.status(200).json({ message: 'Task updated successfully', todoToUpdate });  
  } catch (error) {  
      console.log(error);  
      return res.status(500).json({ message: 'Server error' });  
  }  
});  

//delete Tasks  
listRouter.delete('/deleteTasks/:id', verifyToken,async (req: Request, res: Response) => {  
  try {  
      const user = (req as any).user;  
      const todoToDelete = await Todo.findOneAndDelete({ _id: req.params.id, user: user._id });  
      if (!todoToDelete) {  
          return res.status(404).json({ message: 'Todo not found' });  
      }  
      await Users.updateOne({ _id: user._id }, { $pull: { todoList: req.params.id } });  
      return res.status(200).json({ message: "delete successful" });  
  } catch (error) {  
      console.log(error);  
      return res.status(500).json({ message: 'Server error' });  
  }  
})  

listRouter.get('/getTasks/:id', verifyToken,async (req: Request, res: Response) => {  
  const user = (req as any).user;  
  const todoList = await Todo.find({ user: user._id }).sort({ createdAt: -1 });  
  if (todoList.length !== 0) {  
      res.status(200).json({ todoList: todoList });  
  }  
  else {  
      res.status(200).json({ message: "No tasks to Show" });  
  }  
})

function verifyToken(req: any, res: any, next: any) {  
  const bearerHeader = req.headers['authorization'];  
  if (typeof bearerHeader !== 'undefined') {  
    const bearer = bearerHeader.split(" ");  
    const token = bearer[1];  
    jwt.verify(token, SECRET_KEY, async (err: any, decoded: any) => {  
      if (err) {  
        return res.status(401).json({ result: "Not a Valid Token" });  
      }  
      const user = await Users.findById(decoded.userId);  
      if (!user) {  
        return res.status(401).json({ result: "User not found" });  
      }  
      (req as any).user = user;  
      next();  
    });  
  } else {  
    return res.status(401).json({ result: "Not a Valid Token" });  
  }  
}

export default listRouter;

//get all thgefor user tasks
//with help of user id
//sorted order of tasks

// import { promisify } from 'util';
// const verifyJwt = promisify(jwt.verify);
// interface CustomRequest extends Request {
//   token?: string;
// }

// listRouter.post('/addTasks', async (req: Request, res: Response) => {
 
//     try {
//         const { title, description, email } = req.body;
//         const userExists = await Users.findOne({ email });
//         if (userExists) {
//             const existingTodo = await Todo.findOne({ title, user: userExists._id });
//             if (existingTodo) {
//                 return res.status(400).json({ message: 'Task already exists' });
//             }
//             const todo = new Todo({ title, description, user: userExists._id });
//             await todo.save().then(() => { res.status(200).json(todo) });
//             userExists.todoList.push(todo._id as mongoose.Types.ObjectId); //as unknown as mongoose.Types.ObjectId
//             userExists.save();
//         }
//     } catch (error) {
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// })