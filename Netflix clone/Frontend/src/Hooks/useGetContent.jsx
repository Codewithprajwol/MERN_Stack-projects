import { useEffect, useState } from "react"
import { useContentStore } from "../store/useContentStore"
import axios from "axios"

export const useGetContent=()=>{
    const {contentType}=useContentStore()
    console.log(contentType)
    const [content,setContent]=useState(null)


    useEffect(()=>{
        const getTrendingContent=async()=>{
            const response=await axios.get(`/api/v1/${contentType}/trending`)
            setContent(response.data.content)
        }
        getTrendingContent()
        
    },[contentType])
    return {content}
}