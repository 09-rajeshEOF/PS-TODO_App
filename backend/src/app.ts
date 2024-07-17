import express, { application, Request, Response } from 'express';
import conn from './connections/conn';
import authRouter from './routes/auth';
const app = express();
app.use(express.json());

const PORT:number = 3333;

app.use('/api/v1',authRouter);
app.get("/",(req:Request,res:Response) =>{
    res.send("hello world");
})

app.listen(PORT,() => {
    console.log(`server is running on Port  ${PORT}`)
})

export default app;