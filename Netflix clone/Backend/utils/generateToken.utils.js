import jwt from 'jsonwebtoken'
import { ENV_VAR } from '../config/env.config.js'

export const generateTokenAndSetCookie=async(userId, res)=>{
    const token= jwt.sign({userId},ENV_VAR.secret_key,{expiresIn:'15d'})

    res.cookie("jwtToken",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:ENV_VAR.node_env!=='development',
    })
    console.log(token)
    return token
}