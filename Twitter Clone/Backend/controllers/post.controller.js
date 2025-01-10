import { v2 as cloudinary } from "cloudinary";

import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const createPost=async(req,res)=>{
    try{
     const {text}=req.body;
     let {img}=req.body;

     const userId=req.user._id;

     const user=await User.findById(userId)
     if(!user) return res.status(404).json({err:"user not found"})
     if(!text && img){
        return res.status(400).json({error:"post must have text or image"});
     }
     if(img){
        const uploadedResponses=await cloudinary.uploader.upload(img);  
        img=uploadedResponses.secure_url;
    }

     const newPost=new Post({
        user:userId,
        text,
        img
     })
     await newPost.save();
     res.status(201).json(newPost)
    }catch(err){
       res.status(500).json({error:"Internal server error"});
       console.log("Error in createPost controller:",err.message)
    } 
}

export const deletePost=async(req,res)=>{
    try{
     const post=await Post.findById(req.params.id)
        if(!post) return res.status(404).json({error:'post not found'});
        if(post.user.toString() !== req.user._id.toString()){
            return res.status(401).json({error:"You are not authorized to delete this post"})
        }
        if(post.img){
            const imgId=post.img.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(imgId)
        }
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'post delete Successfully'})
    }catch(err){
        console.log("Error in deletePost controller:",err);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const commentOnPost=async(req,res)=>{
    try{
        const {text}=req.body;
        const postId=req.params.id;
        const userId=req.user._id;

        if(!text) return res.status(400).json({error:"Text field is required"})
          const post=await Post.findById(postId)  ;
        if(!post) return res.status(404).json({error:"Post not found"})

        const comment={user:userId,text:text}
  
        post.comments.push(comment);
        await post.save();
        res.status(200).json(post)
    }catch(err){
      console.log("error in commentOnPost controller",err.message)
      res.status(500).json({error:"Internal Server Error"});
    }
}

export const likeUnlikePost=async(req,res)=>{
    try{
        const userId=req.user._id;
        const {id:postId}=req.params;

        const post=await Post.findById(postId)
        if(!post) return res.status(404).json({error:"Post not found"})
            const userLikedPost=post.likes.includes(userId)
        if(userLikedPost){
            //unlike post
            await Post.updateOne({_id:postId},{$pull:{likes:userId}})
            await User.updateOne({_id:userId},{$pull:{likedPosts:postId}})
            res.status(200).json({message:"Post unliked successfully"})
        }else{
            //Like post
            post.likes.push(userId);
            await User.updateOne({_id:userId},{$push:{likedPosts:postId}})
            post.save()

            const notification=new Notification({
                from:userId,
                to:post.user,
                type:"like"
            })

            await notification.save();
            res.status(200).json({message:"post Liked successfully"})
        }
    }catch(err){
        console.log("Error in likeUnlikePost controller:",err);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const getAllPost=async(req,res)=>{
    try{
        const posts=await Post.find().sort({createdAt: -1}).populate({
            path:"user",
            select:"-password"
        }).populate({
            path:"comments.user",
            select:"-password"
        });
        posts.forEach((post)=>post.user.password=null)

        if(posts.length===0){
            return res.status(200).json([])
        }
        res.status(200).json(posts)


    }catch(err){
        console.log("Error in getAllPost controller:",err);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const getLikedPost=async(req,res)=>{
    const userId=req.params.id;
    try{
        const user=await User.findById(userId);
        if(!user) return res.status(400).json({error:"user not found"});

        const likedPost=await Post.find({_id:{$in:user.likedPosts}}).populate({
            path:"user",
            select:"-password"
        }).populate({
            path:"comments.user",
            select:"-password"
        })
        res.status(200).json(likedPost);

    }catch(err){
            console.log("Error in getAllPost controller:",err);
            res.status(500).json({error:"Internal Server Error"});
        }
}

export const getFollowingPosts=async(req,res)=>{
    try{
        const userId=req.user._id;
        const user=await User.findById(userId);
        if(!user) return res.status(400).json({err:"user not found"});
        
        const followingPosts=await Post.find({user:{$in:user.following}}).sort({createdAt:-1}).populate({
            path:"user",
            select:'-password'
        }).populate({
            path:"comments.user",
            select:'-password'
        })

        res.status(201).json(followingPosts);
    }
    catch(err){
        console.log("Error in getFollowingPosts controller:", err.message);
        res.status(500).json({error:"internal server error"})
    }
}

export const getUserPosts=async(req,res)=>{
    try{
        const {username}=req.params;
        const user=await User.findOne({username});
        if(!user) return res.status(400).json({error:'user not found'});

        const myPosts=await Post.find({user:user._id}).sort({createdAt:-1}).populate({
            path:'user',
            select:'-password'
        }).populate({
            path:'comments.user',
            select:'-password'
        })
        res.status(200).json(myPosts)

    }catch(err){
        console.log("Error in getUserPost controller:", err.message);
        res.status(500).json({error:"internal server error"})
    }
}