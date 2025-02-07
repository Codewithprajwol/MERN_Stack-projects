import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useContentStore } from "../store/useContentStore";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from 'react-player'
import { GET_ORIGINAL_URL, GET_SMALLER_URL } from "../utils/constant";
import WatchSkeleton from "../components/skeletons/WatchSkeleton";
import { formatReleaseDate } from "../utils/formatReleaseDate";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [trailersIdx, setTrailerIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [similarContent, setSimilarContent] = useState([]);
  const [contentDetails, setContentDetails] = useState(null);
  const { contentType } = useContentStore();
  const sliderRef=useRef(null)
  
 
  const handleNext=()=>{
      if(trailersIdx<trailers.length-1) setTrailerIdx(trailersIdx+1)
      }

    const handlePrev=()=>{
        if(trailersIdx===0)return 
        setTrailerIdx(trailersIdx-1)
    }
    
    useEffect(() => {
        const getContentTrailers = async () => {
            try {
                const response = await axios.get(
                    `/api/v1/${contentType}/${id}/trailers`
                );
                setTrailers(response.data.trailers);
            } catch (errr) {
                if (errr.message.includes("404")) {
                    console.log("No trailers found");
                    setTrailers([]);
                }
            }finally{
              setIsLoading(false)
            }
        };
        getContentTrailers();
    }, [contentType, id]);


  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/similars`
        );
        setSimilarContent(response.data.content)
      } catch (err) {
        if (err.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/details`
        );
        setContentDetails(response.data.content);
      } catch (err) {
        if (err.message.includes("404")) {
          setContentDetails(null);
        }
      }
    };
    getContentDetails();
  }, [contentType, id]);


  if(isLoading){
    return (<div className="min-h-screen bg-black p-10">
      <WatchSkeleton />
    </div>)
  }

     const scrollLeft=()=>{
          console.log(sliderRef.current.offsetWidth)
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

  return (
    <div className="min-h-screen w-full text-white bg-black">
      <div className="container mx-auto px-4 py-4 h-full">
        <Navbar />
        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4 mt-4">
            <button onClick={handlePrev}
              disabled={trailersIdx === 0}
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                trailersIdx === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            <button onClick={handleNext}
              disabled={trailersIdx === trailers.length - 1}
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                trailersIdx === trailers.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        {/* //? ReactPlayer */}
        <div className="aspect-video mb-8 lg:mb-0 p-2 sm:px-10 md:px-32">
            {trailers.length>0?(
               <ReactPlayer controls={true} width={"100%"} height={"70vh"} className="mx-auto overflow-hidden rounded-lg" url={`https://www.youtube.com/watch?v=${trailers[trailersIdx].key}`} /> 
            ):(
                <h2 className="text-xl text-center mt-5">No trailers available for {" "} <span className="font-bold text-red-600">{contentDetails?.title || contentDetails?.name} 😥</span></h2>
            )}

        </div>
        {/* //? movie details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-5xl mx-auto">
        <div className="mb-4 md:mb-0 text-left">
            <h2 className="text-5xl font-bold text-balance">{contentDetails?.title|| contentDetails?.name}</h2>
            <p className="mt-2 text-lg">
                {formatReleaseDate(contentDetails?.release_date || contentDetails?.first_air_date)} | {" "}{
                    contentDetails?.adult?(<span className="text-red-600">18+</span>):(<span className="text-green-600">PG-13</span>)
                }

            </p>
            <p className="mt-4 text-lg">{contentDetails?.overview}</p>
        </div>
        <img src={GET_ORIGINAL_URL+contentDetails?.poster_path} alt="Poster Image" className="max-h-[600px] rounded-md" />
        </div>
        {/* //? similar content */}
        {similarContent.length >0 &&
           (<div className="mt-12 max-w-5xl mx-auto relative" >
            <h3 className="text-3xl mb-4">
               {contentType==="movie"?'Similar Movies':'Similar Tv Shows'}
            </h3>
            <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
            {similarContent.map((item)=>{
              if(item.backdrop_path==null) return 
              return <Link key={item.id} to={`/watch/${item.id}`} className='min-w-[250px] relative group'>
            <div className="rounded-lg overflow-hidden">
                <img src={GET_SMALLER_URL+item.backdrop_path} alt="Movie Image" className='transition-transform duration-300 ease-in-out group-hover:scale-125' />
            </div>
            <p className='mt-2 text-center'>{item.title || item.name}</p>
            </Link>})}
        </div>
        <>
            <button onClick={scrollLeft} className='absolute left-0 md:left-5 top-1/2 -translate-y-1/2 flex items-center justify-center size-12 rounded-full bg-red-500/70 text-white z-10 cursor-pointer'>
                <ChevronLeft/>
            </button>
            <button onClick={scrollRight} className='absolute right-0 md:right-5 top-1/2 -translate-y-1/2 flex items-center justify-center size-12 rounded-full bg-red-500/70 text-white z-10 cursor-pointer'>
                <ChevronRight/>
            </button>
            </>

           </div>) 
        }
    
      </div>
    </div>
  );
};

export default WatchPage;
