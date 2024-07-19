import express, { application, Request, Response } from 'express';
import conn from './connections/conn';
import authRouter from './routes/auth';
import listRouter from './routes/list';
const app = express();
app.use(express.json());

const PORT:number = 3330;
conn().then(() => {
    console.log('checking for connecton : truobleshoot');
  
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    });
  }).catch((error) => {
    console.log('Database connection failed!');
  });

app.use('/api/v1',authRouter);
app.use('/api/v2',listRouter);
app.get("/",(req:Request,res:Response) =>{
    res.send("hello world");
})

export default app;