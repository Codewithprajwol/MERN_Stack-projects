import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Homepage from './pages/Homepage'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import WatchPage from './pages/WatchPage'
import Historypage from './pages/Historypage'
import SearchPage from './pages/SearchPage'
import PageNotFound from './pages/404'

const App = () => {
   const {authCheckUser,isAuthenticating,user}=useAuthStore()
   useEffect(()=>{authCheckUser()},[authCheckUser])

  if(isAuthenticating){
  return (
    <div className="h-screen w-full home-bg">
      <div className="flex justify-center items-center w-full h-full">
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
      <Route path='/watch/:id' element={user?<WatchPage/>:<Login/>} />
      <Route path='/' element={<Homepage/>} />
      <Route path='/history' element={user?<Historypage/>:<Login/>} />
      <Route path='/search' element={user?<SearchPage/>:<Navigate to={'/login'}/>}/>
      <Route path='/*' element={<PageNotFound/>}/>
    </Routes>
    <Footer/>
    <Toaster/>
    </>
  )
}
export default App