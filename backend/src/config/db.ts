import mongoose from 'mongoose'
import dotenv from 'dotenv';


dotenv.config();

export const ConnectDB =async()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI|| "mongodb+srv://admin:admin123@cluster0.nbjwb.mongodb.net/finacplus?retryWrites=true&w=majority&appName=Cluster0"
);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
     console.log("Database connection error", error);
     process.exit(1);
  }
}

