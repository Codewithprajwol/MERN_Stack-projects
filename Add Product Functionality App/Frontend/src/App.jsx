import { Box } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Createpage from './pages/Createpage'
import NavBar from './components/NavBar'
import { useColorModeValue } from './components/ui/color-mode'
import { Toaster } from './components/ui/toaster'

const App = () => {
  return (
   <Box minH={"100vh"} bg={useColorModeValue("gray.100","gray.900")}>
    <NavBar />
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/create' element={<Createpage />}></Route>
    </Routes>
    <Toaster />
   </Box>

  )
}

export default App