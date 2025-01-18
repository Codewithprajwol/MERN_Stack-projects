import jwt from "jsonwebtoken";
import { ENV_VAR } from "../config/env.config.js";
import User from "../models/user.model.js";

export const protectRoute = async(req, res, next) => {

    try{
        const token=req.cookies.jwtToken;
        if(!token){
           return res.status(404).json({success:false,error:"Not authorized User"});
        }
        const decoded=jwt.verify(token,ENV_VAR.secret_key);
        if(!decoded){
            return res.status(404).json({error:"inavalid token"})
        }
        const user=await User.findById(decoded.userId);
        if(!user){
            return res.status(400).json({error:"user not found"});
        }
        req.user=user;
        next()
    }
    catch(err){
        res.status(500).json({error:'internal Server Error'})
        console.log('error in protectRoute',err.message)
    }
}