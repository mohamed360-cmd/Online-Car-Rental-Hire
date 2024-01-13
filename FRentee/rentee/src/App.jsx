import { useState } from "react"
import AuthMain from "./componets/Auth/AuthMain"
import Landing from "./componets/LandingPage/Landing"
export default function App(){
  const [isUserLogedIn,setIsUserlogedIn] = useState(false)
  const [userGlobalData ,setUserGlobalData] = useState({})
  return (
    <>
    {
     !isUserLogedIn && <AuthMain setIsUserlogedIn={setIsUserlogedIn} setUserGlobalData={setUserGlobalData}/>
    }
    {
      isUserLogedIn && <Landing  setIsUserlogedIn={setIsUserlogedIn} userGlobalData={userGlobalData}/>
    }
    </>
  )
}