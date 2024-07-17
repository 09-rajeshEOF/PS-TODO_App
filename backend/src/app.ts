import express, { application, Request, Response } from 'express';

const app = express();

const PORT:number = 3333;

app.get("/",(req:Request,res:Response) =>{
    res.send("hello world");
})
app.listen(PORT,() => {
    console.log(`server is running on Port  ${PORT}`)
})

export default app;