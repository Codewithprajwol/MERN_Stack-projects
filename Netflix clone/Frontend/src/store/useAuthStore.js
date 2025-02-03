import {create} from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'

export const useAuthStore=create((set)=>({
    user:null,
    isSigningIn:false,
    isAuthenticating:true,
    isLoggingOut:false,
    isLoggingIn:false,
    signupUser:async(userData)=>{
        set({isSigningIn:true})
        try{
        const response=await axios.post('/api/v1/auth/signup',userData)
        if(response.data.success){
            console.log(response.data?.data)
            toast.success('user created Successfully')
            set({user:response.data?.data,isSigningIn:false})
        }
        }catch(err){
            toast.error(err.response?.data?.error || "signup failed")
            set({user:null,isSigningIn:false})
        console.log(err)
        }
    },
    authCheckUser:async()=>{
        try{
            set({isAuthenticating:true})
            const response=await axios.get('/api/v1/auth/authcheck');
            set({user:response.data.user,isAuthenticating:false})

        }catch(err){
            // console.log(err)
            set({user:null,isAuthenticating:false})
        }
    },
    loginUser:async(userData)=>{
        try{
            set({isLoggingIn:true})
         const response=await axios.post('/api/v1/auth/login',userData)
         if(response.data?.data){
            set({user:response.data.data,isLoggingIn:false})
            toast.success('Logged in Successfully')
         }

        }catch(err){
            console.log(err)
          set({user:null,isLoggingIn:false})
          toast.error(err.response?.data?.error || "Login failed")
        }
    },
    logoutUser:async()=>{
        try{
        set({isLoggingOut:true})
        await axios.post('/api/v1/auth/logout')
        toast.success('user logged out Successfully')
        set({user:null,isLoggingOut:false})
        }catch(err){
            console.log(err)
            set({user:null,isLoggingOut:false})
        }
    }
}))