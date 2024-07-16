import express from 'express';

const app = express();

const PORT = 3333;
app.listen(PORT,() => {
    console.log(`server is running on Port  ${PORT}`)
})