import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Homepage from './pages/Homepage'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'

const App = () => {
   const {authCheckUser,isAuthenticating,user}=useAuthStore()
   useEffect(()=>{authCheckUser()},[authCheckUser])

  if(isAuthenticating){
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center bg-black h-full">
        <Loader className='animate-spin text-red-600 size-10' />
      </div>
    </div>
  )
  }

  return (
    <>
    <Routes>
      <Route path='/login' element={!user?<Login/>:<Navigate to={'/'}/>} />
      <Route path='/signup' element={!user?<Signup/>:<Navigate to={'/'}/>} />
      <Route path='/' element={<Homepage/>} />
    </Routes>
    <Footer/>
    <Toaster/>
    </>
  )
}
export default App