import jwt from 'jsonwebtoken'
export const generateTokenAndSetCookie=(userId,res)=>{
     const token=jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:'13d'})

     res.cookie("jwt",token,{
        maxAge:60,
        httpOnly:true,//prevent xss- cross site scripting attacks
        sameSite:"strict",// CSRF- cross site request forgery attacks    
        secure:process.env.NODE_ENV !=="development"
     })
}