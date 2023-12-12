import express, { Request,Response,json, NextFunction } from 'express';
import * as dotenv from 'dotenv';

import cors from 'cors';
import userRouter from './routes/usersRoutes';


const app=express();

dotenv.config();
app.use(json());

app.use(cors())


app.use('/users',userRouter)
app.use('/posts', )



app.use((error:Error,req:Request,res:Response,next:NextFunction)=>{
    res.json({
        message:error
    })

})

const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`App is running on Port: ${port}`);
    
})