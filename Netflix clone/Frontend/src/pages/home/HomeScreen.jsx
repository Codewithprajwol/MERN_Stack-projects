import { useAuthStore } from "../../store/useAuthStore"

const HomeScreen = () => {
  const logout=useAuthStore((state)=>state.logoutUser)
  return (
    <div>HomeScreen <button onClick={logout}>logout</button></div>
  )
}

export default HomeScreen