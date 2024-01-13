import { useLocation } from "react-router-dom";
import './Cancel.css'
import Success from "../ErrorSuccessFolder/Success";
import Error from "../ErrorSuccessFolder/Error";
import {BsArrowLeftCircleFill,BsFillArrowRightCircleFill} from "react-icons/bs"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function CancelBooking({ }) {
    
    const location = useLocation();
    const {
        _id,
        DealerName,
        DropOffDate,
        DropOffLocation,
        Email,
        NoOfDaysBooked,
        PickUpDate,
        PickUpLocation,
        PricePerDay,
        TotalPrice,
        vehicleImages
    } = location.state;
    const [reason,setReason] = useState("")
    const [lengthOfPhotosArray ,setLenghtOfPhtotsArray] = useState(vehicleImages.length)
    const [currentImageCounter,setCurrentImageCount] = useState(0)
    const [showSuccessMsg,setShowSuccessMsg] = useState(false)
    const [successmsg,setSuccessMsg] = useState("")
    const [showErrorMsg,setShowErroMsg] = useState(false)
    const [erroMsg,setErrorMsg] = useState("")
    const [hideButtons,setHideButtons] = useState(false)
    const backImageHandler = ()=>{
        if(currentImageCounter > 0 ){
           setCurrentImageCount(currentImageCounter - 1)
        }else{
            setCurrentImageCount(lengthOfPhotosArray-1)
        }
    }
    const forwardImageHandler = ()=>{
        if(currentImageCounter<lengthOfPhotosArray-1){
            setCurrentImageCount(currentImageCounter + 1)
        }else{
            setCurrentImageCount(0)
        }
    }
    ///////////////////////////////
    const sendingCancelationDetails = async (details)=>{
        try {
            const res = await fetch("http://localhost:8080/Cancel",{
                method : "POST",
                headers : {"content-type" : "application/json"},
                body : JSON.stringify(details)
            })
            const data = await res.json()
            if(data.status){
                setSuccessMsg(data.msg)
                setShowSuccessMsg(true)
                setShowErroMsg(false)
                setHideButtons(true)
            }
            else{
                setErrorMsg(data.msg)
                setShowErroMsg(true)
                setHideButtons(false)
            }
        } catch (error) {
            console.log("This error happened when trying to send cancel details ->",error)
        }
    }
    ///////////////////////////
    const cancelBookingFunction =  ()=> {
        if(reason.trim().length >0 )  {
            setShowErroMsg(false)
            const cancel_Details = {
                _id,
                Email,
                DealerName,
                vehicleImages,
                Reason :reason.trim()
            }
            sendingCancelationDetails(cancel_Details)
        }else{
            setErrorMsg("Please Tell us the Reason Why You Are Canceling !!!")
            setShowErroMsg(true)
        }
    }
    useEffect(()=>{
    console.log(location.state)    
    },[])
    
    return (
        <div>
            <div className="cancelContainer" >
                <div className="VehicleImageContainerZ">
                    <img
                        src={vehicleImages[currentImageCounter]}
                        alt="img of Vehicle"
                        className="bookCarImg"
                    />
                    <button className="imgControls LEFT" onClick={backImageHandler}><BsArrowLeftCircleFill size={20} color="white"/></button>
                    <button className="imgControls RIGHT" onClick={forwardImageHandler}><BsFillArrowRightCircleFill size={20} color="white"/></button>
                </div>
                <div className="ContainerInfoContainer">
                    <p>
                        <b>Pickup Location :</b> {PickUpLocation}
                    </p>
                    <p>
                        <b>PickUpDate Date :</b> {PickUpDate}
                    </p>
                    <p>
                        <b>Dropoff Location :</b> {DropOffLocation}
                    </p>
                    <p>
                        <b>DropOff Date :</b> {DropOffDate}
                    </p>
                    <p>
                        <b>No of Days Rented:</b> {NoOfDaysBooked}
                    </p>
                    <p>
                        <b>Amount Per Day Charged :</b> {PricePerDay} ksh
                    </p>
                    <p>
                        <b>Total Amount for :</b> {NoOfDaysBooked} Days is{" "}
                        {TotalPrice} ksh
                    </p>
                    <textarea placeholder="Reason why you are canceling This booking" className="feedBackField" onChange={e=>setReason(e.target.value)}/>
                <div>
                {
                   ! hideButtons &&
                    <>
                        <Link to="/DashBoard" >
                            <button className="btnTextField back ">Stop and Take me Home</button>
                        </Link>
                        
                        <button className="btnTextField cancelBooking" onClick={cancelBookingFunction}>Cancel Booking</button>
                    </>
                }

                </div>
                </div>  
            </div>
            {
                showErrorMsg && <Error ErrorMessage={erroMsg}/>
            }
            {showSuccessMsg && <Success SuccessMessage={successmsg} closeButton={<Link to="/DashBoard"><button>DashBoard</button></Link>}/>}
        </div>
    );
}
