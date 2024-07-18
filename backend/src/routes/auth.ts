import Express , { Router,Request,Response, response } from 'express';
import Users from './../models/user';

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

export default authRouter;