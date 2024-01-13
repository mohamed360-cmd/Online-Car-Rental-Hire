import { useEffect, useState } from "react"
import "./MyBooking.css"
//this page you will see the people who have booked your vehicles and their details 
export default function MyBookedCars ({userGlobalData}){
    const [ShowNoOneHasBookedMsg,setShowNooneHasBooked] = useState(true)
    const [listOfCarsRented,setListOfCarRented] = useState([])
    const get_list_of_People_RentedMyCars = async (rentorName)=>{
        try{
            const res = await fetch("http://localhost:8080/bookedCar",{
                method : "POST",
                headers : {"content-type": "application/json"},
                body : JSON.stringify(rentorName)
            })
            const data = await res.json()
            if(data.status){
                setShowNooneHasBooked(false)
                setListOfCarRented(data.details)
            }
            else{
                setShowNooneHasBooked(true)
            }
        }catch(error){
            console.log("This error happened when tring to get the list of people who have rented my cars ->",error)
        }
    }
    useEffect(()=>{
        
        const Name = { DealerName : userGlobalData.Name }
        get_list_of_People_RentedMyCars(Name)
    },[])
    return(
        <div className="MyBookedCarContainerMain">
            {
                ShowNoOneHasBookedMsg &&
                 <div className="SorryMsg"> 
                    <h1> (ಥ﹏ಥ) Sorry</h1>
                    <p>No One Has Booked your Cars /or you have not uploaded any vehicles yet</p>
                </div>
            }
            {
                listOfCarsRented.length > 0 && listOfCarsRented.map(rentedCar => {
                    return(
                        <div className="DetailsTile">
                            <div className="ImageContainer">
                                <img src={rentedCar.vehicleImages[0]} className="vehcileIMG"/>
                            </div>
                            <div>
                                <p>Client Email:<span>{rentedCar.Email}</span></p>
                                <p>Rented From : <span>{rentedCar.PickUpDate}</span> To <span>{rentedCar.DropOffDate}</span></p>
                                <p>Pickup location <span>{rentedCar.PickUpLocation}</span></p>
                                <p>Drop of location <span>{rentedCar.DropOffLocation}</span></p>
                                <p>No of Days booked <span>{rentedCar.NoOfDaysBooked}</span></p>
                                <p>Payment Method <span>{rentedCar.paymentMethod}</span></p>
                                <p>Total  <span>{rentedCar.TotalPrice} KSH</span></p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}