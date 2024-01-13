import {MdOutlineSpaceDashboard} from 'react-icons/md'
import {VscAccount} from 'react-icons/vsc'
import {TbLogout2} from "react-icons/tb"
import { NavLink } from 'react-router-dom'
import "./Settings.css"
export default function SettingsMenu({setShowSideMenu,setIsLogin}){
    const logOutHandler = () =>{
        setShowSideMenu(false)
        setIsLogin(false)
    }
    return(
        <div className="SettingMenu">
            <NavLink to="/DashBoard" onClick={()=>setShowSideMenu(false)}>
                <button className="menuBtn"> <MdOutlineSpaceDashboard/> <span>DashBoard</span> </button>
            </NavLink>
            
            <button className="menuBtn" onClick={logOutHandler}> <TbLogout2/>  <span>Logout</span></button>
            <button className="CloseMenuBtn" onClick={()=>setShowSideMenu(false)}>X</button>
        </div>
    )
}