import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt'

export const signup=async(req,res)=>{
    try{
    const {fullname,username,email,password}=req.body;
        console.log(fullname,username,email,password)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
       return res.status(400).json({"error":"Invalid email Format"});
    }
     const existingUser=await User.findOne({username})
     if(existingUser){
       return res.status(400).json({"error":"user already exists"})
     }

     const existingEmail=await User.findOne({email})
     if(existingEmail){
       return  res.status(400).json({"error":"email already exists"});
     }
     if(password.length<6){
       return  res.status(400).json({"error":"password length should be greater or equal to 6"})
     }
     const salt=await bcrypt.genSalt(10);
     const hashPassword=await bcrypt.hash(password,salt)

     const newUser=new User({
        username,
        fullname,//here userModel ko name sanga melnu parxa
        password:hashPassword,
        email,
     })
     if(newUser){
        generateTokenAndSetCookie(newUser._id,res)
         await newUser.save()
       res.status(200).send({sucess:true,data:{
        id:newUser._id,
        fullName:newUser.fullname,
        username:newUser.username,
        followers:newUser.followers,
        following:newUser.following,
        coverImage:newUser.coverImg,
        profileImage:newUser.profileImg
       }})
     }else{

         res.status(404).json({success:false,error:'Invalid user Data'})
     }
    }catch(err){
        res.status(500).json({success:false,error:'Internal Server Error'})
    }
}

export const login=async(req,res)=>{
    res.send('hello from login')
}

export const logout=async(req,res)=>{
    res.send('hello from logout')
}
