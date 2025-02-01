import AuthScreen from "./home/AuthScreen";
import HomeScreen from "./home/HomeScreen"

const Homepage = () => {
  const user=false;
  return (
      {user ? <HomeScreen />:<AuthScreen/>}
  )
}

export default Homepage