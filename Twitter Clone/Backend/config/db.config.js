import mongoose from 'mongoose'

export const connectdb=async(req,res)=>{
    try{
    const conn=await mongoose.connect(process.env.URL)
    console.log(`db connected successfully ${conn.connection.host}`);
    }catch(err){
       res.status(400).json({message:'unable to connect the db'})
       process.exit(1);
    }
}