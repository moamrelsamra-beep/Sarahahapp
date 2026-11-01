import { DB_URI } from "../../config/config.service.js";
import mongoose from "mongoose";


export default async function connectDB() {
try{ 
  await mongoose.connect(DB_URI, {serverSelectionTimeoutMS: 5000})
    
      console.log("DB connected successfully......!!!!");
    
}catch(error) {
      console.log(error, "DB connection failed");
    }
};

