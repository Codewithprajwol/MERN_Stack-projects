import { useAuthStore } from "../store/useAuthStore";
import AuthScreen from "./home/AuthScreen";
import HomeScreen from "./home/HomeScreen"

const Homepage = () => {
     console.log('ma ka kai chalyaa')
     const {user}=useAuthStore()
     console.log(user)
  return (
      user ? <HomeScreen />:<AuthScreen/>
  )
}

export default Homepage