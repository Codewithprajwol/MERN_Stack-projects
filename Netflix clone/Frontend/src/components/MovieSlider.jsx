import PropTypes from 'prop-types'
import { useContentStore } from '../store/useContentStore'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GET_SMALLER_URL } from '../utils/constant'
const MovieSlider = ({category}) => {

    const [content,setContent]=useState([])
    
    const contentType=useContentStore((state)=>state.contentType)
    console.log(category,contentType)
    const formattedCategoryName=category.replaceAll('_',' ')[0].toUpperCase()+category.replaceAll('_',' ').slice(1)
    const formattedContentType=contentType==='movie'? 'Movies' :'TV Shows'

    useEffect(()=>{
        console.log(`MovieSlider mounted for category: ${category}`);
        const getContent=async()=>{
            const res=await axios.get(`/api/v1/${contentType}/${category}`)
            console.log(`MovieSlider data fetched for category: ${category}`);
            setContent(res.data.content)
        }
        getContent()
    },[contentType,category])
  return (
    <div className='text-white bg-black relative px-5 md:px-20'>
        <h2 className='mb-4 font-bold text-2xl'>{formattedCategoryName}{" "}{formattedContentType}</h2>
        <div className="flex space-x-4 overflow-x-scroll">
            {content.map((item)=>(<Link key={item.id} to={`/watch/${item.id}`} className='min-w-[250px] relative group'>
            <div className="rounded-lg overflow-hidden">
                <img src={GET_SMALLER_URL+item.backdrop_path} alt="Movie Image" className='transition-transform duration-300 ease-in-out group-hover:scale-125' />
            </div>
            <p className='mt-2 text-center'>{item.title || item.name}</p>
            </Link>))}
        </div>
    </div>
  )
}

MovieSlider.propTypes={
    category:PropTypes.string
}

export default MovieSlider