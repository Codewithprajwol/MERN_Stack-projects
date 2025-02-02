import {create} from 'zustand'
import axios from 'axios'

const Axios=axios.create({
    baseURL:'http://localhost:3000'
})

export const useAuthStore=create((set)=>({
    user:null,
    isAuthenticating:false,
    signupUser:(userData)=>{
        set({isAuthenticating:true})
        const response=Axios.post('/api/v1/auth/signup',userData)
        console.log(response)
     
    },


}))