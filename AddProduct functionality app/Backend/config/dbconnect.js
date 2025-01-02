import mongoose from "mongoose";
console.log(process.env.URL)

 export const connectdb=await mongoose.connect(process.env.URL).then(()=>console.log('db connected successfully')).catch((err)=>{console.log('something went wrong',err)})
