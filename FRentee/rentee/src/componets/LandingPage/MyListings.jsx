import { useEffect, useState } from "react"
import "./MyListing.css"
import {MdAddCircle,MdDelete} from "react-icons/md"
import {LuMoreVertical} from 'react-icons/Lu'
import {AiFillCloseCircle} from 'react-icons/ai'
export default function MyListings({setCreateTabActive,setMyListingTabActive,userGlobalData}){
    const [myListing,setMyListings] = useState([])
    const [noListings,setShowListingMessage] = useState(false)
    const [showMoreOptions,setShowMoreOptions] = useState(false)
    const getMyListings = async(info)=>{
        try {
            const res = await fetch("http://localhost:8080/getMyListings",{
                method : "POST",
                headers : {"content-type": "application/json"},
                body : JSON.stringify(info)
            })
            const data = await res.json()
            if(data.status){
                setMyListings(data.vehicleData)
                setShowListingMessage(false)
                console.log(data.vehicleData)
            }else{
                setShowListingMessage(true)
            }
            console.log(data)
        } catch (error) {
            console.log("This happened when getting the Car i have listed->",error)
        }
    }
    const navigateToAddHandler =()=>{
        setCreateTabActive(true)
        setMyListingTabActive(false)
    }
    const toggleShowMoreOptions = ()=>{
        if(showMoreOptions){
            setShowMoreOptions(false)
        }else{
            setShowMoreOptions(true)
        }
    }
    useEffect(()=>{
        const info = { DealerName : userGlobalData.Name}

        getMyListings(info)

    },[])
    const cuserolFunction= ()=>{
        const noOfImgs = data.vehicleData.vImage.length;

    }
    return(
        <div className="mainListingContainer">
        {  noListings &&
            <div className="NoListingsFound">
            <h3>Your Have Not Listed Any Vehicle Yet (ㆆ_ㆆ)</h3>
            <button className="linkToAddBtn" onClick={navigateToAddHandler}><MdAddCircle color="white" />Add Listing</button>
            </div>
            
        }
        {
            myListing.length > 0 && myListing.map(listing=>{
                return(
                    <div className="MyListingTile">
                    <button className="moreOptionsBtn" onClick={toggleShowMoreOptions}>{!showMoreOptions &&<LuMoreVertical/>}{showMoreOptions && <AiFillCloseCircle color={"red"}/> }</button>
                <div className="ImageContainer">
                    <img src={listing.vImage[0]} alt="carName" className="CarImage"/>
                </div>
                <div className="infoContainer">
                    <div className="InfoChip"><b>brandName:</b>{listing.brandName}</div>
                    <div className="InfoChip"><b>Vehicle Name:</b>{listing.vName}</div>
                    <br/>
                    <div className="InfoChip"><b>No of Sits:</b>{listing.vNoOfSits}</div>
                    <div className="InfoChip"><b>color:</b>{listing.vColor} <span style={{backgroundColor:listing.vColor,color:listing.vColor}} className="colorBubble">o</span></div>
                    <br/>
                    <div className="InfoChip"><b>fuelType:</b>{listing.fuelType}</div>
                    <div className="InfoChip"><b>Vehicle Class:</b>{listing.vClass}</div>
                    <br/>
                    <div className="InfoChip">gearType:{listing.gearType}</div>
                    <div className="InfoChip"><b>rentalPrice:</b>{listing.rentalPrice}</div>
                    <br/>
                    <div className="InfoChip"><b>DealerName:</b>{listing.DealerName}</div>
                </div>
                {
                    showMoreOptions &&
                <div className="moreOptionsContainer">
                    <button className="removeListingBtn"><MdDelete size={19}/>Remove Listing</button>
                </div>
                }
            </div>
                )
            })
        }
        </div>
    )
}