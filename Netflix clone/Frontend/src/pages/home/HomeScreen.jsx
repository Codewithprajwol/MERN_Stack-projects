import { Link } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { Info, Play } from "lucide-react"
import { useGetContent } from "../../Hooks/useGetContent"
import { GET_ORIGINAL_URL, MOVIE_CATEGORIES, TV_CATEGORIES } from "../../utils/constant"

import { useContentStore } from "../../store/useContentStore"
import { useState } from "react"
import ContentSlider from "../../components/ContentSlider"

const HomeScreen = () => {
     const {content}=useGetContent()
     const {contentType}=useContentStore()
     const [imageLoading,setImageLoading]=useState(true)

     if(!content){
      return (<div className="h-screen w-full text-white relative">
        <Navbar />  
        <div className="absolute top-0 left-0 w-full h-full  items-center justify-center shimmer">

        </div>
      </div>)
     }
     
  return (
    <>
    <div className="relative w-full h-screen text-white">
      <Navbar />
      <img onLoad={()=>setImageLoading(false)} src={GET_ORIGINAL_URL+`${content?.backdrop_path}`} alt="extraction Image" className="absolute top-0 left-0 w-full h-full object-cover -z-50" />
      <div className="absolute top-0 left-0 h-full bg-black/45 w-full -z-50 " aria-hidden="true"></div> 
       <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
        <div className="absolute top-0 left-0 bg-gradient-to-b from-black via-transparent to-transparent -z-10 w-full h-full"></div>
        <div className="max-w-2xl">
          <h1 className="font-extrabold mt-4 text-6xl text-white text-balance">{content?.name || content?.title}</h1>
          <p className="mt-2 text-lg">{`${content?.first_air_date? content.first_air_date.split('-')[0]:content?.release_date?content.release_date.split('-')[0]:'2000'} | ${content?.adult?'18+':'PG-13'}`}</p>
          <p className="mt-4 text-lg">{content?.overview && content?.overview.length>250?content.overview.slice(0,200)+'...':content?.overview}</p>
        </div>
        <div className="flex mt-8 ">
          <Link to="/watch/123" className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center"><Play className="size-6 fill-black mr-2"/>play</Link>
          <Link to="/watch/123" className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center"><Info className="size-6 mr-2"/>More info</Link>
        </div>
      </div>

    </div>
    <div className="flex flex-col gap-10 py-10 w-full bg-black text-white ">
  {contentType==='movie'?(MOVIE_CATEGORIES.map((category)=><ContentSlider key={category} category={category}/>)):(TV_CATEGORIES.map((category)=><ContentSlider key={category} category={category}/>))}
    </div>
    </>
  )
}

export default HomeScreen