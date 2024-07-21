import Express, { Router, Request, Response, response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../config";
import Users from './../models/user';
import { omit } from 'lodash'
import { isCommaListExpression } from 'typescript';

const authRouter = Router();
authRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const user = await Users.create({ username, email, password });
        res.status(201).json({ user });
    } catch (error : any) {
        console.log(error);
        if (error.code === 11000) { // Duplicate key error
            res.status(400).json({ message: 'User already exists' });
          } else {
            res.status(400).json({ message: 'Error creating user' });
          }
        }
      });      

//SIGN iN
authRouter.post('/signin', async (req: Request, res: Response) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json({ message: "please SignUp to continue" });
        }
        else {
            //    const isValid = await localeCompare(req.body.password);
            if (req.body.password !== user.password) {
                return res.status(400).json({ message: 'Invalid password' });
            } else {
                const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '3h' });
                const others = omit(user.toObject(), 'password');
                res.set('Authorization', `Bearer ${token}`);
                res.json({ token, user: others });

                console.log('sign in successful');
                // console.log(token);
            }
        }
    } catch (error) {
        res.status(400).json({ message: "User alreday exists" });
    }
})
export default authRouter;