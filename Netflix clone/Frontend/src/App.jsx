import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Homepage from './pages/Homepage'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'

const App = () => {
   const {authCheckUser,user}=useAuthStore()
   console.log('user',user)
   useEffect(()=>{authCheckUser()},[])

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/' element={<Homepage/>} />
    </Routes>
    <Footer/>
    <Toaster/>
    </>
  )
}
export default App