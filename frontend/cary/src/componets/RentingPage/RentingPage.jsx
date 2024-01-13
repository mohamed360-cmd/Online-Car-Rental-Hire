import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "./RentingPage.css"
import caryLogo from '../../assets/cary-logo.png'
import {AiFillRightCircle,AiFillLeftCircle} from 'react-icons/ai'
import {FcInfo} from 'react-icons/fc'
import {BsCashCoin} from 'react-icons/bs'
import {FaRegCalendarDays,FaCarSide,FaMapLocation} from 'react-icons/fa6'
import {CgProfile} from 'react-icons/cg'
import Error from "../ErrorSuccessFolder/Error"
import Success from "../ErrorSuccessFolder/Success"
export default function RentingPage({setShowLoginForm,isLogin,globalData})   {
    const location = useLocation()
    const vName = location.state.vName;
    const fuelType  = location.state.fuelType;
    const gearType = location.state.gearType;
    const vClass = location.state.vClass;
    const vImage = location.state.vImage;
    const DealerPhoto = location.state.DealerPhoto;
    const DealerLocation = location.state.DealerLocation;
    const DealerName = location.state.DealerName;
    const DealerServiceRating = location.state.DealerServiceRating;
    const rentalPrice = parseInt(location.state.rentalPrice)
    const vColor = location.state.vColor
    const vNoOfSits = location.state.vNoOfSits
    const brandName = location.state.brandName
    const [carImageList,setCarImageList] = useState([])
    const [showInfoSelction,setShowInfoSection] = useState(false)
    const [currentCarSelected,setCurrentSelectedCar]= useState(0);
    const [pickUpLocation,setPickUpLocation] = useState(DealerLocation)
    const [dropOffLocation,setDropOffLocation] = useState(DealerLocation)
    const [pickUpDate,setPickUpDate] = useState('')
    const [ dropOffDate,setDropOffDate] = useState('')
    const [isCustomPickup,setCustomPickUp] = useState(false)
    const [enableDropOffinput,setEnabledropoffinput] = useState(false)
    const [formError,setShowFormError] = useState(false)
    const [showConfiramtionTab, setShowConfiramtionTab] = useState(false)
    const [numberOfDaysBooker,setNumberOfDaysBooked] = useState(0)
    const [totalRentalAmount,setTotalRentalAmount] = useState(0)
    const [disableConfirmationBtn,setDisableConfirmationBtn] = useState(false)
    const [errorMsg,setErrorMsg] = useState("")
    const [showSuccessMsg, setShowSuccessMsg] = useState(false)
    const [successmsg, setSuccessmsg] = useState('')
    const [paymentMethod,setPayMentMethod] = useState("")
    const [showLipaNaMpesaForm ,setShowLipaNaMpesaForm] = useState(false)
    //this  function is to handler when the user clicks the custom pickup location radio button 
    const customPickHandler = () => {
        setCustomPickUp(true)
        
    }
    //this fucntion deals with if the dealers pick up radio button is selected
    const dealerRadioHandler = () => {
        setCustomPickUp(false)
        setPickUpLocation(DealerLocation)
    }
    //this is the function for the same as pickup radiobutton when it is selected
    const sameAsPickupHandler = () => {
        setDropOffLocation(pickUpLocation)
        if(enableDropOffinput){
            setEnabledropoffinput(false)
        }
        
    }
    //this is the function for the custom drop off location it wil enable the input field
    const customDropOffHandler = () => {
        setEnabledropoffinput(true)
    }
    //function for the book the car bitton is clicked 
    const bookCarHandler = () => {
        
        if( dropOffDate != "" && pickUpDate != ""){
            const dateLease = new  Date(pickUpDate);
            const dateReturn = new  Date(dropOffDate)
            const numberOfRentedDays = dateReturn - dateLease
            const numDaysBooked = parseInt((((numberOfRentedDays/1000)/60)/60)/24)
            setNumberOfDaysBooked(numDaysBooked)
            const tRentalAmount = rentalPrice * parseInt(numDaysBooked)
            

            if(tRentalAmount <= 0){
                setTotalRentalAmount(tRentalAmount)
                if(!disableConfirmationBtn){
                    setDisableConfirmationBtn(true)
                }
                
            }else{
                setTotalRentalAmount(tRentalAmount)
                if(disableConfirmationBtn)setDisableConfirmationBtn(false)
                
            }
            setShowConfiramtionTab(true)
        }else{
            setErrorMsg("Error In the form Fields Blank")
            setShowFormError(true)
        }
    }
    // this function subtructs the current seletect image value by 1
    const movePreviousImageHandler = () => {
        if(currentCarSelected > 0){
            setCurrentSelectedCar(currentCarSelected - 1)
        }
    }
    
    //this function increaments the value of the currently seleted image 
    const moveImageForwardHandler = () => {
        if( currentCarSelected < vImage.length - 1){
            setCurrentSelectedCar(currentCarSelected + 1);
        }
    }
    //this function is when the user clicks the pay later buttton
    const payLaterHandler = async()=>{
        setPayMentMethod("Cash")
        await new Promise(resolve => setTimeout(resolve, 0));
        setShowConfiramtionTab(false)
        confirmBookingHandler()
    }
    //this is the function that send the car rental details and booking details 
    const Renting_Function = async(RentingDetails) => {
        try {
            const res = await fetch("http://localhost:8080/Rental",{
                method : "POST",
                headers : {'content-type': "application/json"},
                body : JSON.stringify(RentingDetails)
            })
            const data = await res.json()
            if(data.status){
                setShowConfiramtionTab(false)
                setSuccessmsg(data.msg)
                setShowSuccessMsg(true)
                
            }
        } catch (error) {
            console.log("This happened when sending the rental deatils ->",error)
        }
    }
    const confirmBookingHandler = async() => {
        if(totalRentalAmount<1){
            setErrorMsg("Nkt !!Total Price Cannot be  Less Than 1 KSh")
            setShowFormError(true)
        }else{
            setShowFormError(false)

            //this is the where the sending the details function will be executed
            const rentalDetails = {
                Email : globalData.Email,
                PhoneNumber : globalData.PhoneNumber,
                VehicleId : Math.random()*100,
                PickUpDate :pickUpDate,
                PickUpLocation : pickUpLocation,
                DropOffDate : dropOffDate,
                DropOffLocation : dropOffLocation,
                NoOfDaysBooked : numberOfDaysBooker,
                PricePerDay : rentalPrice,
                TotalPrice : totalRentalAmount,
                vehicleImages : vImage,
                DealerName : DealerName,
                ModeOfPayment : paymentMethod
            }
            console.log(rentalDetails.ModeOfPayment)
            Renting_Function(rentalDetails)
        }
    }
    //this function is when th user whats to pay with mpesa it will show the form
    const payMpesaHandler =()=>{
        setShowLipaNaMpesaForm(true)
    }
    const confirmationPaidWithMpesa = async()=>{
        setShowLipaNaMpesaForm(false)
        setPayMentMethod("Mpesa")
        await new Promise(resolve => setTimeout(resolve, 0));
        setShowConfiramtionTab(false)
        confirmBookingHandler()

    }
    useEffect(()=>{
        if(!isLogin){
            setShowLoginForm(true)
        }
    },[isLogin])
    return(
        <>
        {
            !isLogin && 
            <Error ErrorMessage={"Boss!! Login"}/>
        }
        {isLogin && 
        <div className="mainRentaingPage">
        
            <div className="VehicleImagesContainer">
            <button className="swipeButton left" onClick={movePreviousImageHandler}><AiFillLeftCircle color="white" size={30}/></button> 
            <button className="swipeButton right" onClick={moveImageForwardHandler}><AiFillRightCircle color="white" size={30}/></button>
            <div className="SelectedImageContainer">
                <img src={vImage[currentCarSelected]} alt={`This is an image of ${vName}`}  className="SelectedImage"/>
            </div>
            <div className="vehicleImagePreviewContainer">
                {
                    vImage.length>0 && vImage.map(photo => (
                        <img  src={photo} alt={`This is an image of ${vName}`}  className="previewIMage" key={Math.random()*100}/>
                    ))
                    
                }
            </div>
            </div>
        <div className="rightSectionConatiner" >
                <button onClick={()=>setShowInfoSection(false)} className={showInfoSelction ? " ToggleBtn inActive" : "ToggleBtn Active"} >Booking Section</button>
                <button onClick={()=>setShowInfoSection(true)} className={showInfoSelction ? " ToggleBtn Active" : "ToggleBtn inActive"} > More Info  <FcInfo size={15}/></button>
        { !showInfoSelction &&
        <div className="BookingConatiner">
        {/* ------------------------------------------------------------------------------------------------------------ */}
        {/* This is the PICKUP section with all the radio butotns and input field */}
            <div className="pickDropContainer">

                <input type="text" placeholder={isCustomPickup ? "Enter your desired Pickup location" : DealerLocation }  disabled={!isCustomPickup}className="LocationInputs" onChange={e => setPickUpLocation(e.target.value)}/>
                        <div className="moreOptionsChip">
                            <label for="Custom">Custom Location</label>
                            <input type="radio" name="pickupOptions" value="Custom" className="radioInput" onChange={customPickHandler} checked = {isCustomPickup}/> 
                        </div>
                        <div className="moreOptionsChip">
                            <label for="Dealers">Dealers  Location</label>
                            <input type="radio" name="pickupOptions" value="Dealers" className="radioInput" checked={!isCustomPickup} onChange={dealerRadioHandler}/>
                        </div>
                <br/>
                <span>When Do You Want to Pick up ? <input type="date" className="dateInput" onChange={e => setPickUpDate(e.target.value)}/>
                {/* ------------------------------------------------------------------------------------------------------------ */}
                <br/>
                {/* ------------------------------------------------------------------------------------------------------------ */}
                {/* This is the DROPOFF  setion with all the radio butotns and input field */}
                </span>
                <input type="text" placeholder={pickUpLocation} className="LocationInputs" onChange={e => setDropOffLocation( e.target.value )} disabled={!enableDropOffinput}/>
                <div className="moreOptionsChip">
                            <label for="Custom">Custom  Location</label>
                            <input type="radio" name="dropOptions" value="Custom" className="radioInput"  onChange={customDropOffHandler}/> 
                </div>
                <div className="moreOptionsChip">
                            <label for="Custom">Same As PickUp</label>
                            <input type="radio" name="dropOptions" value="Custom" checked={true} className="radioInput" onChange={sameAsPickupHandler}/> 
                </div>
                <br/>
                <span>When will you Drop the car ? <input type="date" className="dateInput" onChange={ e=> setDropOffDate(e.target.value)}/></span>
                {/* ------------------------------------------------------------------------------------------------------------ */}
            </div>
            
                <button onClick={bookCarHandler} className="bookCarBtn">Book</button>

            

            {showConfiramtionTab && <div className="ConfirmationTicketCOntainer">
                <div className="rentalInfo">
                    <div>
                        <h2>Confirmation Ticket</h2>

                    </div>
                     
                    <p><b>Car Name</b> <FaCarSide/> {vName}</p>
                    <p><b>PickUp Date </b>  <FaRegCalendarDays/> {pickUpDate}</p>
                    <br/>
                    <p><b>PickUp Location</b> <FaMapLocation/> {pickUpLocation}</p>
                    <p><b>DropOff Date</b> <FaRegCalendarDays/> {dropOffDate}</p>
                    <br/>
                    <p><b>DropOff Location</b> <FaMapLocation/> {dropOffLocation} </p>
                    <p><b>No of Days Booked</b> {numberOfDaysBooker} Days</p>
                    <br/>
                    <p><b>Total</b> <BsCashCoin color="black"/> {totalRentalAmount} ksh</p>
                    <br/>
                    <hr/>
                    {
                        disableConfirmationBtn && 
                        <div className="errorInConfirmationPage">
                        <span>Rebook their is an Error <button onClick={()=>setShowConfiramtionTab(false) }>Rebook</button></span>
                        </div>
                    }
                    {
                        !disableConfirmationBtn && 
                        <div className="CheckOutBtnContainer">
                            <button className="checkoutBtn laterBtn" onClick={payLaterHandler}>Pay Cash/On Site</button>
                            <button className="checkoutBtn mpesaBtn" onClick={payMpesaHandler}>Pay Now/Mpesa</button> 
                            
                        </div>
                    }
                </div>
                {
                showLipaNaMpesaForm && <div className="LipaNaMpesaForm">
                    <h3>Pochi La Biashara</h3>
                    <p>Mobile Number : 0719653969</p>
                    <p>Amout :{totalRentalAmount}</p>
                    <p><b>NB:</b> Come with Confirmation on {pickUpDate}</p>
                    <button onClick={confirmationPaidWithMpesa}>Yes I have Paid</button>
                </div>
            }
            </div>
            }


        </div>}
        {/* ------------------------------------------------------------------------------------------------------------ */}
        {/* More information about the car and the owner  tab  */}
        {
            showInfoSelction && 
            <div className="infoSectionContainer"> 
                <div className="DealerDetailsContainer">
                    <div className="profileImageConatiner">
                        <img src={caryLogo} alt="This is the Dealers Picture" className="DealersPhoto"/>
                    </div>
                    <div className="textInfoSectionRight">
                        <p style={{fontWeight:'bolder',textAlign:'center'}}><CgProfile/>{DealerName}</p>
                        <p><b>Ratings: </b> <u>{DealerServiceRating} </u>⭐</p>
                        <p><b>Dealers Location:</b> <u>{DealerLocation} <FaMapLocation/></u></p>  
                    </div>

                </div>
                <div className="CarDetailsSection">
                    <p>
                        <span style={{ fontWeight: 'bolder', fontSize: 20 }}>Description:</span>
                        This is a {vName} by {brandName} in {vColor}. It seats {vNoOfSits} and falls into the {vClass} class. It runs on {fuelType}, available from  {DealerName} in {DealerLocation} for {rentalPrice} KSH ONLY!! per day. It features {gearType} transmission.
                    </p>
                </div>

            </div>
        }
        {
            formError && <Error ErrorMessage={errorMsg} closeButton={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={e=>setShowFormError(false)}>X</button>}/>
        }
        {showSuccessMsg && <Success SuccessMessage={successmsg} closeButton={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={e=>setShowSuccessMsg(false)}>X</button>}/>}
        </div>
        
        </div>
        }
        </>
    )
}
/*
                <table>
                    <tr>
                        <th><h3>Comfirmation Ticket</h3></th>
                    </tr>
                    <tr>
                        <td>Car Name</td>
                        <td> <FaCarSide/> {vName}</td>
                    </tr>
                    <tr>
                        <td>  PickUp Date </td>
                        <td> <FaRegCalendarDays/> {pickUpDate}</td>
                    </tr>
                    <tr>
                        <td>PickUp Location</td>
                        <td> <FaMapLocation/> {pickUpLocation}</td>
                    </tr>
                    <tr>
                        <td> DropOff Date</td>
                        <td> <FaRegCalendarDays/> {dropOffDate}</td>
                    </tr>
                    <tr>
                        <td>DropOff Location</td>
                        <td> <FaMapLocation/> {dropOffLocation}</td>
                    </tr>
                    <tr>
                        <td>No of Days Booked</td>
                        <td>{numberOfDaysBooker} Days</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td style={{color:'black' ,fontWeight:'bolder'}}> <BsCashCoin color="white"/> {totalRentalAmount} ksh</td>
                    </tr>

                    
                        {
                            
                            !disableConfirmationBtn &&<button className="confirmationBtn" onClick={confirmBookingHandler}>I Comfirm</button>
                        }
                        {
                            disableConfirmationBtn &&<span style={{backgroundColor:'red',padding:5,borderRadius:20}}>ERROR !negative Amount</span> 
                        }
                        
                </table>
                */