import { useEffect, useState } from "react"
import "./Create.css"
import Error from "../ErrorSuccessFolder/Error"
import Success from "../ErrorSuccessFolder/Success"
export default function Create ({userGlobalData}){
    const [BrandName,setBrandName] = useState('')
    const [vehcileName,setVehicleName]  = useState("")
    const [vehcileColor,setVehicleColor] = useState('')
    const [noOfSits,setNoOfSits] = useState(0)
    const [vClass,setVClass] = useState('Economy')
    const [fuelType,setFuelType] = useState('Petrol')
    const [gearType,setGeartype] = useState('Auto')
    const [vehiclePhotos,setVehiclePhotos] = useState([])
    const [ renatalPrice,setRentalPrice] = useState(0)
    const [errorMsg, setErrorMsg] =useState('')
    const [showErrorMsg , setShowErrorMsg] = useState(false)
    const [successMsg,setSuccessMsg] = useState("")
    const [showSuccessMsg,setShowSuccessMsg] = useState(false);
    const [showPreviews,setShowPreviews] = useState(false)
    //function for sending car details to the server
    const sendingCarDetails = async(carDetails)=>{
        try {
            const res = await fetch("http://localhost:8080/CarUpload",{
                method : "Post",
                headers : {"content-type" : "application/json"},
                body : JSON.stringify(carDetails)
            })
            const data = await res.json();
            if(data.status){
                setSuccessMsg(data.msg)
                setShowSuccessMsg(true)
            }else{
                setErrorMsg(data.msg)
                setShowErrorMsg(true)
            }
        } catch (error) {
            console.log("This happened when sendinf the car details to the server->",error)
        }
    }
    // this function is to deal with the upload and convertion of the image to base 64 and push it to the vehicle image aray 
    const ImageUploadHandler = (e) => {
        const lengthOfArray = e.target.files.length;
        const newVehiclePhotos = [];
    
        for (var i = 0; i < lengthOfArray; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[i]);
    
            reader.onload = () => {
                newVehiclePhotos.push(reader.result);
                    setVehiclePhotos([...newVehiclePhotos]);
            };
    
            reader.onerror = (error) => {
                console.log("Error in reading the IMG files", error);
            };
        }
    };
    
    
    const uploadVehcileHandler = ()=>{
        if(BrandName.length>0 && vehcileName.length>0 &&  vehcileColor.length>0 && noOfSits >0  ){
            const carDetails = {
                 vName : vehcileName,
                 brandName:BrandName,
                 vColor : vehcileColor,
                 vNoOfSits : noOfSits,
                 vClass : vClass,
                 fuelType : fuelType,
                 vImage : vehiclePhotos,
                 DealerLocation : userGlobalData.DealersLocation,
                 DealerName : userGlobalData.Name,
                 rentalPrice : renatalPrice,
                 gearType :gearType
                }
                sendingCarDetails(carDetails)
        }else{
            setErrorMsg("Vehicle Info Form  is Incompelete")
            setShowErrorMsg(true)
        }
    }
    //this function checks if their any images in the array so it can show the previews
    const imgArrayLenght = ()=>{
        if(vehiclePhotos.length>0){
            setShowPreviews(true)
        }else{
            setShowPreviews(false)
        }
    }
    //this remove the photos from the upload photos array
    const removePhoto =(index)=>{
        const modyPhotosArray = [...vehiclePhotos]
        modyPhotosArray.splice(index,1)
        setVehiclePhotos(modyPhotosArray)
    }
    useEffect(()=>{
        imgArrayLenght()
    },[vehiclePhotos])
    
    return(
        <div className="MainCreateContainer">
        <div className="CreateForm">
            <input type="text" placeholder="Car Brand Name" className="DetailsInput" onChange={e=>setBrandName((e.target.value))}/>
            <input type="text" placeholder="Vehicle Name" className="DetailsInput"onChange={e=>setVehicleName((e.target.value))}/>
            <br/>            
            <input type="text" placeholder="Car Color" className="DetailsInput"onChange={e=>setVehicleColor((e.target.value))}/>
                     
            <input type="Number" placeholder="No of Sits" className="DetailsInput"onChange={e=>setNoOfSits((e.target.value))}/>
            <input type="Number" placeholder="Rental Price Per day" className="DetailsInput"onChange={e=>setRentalPrice((e.target.value))}/>
            <br/>
            <div className=" Class SelectionContainer">
                <span>Car Class</span> 
                <select className="SelctionOptions" onChange={e=>setVClass((e.target.value))}>
                    <option value={"Economy"}>Default</option>
                    <option value={"Economy"}>Economic</option>
                    <option value={"Hyper Car"}>Hyper Car</option>
                </select>
            </div>
            <div className=" Fuel SelectionContainer">
                <span>Fuel Type</span> 
                <select className="SelctionOptions" onChange={e=>setFuelType((e.target.value))}>
                    <option value={"Petrol"}>Default</option>
                    <option value={"Diesel"}>Diesel</option>
                    <option value={"Petrol"}>Petrol</option>
                </select>
            </div>
            <div className=" Gear SelectionContainer">
                <span>Gear Type</span> 
                <select className="SelctionOptions" onChange={e=>setGeartype(e.target.value)}>
                    <option value={"Auto"}>Default</option>
                    <option value={"Manual"}>Manual</option>
                    <option value={"Auto"}>Auto</option>
                </select>
            </div>
            <div className="FileUploadContainer">
            <span>Upload Images of the Vehicle</span>
                <input type="file"onChange={ImageUploadHandler} multiple  accept="images/**" />
            </div>
            <br/>
            <div className="PreviewImagesContainer">
            {
                showPreviews && vehiclePhotos.map((previewPhoto,index)=>{
                    return(
                        
                        <div className="ImageConatainer" key={index}>
                            <img src={previewPhoto}  className="previewImage"/>
                            <button className="RemoveImageBtn" onClick={()=>removePhoto(index)}>x</button>
                        </div>

                    )
                })
            }
            {
                !showPreviews && <div><h3 style={{color:"white"}}>Upload Vehcile to See Previews 👀 </h3></div>
            }
            </div>

            <button className="uploadBtn" onClick={uploadVehcileHandler}>Upload Vehcile</button>
            {
                showErrorMsg && <Error ErrorMessage={errorMsg} closeButton={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={e=>setShowErrorMsg(false)}>X</button>}/>
            }
            {showSuccessMsg && <Success SuccessMessage={successMsg} closeButton={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={e=>setShowSuccessMsg(false)}>X</button>}/>}
        </div>
        </div>
    )
}