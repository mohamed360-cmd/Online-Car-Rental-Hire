import {VscAccount} from 'react-icons/vsc'
import {AiOutlineCar} from 'react-icons/ai'
import { useEffect, useState } from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom'
export default function Dashboard ({isLogin,setShowLoginForm,globalData}){
    const [showProfileView,setShowProfileView] = useState(true)
    const [ showBookingView ,setShowBookingsView] = useState(false)
    const [listOfMyBookings, setListOfMyBookings] = useState([])
    
    /* 
            {
            Email : "Test@gmail.com",
            vehicleId : "123TestCarId",
            PickUpDate : "2023-10-11",
            PickUpLocation : "Nairobi West Hospital",
            DropOffDate : "2023-10-13",
            DropOffLocation : "Nairobi West Hospital",
            NoOfDaysBooked : "3",
            PricePerDay : "2000",
            TotalPrice : "6000",
        },
    */
    const ProfileTileHandler =()=>{
        if(!showProfileView){
            setShowProfileView(true)
            setShowBookingsView(false)
        }
    }
    const bookingTileHandler = ()=>{
            setShowBookingsView(true)
            setShowProfileView(false)
        }
    
    const [emailValue,setEmailValue] = useState(globalData.Email)
    const [ nameValue, setNameValue] = useState(globalData.Name)
    const [phoneNumber, setPhoneNumber] = useState(globalData.PhoneNumber)
    const [ShowNoBookingsMsg,setShowNoBookingsMsg] = useState(false)
    const [enableEdit,setEnableEdit] = useState(false)
    const editBtnHandler = ()=>{
        setEnableEdit(true)
    }//this function gets the listings of my bookinngs 
    const getMyBookings = async(emailValue)=>{
        try {
            const res = await fetch("http://localhost:8080/myRentalBooking",{
                method : "POST",
                headers : {"content-type": "application/json"},
                body : JSON.stringify({emailValue :emailValue})
            })
            const data = await res.json()
            if(data.status){
                setListOfMyBookings(data.myBookingsData)
                setShowNoBookingsMsg(false)
                console.log(data.myBookingsData)
            }else{
                setShowNoBookingsMsg(true)
            }
        } catch (error) {
            console.log()
        }
    }
    useEffect(()=>{
        console.log("Acttive")
        getMyBookings(globalData.Email)
    },[])
    return(
        <div className="MainDashBoardBody">
        
        <div className="sideMenu">
            <div className={showProfileView ? "Active Tile" : "InActive Tile"} onClick={ProfileTileHandler}><VscAccount />Profile</div>
            <div className= {showBookingView ? "Active Tile" : "InActive Tile"} onClick={bookingTileHandler}><AiOutlineCar/>Bookings</div>
        </div>
        <div className="DashBoardDetailsContainer">
        {
            showProfileView && <div className='ProfileDispayContainer'> 
                <div className='ProfileEditForm'>
                    <input type='text' placeholder={emailValue} className='editFields' onChange={e=>setEmailValue(e.target.value)} disabled={!enableEdit}/>
                    <br/>
                    <input type='text' placeholder={nameValue}  className='editFields' onChange={e=>setNameValue(e.target.value)} disabled={!enableEdit}/>
                    <br/>
                    <input type='text' placeholder={phoneNumber}  className='editFields' onChange={e=>setPhoneNumber(e.target.value)} disabled={!enableEdit}/>
                    <br/>
                    { !enableEdit &&
                    <button className='EditBtn' onClick={editBtnHandler}>Edit Pofile</button>
                    }
                    {
                        enableEdit && <div>
                            <button className='btnsEdit Cancel' onClick={()=>setEnableEdit(false)}>Cancel Edit</button>
                            <button className='btnsEdit Okay'>Update Profile</button>
                        </div>
                    }
                </div>
            </div>
        }
        {
            showBookingView && <div className='BookinglistContainer'>
                {
                    listOfMyBookings.length>0 && listOfMyBookings.map(eachBooking => {
                        return(
                        <div className='bookedContainer' key={Math.random()*1000}>
                            <div className='VehicleImageContainerS'>
                                <img src={eachBooking.vehicleImages[0]} alt="img of Vehicle" className='bookCarImg'/>
                            </div>
                            <div className='BookingInfoContainer'>
                                <p><b>Pickup Location :</b> {eachBooking.PickUpLocation}</p>
                                <p><b>PickUpDate Date :</b> {eachBooking.PickUpDate}</p>
                                <p><b>Dropoff Location :</b> {eachBooking.DropOffLocation}</p>
                                <p><b>DropOff Date :</b> {eachBooking.DropOffDate}</p>
                                <p><b>No of Days Rented:</b> {eachBooking.NoOfDaysBooked}</p>
                                <p><b>Amount Per Day Charged :</b> {eachBooking.PricePerDay} ksh</p>
                                <p><b>Total Amount for :</b> {eachBooking.NoOfDaysBooked}  Days is {eachBooking.TotalPrice} ksh</p>
                                <Link to={"/Cancel"} state={eachBooking}>
                                  <button className='CancelBookingBtn' >Cancel Booking</button>  
                                </Link>
                                
                            </div>
                        </div>
                    )})
                }
                {
                    listOfMyBookings.length == 0 && <div>
                        <h3>{globalData.Name} you have no booked any vehicle :/</h3>
                    </div>
                }
            </div>
        }
        </div>
        
        </div>

    )

}
