import { Link } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { Info, Play } from "lucide-react"

const HomeScreen = () => {
  return (
    <>
    <div className="relative w-full h-screen text-white">
      <Navbar />
      <img src="./extraction.jpg" alt="extraction Image" className="absolute top-0 left-0 w-full h-full object-cover -z-50" />
      <div className="absolute top-0 left-0 h-full bg-black/45 w-full -z-50 " aria-hidden="true"></div> 
       <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
        <div className="absolute top-0 left-0 bg-gradient-to-b from-black via-transparent to-transparent -z-10 w-full h-full"></div>
        <div className="max-w-2xl">
          <h1 className="font-extrabold mt-4 text-6xl text-white text-balance">Extraction</h1>
          <p className="mt-2 text-lg">2014 |18+</p>
          <p className="mt-4 text-lg">Chris Hemsworth stars in this nonstop action-thiller with Rudhraksh Jaiswal, Randeep hooda and Golshifteh Farahani.</p>
        </div>
        <div className="flex mt-8 ">
          <Link to="/watch/123" className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center"><Play className="size-6 fill-black mr-2"/>play</Link>

          <Link to="/watch/123" className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center"><Info className="size-6 mr-2"/>More info</Link>
        </div>
      </div>

    </div>
    <div></div>
    </>
  )
}

export default HomeScreen