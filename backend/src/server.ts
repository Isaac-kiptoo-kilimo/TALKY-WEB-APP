import express, { Request,Response,json, NextFunction } from 'express';
import * as dotenv from 'dotenv';

import cors from 'cors';
import userRouter from './routes/usersRoutes';
import postRoute from './routes/postRoutes';
import * as cloudinary from 'cloudinary';


cloudinary.v2.config({
    cloud_name: 'dyisqzh7l',
    api_key: '883445841839746',
    api_secret: 'tP8KviZBVC4x-HO2Qr41-PiV41U',
  });

const app=express();

dotenv.config();
app.use(json());

app.use(cors())


app.use('/users',userRouter)
app.use('/posts', postRoute)



app.use((error:Error,req:Request,res:Response,next:NextFunction)=>{
    res.json({
        message:error
    })

})

const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`App is running on Port: ${port}`);
    
})