import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import { ConnectDB } from './config/db';
import userroutes from './routes/userRoutes';

dotenv.config();

const app =express();
app.use(express.json());
app.use(cors());

app.use('/api/user',userroutes);

const PORT = process.env.PORT ||5000

ConnectDB().then(()=>{
  app.listen(PORT,()=>{
    
    console.log(`App running at PORT ${PORT} `)

})  
})

