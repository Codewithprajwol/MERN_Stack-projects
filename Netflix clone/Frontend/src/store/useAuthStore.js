import {create} from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'

export const useAuthStore=create((set)=>({
    user:null,
    isAuthenticating:false,
    signupUser:async(userData)=>{
        set({isAuthenticating:true})
        try{
        const response=await axios.post('/api/v1/auth/signup',userData)
        if(response.data.success){
            console.log(response.data?.data)
            toast.success('user created Successfully')
            set({user:response.data?.data})
        }
        }catch(err){
            toast.error(err.response?.data?.error || "signup failed")
            console.log(err)
        }
    },
}))