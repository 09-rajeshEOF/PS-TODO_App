import Express , { Router,Request,Response, response } from 'express';
import Users from './../models/user';
import {omit} from 'lodash'
import { isCommaListExpression } from 'typescript';

const authRouter = Router();
authRouter.post('/register',async (req: Request, res:Response) => {
    try {
        const {username,email,password} = req.body;
        const user = await Users.create({ username, email, password });
res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({message:"User alreday exists"});
    }
})


//SIGN iN
authRouter.post('/signin',async (req: Request, res:Response) => {
    try {
       const user  = await Users.findOne({email : req.body.email});
       if(!user){
        res.status(400).json({message:"please SignUp to continue"});
       } 
       else{
    //    const isValid = await localeCompare(req.body.password);
       if(req.body.password === user.password){
        const others =omit( user.toObject(),'password');
        // delete others.password;
        res.status(200).json(others);
       }
       else{
        res.status(400).json({message:"Invalid Password"});
       }
    }
    } catch (error) {
        res.status(400).json({message:"User alreday exists"});
    }
})

export default authRouter;