import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useContentStore } from "../store/useContentStore"

const WatchPage = () => {
   const{id}= useParams()
   const [trailers,setTrailers]=useState([])
   const[trailersIdx,setTrailerIdx]=useState(0)
   const[isLoading,setIsLoading]=useState(true)
   const[similarContent,setSimilarContent]=useState([])
   const[details,setDetails]=useState(null)
   const[content,setContent]=useState(null)
   const {contentType}=useContentStore()
   
    useEffect(()=>{
        const getContentTrailers=async()=>{
            try{
                const response=await axios.get(`/api/v1/${contentType}/${id}/trailers`)
                setTrailers(response.data.trailers)
            }catch(errr){
                if(errr.message.includes('404')){
                    console.log('No trailers found')
                    setTrailers([])
                }

            }
        }
        getContentTrailers()
    },[contentType,id])

    useEffect(()=>{
        const getSimilarContent=async()=>{
        try{
            const response=await axios.get(`/api/v1/${contentType}/${id}/similars`)
            console.log('similar content',response.data.content)
        }catch(err){
            if(err.message.includes('404')){
                setSimilarContent([])
            }
        }
        }
        getSimilarContent()
    },[contentType,id])
  return (
    <div>WatchPage</div>
  )
}

export default WatchPage