import { useState } from "react"
import "./Landing.css"
import {TbManualGearbox} from "react-icons/tb"
import {BsFillFuelPumpFill,BsPeople,} from "react-icons/bs"
import {BiFilterAlt} from "react-icons/bi"
import AuthRoot from "../Auth/AuthRoot"
import {MdOutlineSupportAgent} from 'react-icons/md'
import {AiFillLock} from "react-icons/ai"
import {IoMdSend} from "react-icons/io"
import { Link, NavLink } from "react-router-dom"
import { useEffect } from "react"
export default function Landing({isLogin,setIsLogin,showLoginForm,setShowLoginForm,globalData}){
    const [GearFilter,setGearFilter]=useState('any')
    const [vehicleClassFilter,setVehicleClassFilter] = useState('any')
    const [fuelFilter,setFuelFilter] = useState('any')
    const [showSupportMenu,setShowSupportMenu] = useState(false)
    const [supportMsg,setSupportMsg] = useState('')
    const [vehicleList,setVehicleList] = useState([])
    const [SupportMessage,setSupportMessage] = useState([ ])
const [originalArray,setOriginalArray]=useState()
///function to handler the filter option
const filterHandler = () => {
    const filterResult = vehicleList.filter((t) => {
      return (
        (fuelFilter === "any" || t.fuelType === fuelFilter) &&
        (GearFilter === "any" || t.gearType === GearFilter) &&
        (vehicleClassFilter === "any" || t.vClass === vehicleClassFilter)
      );
    }
    
    );
  
    setVehicleList(filterResult);

  };
  const resetFilterHandler=()=>{
    setFuelFilter("any")
    setGearFilter("any")
    setVehicleClassFilter("any")
    setVehicleList(originalArray)
  }
  //function to handler when the rent button is clicked
  const rentBtnHandler=()=>{
    try {
        if(!isLogin){
            setShowLoginForm(true)
        }
    } catch (error) {
        
    }
  }

  //function for getting the messages from the database
  const getMessages = async(userEmail)=>{
    try {
        const res = await fetch("http://localhost:8080/spMessageGet",{
            method : "POST",
            headers :{"content-type" : "application/json"},
            body : JSON.stringify(userEmail)
        })
        const data = await res.json()
        if(data.length == 0){
            const supportMessageWelcome =             
            {
                From : "Support",
                To  : "You",
                messageContent    : `Hey ${globalData.Name} talk to me if you need help`,
                timeStamp : Math.random() *1000,
            }
            setSupportMessage([...SupportMessage,supportMessageWelcome])
        }else{
            setSupportMessage(data)
        }
        
        
    } catch (error) {
        console.log('Error in the getMessages function /landingpage ->',error)
    }
  }

  //function for handlig the opening support messaging area and the button
  const supportBtnHandler = () => {
    if(!showSupportMenu){
        setShowSupportMenu(true)
        getMessages({Email :globalData.Email})
    }
    
  }
  //function for closing the support menu
  const closeSupportMenuHandler = () => {
    if(showSupportMenu){
        setShowSupportMenu(false)

    }
    console.log("Close")

  }
    //this funtion send the support messages to the server 
    const sendMessage = async(msg)=>{
        try {
            const res = await fetch("http://localhost:8080/spMessageSave",{
                method : "POST",
                headers :{"content-type" : "application/json"},
                body : JSON.stringify(msg)
            })
        } catch (error) {
            console.log('Error in the sendMessage function /landingpage line 99->',error)
        }
      }
  //function for sending message to support  when the user click send 
  const sendMsgHandler= () => {
    if(supportMsg.length>1 && supportMsg != " "){
        const localPushMsg = 
        {
            From : "You",
            To  : "Support",
            messageContent    : supportMsg,
            timeStamp : Math.random() *1000,
        }
        //this message will be localy pushed to increase performance
        setSupportMessage([...SupportMessage,localPushMsg])
        //this is the message which will be sent to the database for persistant storage 
        const remoteMessage ={
            From : globalData.Email,
            To : "Support",
            senderRole : globalData.Role,
            messageContent : supportMsg
        } 
        sendMessage(remoteMessage)

    }
  }

  const getVehicleListings = async()=>{
    try {
        const res = await fetch("http://localhost:8080/getVehicles")
        const data = await res.json();
        console.log(data)
        setVehicleList(data.vehicleData)
        setOriginalArray(data.vehicleData)
    } catch (error) {
        console.log("this error happened when trying to get the car listing->",error)
    }
  }

  useEffect(()=>{
    getVehicleListings()
    
  },[])
  
    return(
        <div className="mainCarContainer">
            {

            }
            <div className="filterContainer" >
                <select className="filterOption" name="Gear Type" onChange={e=>setGearFilter(e.target.value)}>
                    <option value="any">Gear Type</option>
                    <option value="Manual">Manual</option>
                    <option value="Auto">Auto</option>
                </select>
                <select className="filterOption" name="Vehicle Class" onChange={e=>setVehicleClassFilter(e.target.value)}>
                    <option value="any">Vehicle Class</option>
                    <option value="Economy">Economic</option>
                    <option value={"Hyper Car"}>Hyper car</option>
                </select>
                <select className="filterOption" name="Fuel type" onChange={e=>setFuelFilter(e.target.value)}>
                    <option value="any">Fuel Type</option>
                    <option value={"Petrol"}>Petrol</option>
                    <option value={"Diesel"}>Diesel</option>
                </select>
                <button className="ApplyFilterBtn" onClick={filterHandler}><BiFilterAlt/> Filter</button>
                <button className="resetFilterBtn" onClick={resetFilterHandler}>Clear All Filters</button>
            </div>
            <p className="carCountHolder">{vehicleList.length} Vehicles Found</p>
            <div className="vehicleDisplayContainer">
                {vehicleList.length>0 && vehicleList.map(vehicle=>{
                    return(
                        <div className="VehicelContainer" key={vehicle._id}>
                            <p className="vName">{vehicle.vName}</p>
                            <div className="VehicleImageContainer">
                                <img src={vehicle.vImage[0]} className="vehicleImage" alt={`Image of ${vehicle.vName}`}/>
                            </div>
                            <div className=" vehicleInfoContainer">
                        
                                <p className={vehicle.vClass =="Hyper Car" ? "vClassRed":"vClassOrange"}>{vehicle.vClass}</p>
                                <p className="NoSits"><BsPeople/>{vehicle.vNoOfSits}</p>
                                <hr></hr>
                                <p className="bubbleSpan"> <TbManualGearbox/>{vehicle.gearType}</p>
                                <p className="bubbleSpan"><BsFillFuelPumpFill/>{vehicle.fuelType}</p>
                                <div className="priceCard">
                                    <p className="priceTitle">per Day</p>
                                    <p className="priceValue">{vehicle.rentalPrice} KSH</p>
                                </div>
                            </div>
                            { isLogin && 
                            <Link to="/Rent" state ={vehicle }>
                               <button className="rentBtn" onClick={rentBtnHandler}>{`More on ${vehicle.vName}`}</button> 
                            </Link>
                            }
                            {
                                !isLogin && 
                                <button className="rentBtn" onClick={rentBtnHandler}>{`More on ${vehicle.vName}`} <AiFillLock size={25} color="red"/></button> 
                            }
                        </div>
                    )
                })}

            </div>
           { /* show this button when the user is logedin*/ 
           isLogin && <div className={showSupportMenu ? "supportMessageArea" : "SupportBtn"} onClick={supportBtnHandler}>
                     { /*  Changing betwen button and the menu  same with the classNames */ 
                      !showSupportMenu && <>
                      <MdOutlineSupportAgent/>
                        <span>Support</span>
                     </>}
                     { showSupportMenu &&
                        <>
                            <div className="SupportMessagingAreaHeader">
                                <span className="supportIcon"><MdOutlineSupportAgent/> <div className="onlineBadge"></div></span>
                                <h2 style={{color:'white',marginLeft:5}}>Cary Support</h2>
                            </div>
                            
                            <div className="MessageDisplayArea">

                                {
                                   SupportMessage.length>0 &&  SupportMessage.map( message =>  (
                                  
                                     <div className={message.From == "Support" ? "SupportMessageBubble" : "MessageBubble"}>
                                        { message.From == "Support" && <MdOutlineSupportAgent/>}
                                        <p className="ActualMessage"> {message.messageContent}</p>
                                    </div>
                                    
                                    ))
                                }
                            </div>
                            <div className="msgInputBtnContainer">
                                <input className="supportInputField" type="text" placeholder={`Hey  talk to support`} onChange={e => setSupportMsg(e.target.value)}/>
                                <button className="SendMessageBtn" onClick={sendMsgHandler}><IoMdSend /></button>
                            </div>
                            <button className="closeSupportFormBtn" onClick={closeSupportMenuHandler}>X</button>
                        </>
                     }
                </div>
           }
        </div>
    )
}
/*
                                     <div className={message.Sender == "Support" ? "SupportMessageBubble" : "MessageBubble"}>
                                        { message.Sender == "Support" && <MdOutlineSupportAgent/>}
                                        <p className="ActualMessage"> {message.msg}</p>
                                    </div>
*/