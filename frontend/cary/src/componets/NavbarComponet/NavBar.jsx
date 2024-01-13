import './Navbar.css'
import caryLogo from '../../assets/cary-logo.png'
import {GrUserSettings} from 'react-icons/gr'
import { Link } from 'react-router-dom'
export default function NavBar({setShowLoginForm,isLogin,globalData,showSideMenu,setShowSideMenu}){
    const AuthHandler = () => {
        setShowLoginForm(true)
    }
    //button for opening and clowsing the side menu 
    const settingMenuBtnHandler = () => {
        if(showSideMenu){
            setShowSideMenu(false)
        }else{
            setShowSideMenu(true)
        }
    }
    return(
        <div className="Navbar">
            <div className="LeftSideContainer">
                <div className='logoContainer'>
                    <img src={caryLogo} className='caryLogo'/>
                </div>
                <div className="NavBtnContainer">
                    <Link to="/">
                       <button className='NavBarBtn'>Home</button> 
                    </Link>
                    
                    {/*
                    <button className='NavBarBtn'>About</button>
                    */}
            </div>
            <h3 className='welcomeHeaderNav'>Cary Rent And Drive</h3>

            </div>
            { !isLogin &&
            <div className="AuthBtnContainer">
                <button className="AuthBtn" onClick={AuthHandler}>Login</button>
                <button className="AuthBtn" onClick={AuthHandler}>Signup</button>
            </div>
            }
            {
                isLogin && 
                <div className='infoContainerNavBar'>
                    <p className='welcomeTitle'>👋 Welcome back <u>{globalData.Name}   </u> </p>
                    <button className='SettingsBtn' onClick={settingMenuBtnHandler} ><GrUserSettings/></button>
                </div>
            }
        </div>
    )
}
// NOTE!!! in this page the Auth container should change when the user logs in 