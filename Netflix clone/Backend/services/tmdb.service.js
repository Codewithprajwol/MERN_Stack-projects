import { ENV_VAR } from "../config/env.config.js";
import axios from 'axios'

export const fetchfromtmdb=async(url)=>{

    const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer '+ ENV_VAR.tmdb_api_key,
        }
      };
      
    const response=await axios.get(url,options)
    if(response.status!==200){
        throw new Error('Failed to fetch data from TMDB'+response.status);  
    }
    return response.data;
}
