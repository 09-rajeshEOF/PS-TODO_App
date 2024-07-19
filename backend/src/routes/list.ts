import { Router ,Request,Response} from "express";
import mongoose from "mongoose";
import Users from "../models/user";
import Todo from "../models/todoList";

const listRouter  = Router();
//creating task 
listRouter.post('/addTasks', async (req:Request,res:Response) => {
   try {
    const {title,description,email} = req.body;
    const userExists = await Users.findOne({email});
    if(userExists) {
        const existingTodo = await Todo.findOne({ title, user: userExists._id });
      if (existingTodo) {
        return res.status(400).json({ message: 'Task already exists' });
      }
        const todo = new Todo({title,description,user:userExists._id});
        await todo.save().then(() => {res.status(200).json(todo)});
        userExists.todoList.push(todo._id as mongoose.Types.ObjectId); //as unknown as mongoose.Types.ObjectId
        userExists.save();
    }
   } catch (error) {
    console.log(error)
   }
    })

//update task 

listRouter.put('/updateTasks/:id', async (req: Request, res: Response) => {
    try {
      const { title, description, email } = req.body;
      const userExists = await Users.findOne({ email });
      if (userExists) {
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
        if (updateTodo) {
          await updateTodo.save();
          return res.status(200).json({ message: 'Task updated successfully', updateTodo });
        }
        return res.status(404).json({ message: 'Todo not found' });
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

//delete Tasks
  listRouter.delete('/deleteTasks/:id', async (req:Request,res:Response) => {
   try {
    const {email} = req.body;
    const userExists = await Users.findOneAndUpdate({email},{$pull:{todoList : req.params.id}});
    if(userExists) {
        const deleteTodo = await Todo.findByIdAndDelete(req.params.id).then(() => {
            res.status(200).json({message : "delete sucessful"});
         }
        )
    }
   } catch (error) {
    console.log(error)
   }
    })

    //get all thgefor user tasks
    //with help of user id
listRouter.get('/getTasks/:id' ,async (req:Request,res:Response) => {
    const todoList =  await Todo.find({user : req.params.id})
    res.status(200).json({todoList : todoList});
})


export default listRouter;