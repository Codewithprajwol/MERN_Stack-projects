import { useEffect, useState } from "react"
import { useContentStore } from "../store/useContentStore"
import axios from "axios"

export const useGetContent=()=>{
    const {contentType}=useContentStore()
    const [content,setContent]=useState(null)


    useEffect(()=>{
        console.log('parent vetra ko useeffect render')
        const getTrendingContent=async()=>{
            const response=await axios.get(`/api/v1/${contentType}/trending`)
            console.log("Parent useEffect: Data fetched");
            setContent(response.data.content)
        }
        getTrendingContent()
        
    },[contentType])
    return {content}
}