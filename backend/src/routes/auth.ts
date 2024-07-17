import Express , { Router,Request,Response, response } from 'express';
import Users from './../models/user';

const authRouter = Router();

// for Sign In 
authRouter.post('/register',async (req: Request, res:Response) => {
    try {
        const {username,email,password} = req.body;
        const user  = new Users(username,email,password);
        await user.save().then(() => res.status(200).json({user:user})); 
    } catch (error) {
        res.status(400).json({message:"User alreday exists"});
    }
})

export default authRouter;