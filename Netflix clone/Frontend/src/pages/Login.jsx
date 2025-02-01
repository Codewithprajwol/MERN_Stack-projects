
import { useState } from 'react'
import netfilxLogo from '../public/netflix-logo.png'
import { Link } from 'react-router-dom'
const Login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const handleLogin=(e)=>{
    e.preventDefault()
    console.log({email,password})
  }
  return (
    <div className='h-screen w-full home-bg'>
        <header className='max-w-6xl mx-auto flex items-center justify-between p-4 '>
            <Link to={'/'}>
            <img src={netfilxLogo} alt='netflix logo' className='w-52' />
        </Link>
        </header>
        <div className="flex justify-center items-center mt-10 mx-3 ">
            <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md" >
              <h1 className="text-center text-white text-xl font-bold mb-4">Log In</h1>
               <form  className="space-y-4">
                <div>
                    <label htmlFor="Email" className='text-sm font-medium text-gray-300 block'>Email</label>
                    <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="Email" className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md  text-white focus:outline-none focus:ring ' placeholder='you@example.com' />
                </div>
                <div>
                    <label htmlFor="Password" className='text-sm font-medium text-gray-300 block'>Password</label>
                    <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="Password" className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md  text-white focus:outline-none focus:ring ' placeholder='*********' />
                </div>
                <button onClick={(e)=>handleLogin(e)} className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-900 cursor-pointer">Sign Up</button>
               </form>
               <div className="text-center text-gray-400">
                Don't have an account?{" "} <Link to={'/signup'} className='text-red-500 hover:underline hover:underline-offset-4'>Sign In</Link>
               </div>
              </div>
        </div>
    </div>

  )
}

export default Login