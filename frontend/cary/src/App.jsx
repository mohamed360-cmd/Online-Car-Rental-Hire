import NavBar from "./componets/NavbarComponet/NavBar"
import Landing from "./componets/LandingPage/Landing"
import { useState } from "react"
import AuthRoot from "./componets/Auth/AuthRoot"
import SettingsMenu from "./componets/SettingsMenu/SettingsMenu"
import {Route, Router,Routes} from 'react-router-dom'
import RentingPage from "./componets/RentingPage/RentingPage"
import Dashboard from "./componets/DashBoard/Dashboard"
import CancelBooking from "./componets/CancelBooking/CancelBooking"
export default function App(){
  const [isLogin,setIsLogin]=useState(false)
  const [showLoginForm,setShowLoginForm]=useState(false)
  const [showSideMenu,setShowSideMenu] = useState(false)
  const [globalData,setGobalData] = useState({})
  return(
    <div className="MainBody" >
    <NavBar showSideMenu={showSideMenu}  setShowSideMenu={setShowSideMenu}setIsLogin={setIsLogin} isLogin={isLogin} showLoginForm={showLoginForm} setShowLoginForm={setShowLoginForm} globalData={globalData}/>
    { showSideMenu && <SettingsMenu setShowSideMenu={setShowSideMenu} setIsLogin={setIsLogin}/>}
    { showLoginForm && <AuthRoot setShowLoginForm={setShowLoginForm} setIsLogin={setIsLogin} setGobalData={setGobalData}/> }
    <Routes>
      <Route path="/" element={    <Landing setIsLogin={setIsLogin} isLogin={isLogin} showLoginForm={showLoginForm} setShowLoginForm={setShowLoginForm} globalData={globalData}/>
}/>
<Route path="/Rent" element={<RentingPage setShowLoginForm={setShowLoginForm} isLogin={isLogin} globalData={globalData} />} />
<Route path="/DashBoard" element={<Dashboard isLogin={isLogin} setShowLoginForm={setShowLoginForm}  globalData={globalData}/>}/>
<Route path="/Cancel" element={<CancelBooking/>}/>
    </Routes>
    </div>
  )
}