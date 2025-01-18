import { fetchfromtmdb } from "../services/tmdb.service.js";

export const getTrendingMovies=async(req,res)=>{
try{
  const data= await fetchfromtmdb('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
  const randomMovie=data.results[Math.floor(Math.random()*data.results?.length)]

  res.status(200).json({success:true,content:randomMovie})

}catch(error){
    console.log('error in getTrendingMovies',error.message)
  res.status(500).json({error:'internal server error'})

} 
}

export const getMovieTrailers=async(req,res)=>{
    const {id}=req.params;
    try{
    const data=await fetchfromtmdb(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
    console.log(data)
    res.status(200).json({success:true,trailers:data.results})
    }catch(err){
     if(err.message.includes('404')){
       return res.status(404).send(null)
    }
     res.status(500).json({success:false,error:'internal server error'})

     }
}

export 