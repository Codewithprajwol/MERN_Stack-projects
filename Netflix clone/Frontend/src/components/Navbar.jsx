import { useState } from 'react'
import { NavLink} from 'react-router-dom'
import {LogOut, Menu, Search} from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore';
import { useContentStore } from '../store/useContentStore';

const Navbar = () => {
   const {setContentType}=useContentStore()
    const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false);
    const toggleMobileMenu=()=>setIsMobileMenuOpen(!isMobileMenuOpen)

    const {user,logoutUser}=useAuthStore()
    
  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4  m-h-20'>
        <div className="flex items-center gap-10 z-50">
           <NavLink to={"/"}>
           <img src="./netflix-logo.png" alt="Netflix logo" className='w-32 sm:w-40' />
           </NavLink>
           {/*desktop navbar items */}
           <div className='hidden sm:flex gap-4 items-center'>
            <NavLink to={'/'} className="hover:underline hover:underline-offset-5 hover:text-red-500 transition-colors duration-200" onClick={()=>setContentType('movie')}>Movies</NavLink>
            <NavLink to={'/'} className="hover:underline hover:underline-offset-5 hover:text-red-500 transition-colors duration-200" onClick={()=>setContentType('tv')}>Tv Shows</NavLink>
            <NavLink to={'/history'} className="hover:underline hover:underline-offset-5 hover:text-red-500 transition-colors duration-200">History</NavLink>
           </div>
        </div>
           <div className="flex gap-3 items-center z-50">
            <NavLink to={"/search"}>
            <Search className='size-6 cursor-pointer' />
            </NavLink>
            <img src={user.image} alt="Avatar" className='h-8 rounded cursor-pointer ' />
            <LogOut className='size-6 cursor-pointer' onClick={logoutUser}/>
            <Menu className='sm:hidden cursor-pointer' onClick={toggleMobileMenu}/>
           </div>
      {/* mobile navbar items */}
         {isMobileMenuOpen && (
            <div className='w-full  sm:hidden mt-4 z-50 bg-black border rounded border-gray-700'>
                <NavLink to={'/'} className='block hover:underline p-2' onClick={toggleMobileMenu}>Movies</NavLink>
                <NavLink to={'/'} className='block hover:underline p-2' onClick={toggleMobileMenu}>Tv Shows</NavLink>
                <NavLink to={'/history'} className='block hover:underline p-2' onClick={toggleMobileMenu}>History</NavLink>
            </div> 
         )}
    </header>
  )
} 

export default Navbar