import { useEffect, useState } from "react"
import "./CancelPage.css"
export default function CancelPage ({userGlobalData}){
    const [cancelList,setCancelList] = useState([])
    const [showListEmpty,setShowListEmpty] = useState(true)
    //this function gets the list of car which were cancel containing the Rentor name 
    const getCancelList =async (rentorsName)=>{
        try {
            const res = await fetch("http://localhost:8080/CanceledList",{
                method : "POST",
                headers : {"content-type" : "application/json"},
                body : JSON.stringify(rentorsName)
            })
            const data = await res.json()
            if(data.status){
                setShowListEmpty(false)
                setCancelList(data.listData)
            }else{
                setShowListEmpty(true)
            }
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        getCancelList({DealerName: userGlobalData.Name})
    },[])
    return(
        <div className="mainCancelContainer">
        {
            showListEmpty &&
            <div>
                <h1>No Canceled Cars found</h1>
                <p>No Cancled Cars have been found</p>
            </div>
        }
        {
            cancelList.length>0 && cancelList.map(eachCancelVehicle => {
                return(
                    <div key={eachCancelVehicle._id} className="CanceledTile">
                    <div className="cancelimageConainter">
                        <img src={eachCancelVehicle.vehicleImages[0]} alt="Image Of canceled Car" className="canceledVehicleImage"/>
                    </div>
                    <div>
                        <p className="INfoTile">Email : {eachCancelVehicle.Email}</p>
                        <p className="INfoTile">cancelation Date: {eachCancelVehicle.CancelDate}</p>
                        <div>
                            <p className="reasonConainer">
                            <span>REASON</span>
                            {eachCancelVehicle.Reason}
                            </p>
                        </div>
                    </div>
                    </div>
                )
            })
        }
        </div>
    )
}