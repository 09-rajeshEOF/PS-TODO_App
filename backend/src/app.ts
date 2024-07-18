import express, { application, Request, Response } from 'express';
import conn from './connections/conn';
import authRouter from './routes/auth';
const app = express();
app.use(express.json());

const PORT:number = 3333;
conn().then(() => {
    console.log('Database connected!');
  
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    });
  }).catch((error) => {
    console.log('Database connection failed!');
  });

app.use('/api/v1',authRouter);
app.get("/",(req:Request,res:Response) =>{
    res.send("hello world");
})

export default app;