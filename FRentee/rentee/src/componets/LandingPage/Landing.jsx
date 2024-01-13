import { useState } from "react"
import "./LandingPage.css"
import {IoCreateOutline} from "react-icons/io5"
import {FaCarSide,FaS,FaTicket} from "react-icons/fa6"
import Create from "./Create"
import MyBookedCars from "./MyBookedCars"
import MyListings from "./MyListings"
import CancelPage from "./CancelPage"
import {ImCancelCircle} from "react-icons/im"
export default function Landing({userGlobalData,setIsUserlogedIn}){
    const [createTabActive ,setCreateTabActive] = useState(true)
    const [bookedCarsTabActive,setBookedCarsTabActive] = useState(false)
    const [MyListingsTabActive ,setMyListingTabActive] = useState(false)
    const [cancelTabActive,setCancelTabActive] = useState(false)
    const AddCarTabHandler = ()=>{
        setCreateTabActive(true)
        setBookedCarsTabActive(false)
        setMyListingTabActive(false)
        setCancelTabActive(false)
    }
    const MyListingsHandler = ()=>{
        setCreateTabActive(false)
        setBookedCarsTabActive(false)
        setMyListingTabActive(true)
        setCancelTabActive(false)
    }
    const bookedCarsHandler = ()=>{
        setCreateTabActive(false)
        setBookedCarsTabActive(true)
        setMyListingTabActive(false)
        setCancelTabActive(false)

    }
    const cancelCarList = ()=>{
        setCreateTabActive(false)
        setBookedCarsTabActive(false)
        setMyListingTabActive(false)
        setCancelTabActive(true)
    }
    const logoutFunction = ()=>{
        setIsUserlogedIn(false)
    }

    return(
        <div className="MainLandingContainer">
            <div className="Navbar">
                <div className="logoAndNameDiv">
                    <img src="../../../src/assets/cary-logo.png" alt="Cary Logo" className="CaryLogo"/>
                    <h2 className="title">Cary for Rentors</h2>                   
                </div>

                <button className="LogOutBtn" onClick={logoutFunction}>Logout</button>
            </div>
            <div className="MainContentContainer">
            <div className="SideContainer">
                <button className={createTabActive ? "Active Tab" : "InActive Tab"} onClick={AddCarTabHandler}> <IoCreateOutline  color="white"/>Add Car</button>
                <button className={MyListingsTabActive ? "Active Tab" : "InActive Tab"} onClick={MyListingsHandler}><FaCarSide color="white" />My Listing</button>
                <button className={bookedCarsTabActive  ? "Active Tab" : "InActive Tab"} onClick={bookedCarsHandler}><FaTicket color="white"/>Cars Booked</button>
                <button className={cancelTabActive  ? "Active Tab" : "InActive Tab"} onClick={cancelCarList}><ImCancelCircle color="white"/>Canceled List</button>
            </div>
                <div className="ContentContainer">
                    {createTabActive && <Create userGlobalData={userGlobalData}/>}
                    {bookedCarsTabActive && <MyBookedCars userGlobalData={userGlobalData}/>}
                    {MyListingsTabActive && <MyListings setCreateTabActive={setCreateTabActive} setMyListingTabActive={setMyListingTabActive} userGlobalData={userGlobalData}/>}
                    {cancelTabActive && <CancelPage userGlobalData={userGlobalData}/>}
                </div>
                
            </div>
        </div>
    )
}