import { useState } from "react"
import Navbar from "../components/Navbar"
import { useContentStore } from "../store/useContentStore"
import {Search } from "lucide-react"
import axios from "axios"
import toast from "react-hot-toast"
import { GET_ORIGINAL_URL } from "../utils/constant"
import { Link } from "react-router-dom"

const SearchPage = () => {
  const[activeTab,setActiveTab]=useState('movie')
  const [results,setResults]=useState([])
  const [searchTerm,setSearchTerm]=useState('')
  const {setContentType}=useContentStore()

  const handleTabClick=(tab)=>{
    setActiveTab(tab)
    setContentType(tab==='movie'?'movie':"tv")
    setResults([])
  }
  const handleSearch=async(e)=>{
    e.preventDefault()
    try {
      const response=await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`)
      // setTimeout(() => {
      //   setResults(['mere juta japani'])
      //   console.log(results)  // This will be []
      // }, 3000)  //
      setResults(response.data.data)
    } catch (error) {
      if(error.response.status=='404'){
        toast.error("Nothing found, make sure you are searching under the right category")
      }else{
        toast.error("An error occured, please try again later")
      }
      
    }
  }
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar/>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button className={`py-2 px-4  cursor-pointer  rounded ${activeTab==="movie"?"bg-red-600":"bg-gray-800"} hover:bg-red-700`} onClick={()=>handleTabClick('movie')}>Movies</button>
          <button className={`py-2 px-4  cursor-pointer  rounded ${activeTab==="tv"?"bg-red-600":"bg-gray-800"} hover:bg-red-700`} onClick={()=>handleTabClick('tv')}>Tv Shows</button>
          <button className={`py-2 px-4   cursor-pointer rounded ${activeTab==="person"?"bg-red-600":"bg-gray-800"} hover:bg-red-700`} onClick={()=>handleTabClick('person')}>Person</button>
        </div>
        <form onSubmit={handleSearch} className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto">
          <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder={"Search for a "+activeTab} className="w-full p-2 rounded bg-gray-800 text-white" />
          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded cursor-pointer">
            <Search className="size-6"/>
          </button>
        </form>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result)=>{
            if(!result.poster_path && !result.profile_path )return null;

            return (<div key={result.id} className="bg-gray-800 p-4 rounded">
               {activeTab==='person'?(<Link to={"/actor/"+result.name} >
               <img src={GET_ORIGINAL_URL+result.profile_path} alt={result.name} className="max-h-96 rounded mx-auto" />
               <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
               </Link>):(<Link to={"/watch/"+result.id} >
               <img src={GET_ORIGINAL_URL+result.poster_path} alt={result.title || result.name} className="w-full h-auto rounded " />
               <h2 className="mt-2 text-xl font-bold">{result.name || result.title}</h2>
               </Link>)}
            </div>)
                      })}
         </div>
      </div>
    </div>
  )
}

export default SearchPage