import bcrypt from "bcrypt"
import {v2 as cloudinary} from 'cloudinary'
//models
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";


export const getUserProfile=async(req,res)=>{
     const {username}=req.params;
     try{
        const user=await User.findOne({username}).select('-password');
        if(!user){
            return res.status(400).json({error:"User not found"});        }
     }catch(err){
        console.log("Error in getUserProfile",err.message);
        res.status(500).json({error:err.message})
     }
}

export const followUnfollowUser=async(req,res)=>{
    try{
      const {id}=req.params;
      const userToModify=await User.findById(id);
      const currentUser=await User.findById(req.user._id);
      
      if(id===req.user._id.toString()){
        return res.status(400).json({error:"you can't follow and unfollow yourself"});
      }
      if(!userToModify || !currentUser) 
        {return res.status(400).json({error:"User not found vayoo hai"});}  

      const isFollowing=currentUser.following.includes(id);
      if(isFollowing){
        //unfollow the user
        await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}})
        await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}})

        res.status(200).json({message:"user unfollowed successfully"})
      }else{
        //follow the user
        await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}});
        await User.findByIdAndUpdate(req.user._id,{$push:{following:id}})
        const newNotification=new Notification({
            type:'follow',
            from:req.user._id,
            to:userToModify.id
        })

        await newNotification.save()

        //TODO: return the id of the user as a reponse
        //send the notification to the user
        res.status(200).json({messag:"user followed successfully"})
      }

    }catch(err){
        console.log("Error in followUnfollowUser controller",err.message);
        res.status(500).json({error:'something'})
    }
}

export const getSuggestedUser=async(req,res)=>{
    try{
        const userId=req.user._id;

        const userFollowedByMe=await User.findById(userId).select('following');

        const users=await User.aggregate([
            {
                $match:{
                    _id:{$ne:userId}
                }
            },
            {
                $sample:{size:10}
            }
        ])

        const filteredUsers=users.filter(user=>!userFollowedByMe.following.includes(user._id))
        const suggestedUser=filteredUsers.slice(0,4)
        suggestedUser.forEach(user=>user.password=null)
        res.status(200).json(suggestedUser)
    }catch(err){
        console.log('Error in getSuggestedUsers',err.message);
        res.status(500).json({error:err.message})

    }
}

export const updateUser=async(req,res)=>{
    try{
    const {fullname,email,username,currentPassword,newPassword,bio,link}=req.body;
    console.log(email,username,bio)
    let {profileImg,coverImg}=req.body;
    const userId=req.user._id;
        let user=await User.findById(userId);
        if(!user) return res.status(404).json({err:'User not found'})

       if((!newPassword && currentPassword)|| (!currentPassword && newPassword)){
       return res.status(404).json({err:'please provide both the current Password and new Password'})
       }
        if(currentPassword && newPassword){
            const isMatch=await bcrypt.compare(currentPassword,user.password);
            if(!isMatch){
                return res.status(400).json({error:'current passowrd is incorrect'})
            }
            if(newPassword.length<6){
                return res.status(400).json({error:"password must be longer or equal to 6 character"})
            }
            const salt=await bcrypt.genSalt(10);
            user.password=await bcrypt.hash(newPassword,salt)
        }
        if(profileImg){
            if(user.profileImg){
                await cloudinary.uploader.destroy(user.profileImg.split('/').pop().split('.')[0])
            }
            const uploadedResponse=cloudinary.uploader.upload(profileImg)
            profileImg=uploadedResponse.secure_url;
        }
        if(coverImg){
            if(user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split('/').pop().split('.')[0])
            }
            const uploadedResponse=cloudinary.uploader.upload(coverImg)
            coverImg=uploadedResponse.secure_url;
        }
        user.fullname=fullname ||user.fullname;
        user.email=email || user.email;
        user.username=username ||user.username;
        user.bio= bio || user.bio;
        user.link =link ||user.link;
        user.profileImg=profileImg ||user.profileImg;
        user.coverImg=coverImg || user.coverImg;

        user =await user.save()
        user.password=null
         res.status(200).json(user)
    }catch(err){
        console.log('Error in updateUsers',err.message);
        res.status(500).json({error:err.message})
    }
}