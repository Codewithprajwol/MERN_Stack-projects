import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

const Signup = () => {
    const {searchParams}=new URL(window.location)
    const urlEmail=searchParams.get('email')
    
    const navigate=useNavigate()

    //? from zustand
  const {signupUser,user}=useAuthStore()
  console.log(user)
  
    const[email,setEmail]=useState(urlEmail || '')
    const[password,setPassword]=useState('')
    const[username,setUsername]=useState('')

    const handleSignup=(e)=>{
        e.preventDefault()
        const user=signupUser({email,password,username})
        if(user)
        {
          navigate('/')
        }
    }

  return (
    <div className='h-screen w-full home-bg'>
        <header className='max-w-6xl mx-auto flex items-center justify-between p-4 '>
            <Link to={'/'}>
            <img src='./netflix-logo.png' alt='netflix logo' className='w-52' />
        </Link>
        </header>
        <div className="flex justify-center items-center mt-10 mx-3 ">
            <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md" >
              <h1 className="text-center text-white text-xl font-bold mb-4">Sign Up</h1>
               <form  className="space-y-4">
                <div>
                    <label htmlFor="Email" className='text-sm font-medium text-gray-300 block'>Email</label>
                    <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="Email" className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md  text-white focus:outline-none focus:ring ' placeholder='you@example.com' />
                </div>
                <div>
                    <label htmlFor="Username" className='text-sm font-medium text-gray-300 block'>Username</label>
                    <input type="username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} id="Username" className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md  text-white focus:outline-none focus:ring ' placeholder='prajwolstha' />
                </div>
                <div>
                    <label htmlFor="Password" className='text-sm font-medium text-gray-300 block'>Password</label>
                    <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="Password" className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md  text-white focus:outline-none focus:ring ' placeholder='*********' />
                </div>
                <button onClick={(e)=>handleSignup(e)} className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-900 cursor-pointer">Sign Up</button>
               </form>
               <div className="text-center text-gray-400">
                Already a member?{" "} <Link to={'/login'} className='text-red-500 hover:underline hover:underline-offset-4'>Sign In</Link>
               </div>
              </div>
        </div>
    </div>

  )
}

export default Signup