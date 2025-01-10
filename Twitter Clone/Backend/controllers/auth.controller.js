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
        console.log('error in the signup controller',err.message)
        res.status(500).json({success:false,error:'Internal Server Error'})
    }
}

export const login=async(req,res)=>{
    try {
      const {username,password}=req.body;
      const user=await User.findOne({username});
      const isPassword=await bcrypt.compare(password,user?.password || "");

      if(!user || !isPassword){
        return res.status(400).json({error:"Invalid username or password"})
      }

      generateTokenAndSetCookie(user._id,res);
      res.status(200).json({
        id:user._id,
        fullName:user.fullname,
        username:user.username,
        followers:user.followers,
        following:user.following,
        coverImage:user.coverImg,
        profileImage:user.profileImg
      })
      
    } catch (err) {
      console.log('error in the login controller',err.message)
      res.status(500).json({success:false,error:'Internal Server Error'})
    }
}

export const logout=async(req,res)=>{
  try {
    res.cookie('jwt',"",{maxAge:0})
    res.status(200).json({message:'logged out successfully'})
    
  } catch (err){
     console.log('error in logout controller',err.message);
     res.status(500).json({success:false,error:'Internal Server Error'})
  }
}

export const getMe=async(req,res)=>{
  try{
    const user=await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  }catch(err){
    console.log("Error in getMe controller",err.message);
    return res.status(500).json({error:"Internal Server Error"});
  }
}
