import mongoose from "mongoose"
import { ENV_VAR } from "./env.config.js"
export const connectdb=async(req,res)=>{
    await mongoose.connect(ENV_VAR.mongoUrl);
    console.log('db connnected successfully');
}