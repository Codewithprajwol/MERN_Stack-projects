import PropTypes from 'prop-types'
import { useContentStore } from '../store/useContentStore'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GET_SMALLER_URL } from '../utils/constant'
import { ChevronLeft, ChevronRight } from 'lucide-react'
const ContentSlider = ({category}) => {

    const [content,setContent]=useState([])
    const [arrowShow,setArrowShow]=useState(false)
    const sliderRef=useRef(null)


   const scrollLeft=()=>{
        if(sliderRef.current){
            sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth,behavior:'smooth'})
        }
    }

    const scrollRight=()=>{
        console.log(sliderRef.current.offsetWidth)
        if(sliderRef.current){
            sliderRef.current.scrollBy({left:sliderRef.current.offsetWidth,behavior:'smooth'})
    }
    }
    
    const contentType=useContentStore((state)=>state.contentType)
    const formattedCategoryName=category.replaceAll('_',' ')[0].toUpperCase()+category.replaceAll('_',' ').slice(1)
    const formattedContentType=contentType==='movie'? 'Movies' :'TV Shows'

    useEffect(()=>{
        const getContent=async()=>{
            const res=await axios.get(`/api/v1/${contentType}/${category}`)
            setContent(res.data.content)
        }
        getContent()
    },[contentType,category])
    console.log(content)
  return (
    <div className='text-white bg-black relative px-5 md:px-20' onMouseEnter={()=>setArrowShow(true)} onMouseLeave={()=>setArrowShow(false)}>
        <h2 className='mb-4 font-bold text-2xl'>{formattedCategoryName}{" "}{formattedContentType}</h2>
        <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
            {content.map((item)=>{
                if(item.backdrop_path==null) return
               return  <Link key={item.id} to={`/watch/${item.id}`} className='min-w-[250px] relative group'>
            <div className="rounded-lg overflow-hidden">
                <img src={GET_SMALLER_URL+item.backdrop_path} alt="Movie Image" className='transition-transform duration-300 ease-in-out group-hover:scale-125' />
            </div>
            <p className='mt-2 text-center'>{item.title || item.name}</p>
            </Link>})}
        </div>
        {arrowShow && (
            <>
            <button onClick={scrollLeft} className='absolute left-0 md:left-20 top-1/2 -translate-y-1/2 flex items-center justify-center size-12 rounded-full bg-red-500/50 hover:bg-opacity-75 text-white z-10 cursor-pointer'>
                <ChevronLeft/>
            </button>
            <button onClick={scrollRight} className='absolute right-0 md:right-20 top-1/2 -translate-y-1/2 flex items-center justify-center size-12 rounded-full bg-red-500/50 bg-opacity-50 hover:bg-opacity-75 text-white z-10 cursor-pointer'>
                <ChevronRight/>
            </button>
            </>
        )}
    </div>
  )
}

ContentSlider.propTypes={
    category:PropTypes.string
}

export default ContentSlider