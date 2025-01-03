import mongoose from "mongoose";
 export const connectdb=await mongoose.connect(process.env.URL).then(()=>console.log('db connected successfully')).catch((err)=>{console.log('something went wrong',err)})
