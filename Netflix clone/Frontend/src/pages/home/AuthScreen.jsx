import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
const AuthScreen = () => {
  // console.log(vid)
  const [email, setEmail] = useState("");
  return (
    <div className="home-bg m-h-screen w-full relative">
      {/* navbar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img src='./netflix-logo.png' alt="netflixLogo" className="w-32 md:w-52" />
        <NavLink
          to={"/login"}
          className="text-white bg-red-600 py-1 px-2 rounded"
        >
          Sign In
        </NavLink>
      </header>
      {/* hero-section */}
      <div className="flex items-center justify-center flex-col text-center py-40 max-w-6xl mx-auto text-white">
        <div className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited movies, Tv shows, and more
        </div>
        <p className="text-lg mg-4">Watch anywhre. Cancel anytime.</p>
        <p className="mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        <form className="flex flex-col md:flex-row gap-4 w-1/2">
          <input
            type="email"
            name="email"
            id="Email"
            placeholder="Email address"
            value={email}
            className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-red-600 text-xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
            Get Started <ChevronRight />
          </button>
        </form>
      </div>
      {/* seperator */}
      <div className="h-2 w-full bg-[#232332] aria-hidden:'true'"></div>

      {/* 1st section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center flex-col md:flex-row  px-4 md:px-2">
          {/* left side */}
          <div className="flex-1">
            <div className="text-4xl md:text-5xl font-extrabold mb-4">
              Enjoy on your Tv
            </div>
            <p className="text-lg md:text-xl">
              Watch on Smart Tvs, PlayStation, Xbox, ChromeCast, Apple Tv,
              Blu-ray players, and more.
            </p>
          </div>
          {/* right side */}
          <div className="flex-1 relative">
            <img src='./tv.png' alt="tvImage" className="mt-4 z-20 relative" />
            <video playsInline autoPlay={true} muted loop className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10">
              <source src='./hero-vid.m4v' type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
         {/* seperator */}
         <div className="h-2 w-full bg-[#232332] aria-hidden:'true'"></div>

         {/* section-2 */}
         
    </div>
  );
};

export default AuthScreen;
