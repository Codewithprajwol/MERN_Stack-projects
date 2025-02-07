import User from "../models/user.model.js";
import { fetchfromtmdb } from "../services/tmdb.service.js";

export const searchMovies = async (req, res) => {
  try {
    const query = req.params.query;
    
    const data=await fetchfromtmdb(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
    if (data.results?.length === 0) {
      return res.status(404).send(null);
    }

    const user=await User.findById({_id:req.user._id})

    const userSearchData=user.searchHistory.filter((singleData)=>singleData.id==data.results[0].id)
    if(userSearchData.length===0){
    await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: data.results[0].id,
            image: data.results[0].poster_path,
            title:data.results[0].title,
            searchType: "movie",
            createdAt: new Date(),
          },
        },
      });
    }
    res.status(200).json({ success: true, data: data.results });
  } catch (err) {
    console.log("error in searchPerson controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchPerson = async (req, res) => {
  try {
    const query = req.params.query;
    const data=await fetchfromtmdb(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
    if (data.results?.length === 0) {
      return res.status(404).send(null);
    }
    const user=await User.findById({_id:req.user._id})
 const userSearchData=user.searchHistory.filter((singleData)=>singleData.id==data.results[0].id)
        if(userSearchData.length===0){
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          name: data.results[0].profile_path,
          title:data.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });
  }
  
    res.status(200).json({ success: true, data: data.results });
  } catch (err) {
    console.log("error in searchPerson controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchTv = async (req, res) => {
  try {
    const query = req.params.query;
       const data=await fetchfromtmdb(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
    if (data.results?.length === 0) {
      return res.status(404).send(null);
    }
    const user=await User.findById({_id:req.user._id})

    const userSearchData=user.searchHistory.filter((singleData)=>singleData.id==data.results[0].id)
    if(userSearchData.length===0){
    await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: data.results[0].id,
            image: data.results[0].poster_path,
            title:data.results[0].name,
            searchType: "tvShow",
            createdAt: new Date(),
          },
        },
      });
    }
    res.status(200).json({ success: true, data: data.results });
  } catch (err) {
    console.log("error in searchPerson controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSearchHistory = async (req, res) => {
    try{
    res.status(200).json({ success: true, data: req.user.searchHistory });
    }catch(err){
        console.log('error in getSearchHistory controller',err.message)
        res.status(500).json({error:'Internal Server Error'})
    }
}

export const removeItemFromSearchHistory = async (req, res) => {
    try{
        const {id}=req.params;
        const idx=parseInt(id)
      await User.findByIdAndUpdate(req.user._id,{
        $pull:{
            searchHistory:{id:idx}
        }
      });
        res.status(200).json({success:true,message:'Item removed from search history'})
    }catch(err){
        console.log('error in removeItemFromSearchHistory controller',err.message)
        res.status(500).json({error:'Internal Server Error'})
    }
}
