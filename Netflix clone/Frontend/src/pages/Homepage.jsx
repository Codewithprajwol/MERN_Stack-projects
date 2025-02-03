import { useAuthStore } from "../store/useAuthStore";
import AuthScreen from "./home/AuthScreen";
import HomeScreen from "./home/HomeScreen"

const Homepage = () => {
     const {user}=useAuthStore()
  return (
      user ? <HomeScreen />:<AuthScreen/>
  )
}

export default Homepage