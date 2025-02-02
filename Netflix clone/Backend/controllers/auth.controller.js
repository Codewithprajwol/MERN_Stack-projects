import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import { generateTokenAndSetCookie } from "../utils/generateToken.utils.js";

export const createUser=async(req,res)=>{
    console.log("ma va tha aako thiyoo hai")
 try{
    const {email,password, username}=req.body;
    const emailRegix=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!emailRegix.test(email)){
     return res.status(400).json({error:'please send the valid email'})
    }
    if(password.length<6){
     return res.status(400).json({error:"password length should be greater or equal that 6"})
    }
    const existingUsername=await User.findOne({username})
    if(existingUsername){
     return res.status(400).json({error:'username already exists'})
    }
    const existingEmail=await User.findOne({email})
    if(existingEmail){
     return res.status(400).json({error:"email already exists"})
    }
    const salt=await bcrypt.genSalt(10)
    const hashPassowrd=await bcrypt.hash(password,salt)
 
 
     const image_url=['./userImage.png','/userImage1.png','/userImage2.png']
     const image=image_url[Math.floor(Math.random()*image_url.length)]
    const newUser=new User({
     username,
     password:hashPassowrd,
     email,
     image
    })
    if(newUser){
        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save()
    }
    res.status(201).json({success:true,data:{...newUser._doc,
    password:""
    }})
 }catch(err){
    console.log('error in singup controller',err.message);
    res.status(500).json({error:'Internal Server error'})
 }
}

export const loginUser=async(req,res)=>{
   try{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({error:"please provide the proper username and email"})
    }
    
    const user=await User.findOne({email});
    if(!user) return res.status(400).json({error:"user not found"})
        
        const confirmPassword=await bcrypt.compare(password,user.password)
        if(!confirmPassword) return res.status(400).json({error:"password didnot match"})
    generateTokenAndSetCookie(user._id,res);
    res.status(200).json({message:"user login successfully", data:{
        ...user._doc,
        password:""
    }})
   }catch(err){
    console.log('error in userLogin controller',err.message)
    res.status(500).json({error:"Internal server Error"});
   }
}

export const logoutUser=async(req,res)=>{
     try{
         res.clearCookie("jwtToken");
         res.status(200).json({success:true,message:"logged out successfully"})

     }catch(err){
        console.log('error in logOut controller',err.message)
        res.status(500).json({error:"Internal server Error"});
     }
}