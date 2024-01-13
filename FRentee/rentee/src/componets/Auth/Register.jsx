import './Register.css'
import { useState } from 'react'
import Error from '../ErrorSuccessFolder/Error'
import Success from "../ErrorSuccessFolder/Success"
export default function Register ({setShowRegisterForm}){
    const showLoginFormHandler = () => {
        setShowRegisterForm(false)
    }
    const [EmailValue,setEmailValue] = useState('')
    const [ nameValue ,setNameValue] = useState('')
    const [phoneNumberValue, setPhoneNumberValue] =useState('')
    const [DealerLocation,setDealersLocation] = useState("")
    const [ PasswordValue ,setPasswordValue] = useState('')
    const [ PasswordAgainValue,setPasswordAgainValue] = useState('')
    const [ showErrorMessage,setShowErrorMessage] =useState(false)
    const [errorMsg,setErrorMsg] = useState('')
    const [showSuccessMessage,setShowSuccessMessage] = useState(false)
    const [successMsg,setSuccessMsg] = useState('')
    const sendRegisterDetails = async (rentorsData)=>{
        try {
            const res = await fetch("http://localhost:8080/RentorRegistor",
            {
                method: "POST",
                headers : {"content-type":"application/json"},
                body : JSON.stringify(rentorsData)
            })
            const data = await res.json()
            if(data.status){
                setSuccessMsg(data.msg)
                setShowSuccessMessage(true)
            }else{
                setErrorMsg(data.msg)
                setShowErrorMessage(true)
            }
            console.log(data)
        } catch (error) {
            console.log("This happend when trying to send Rentors registration details to the server ->",error)
        }
    }
    const registerBtnHandler = async()=>{
        if(EmailValue.trim().length>=1 && EmailValue.trim() != "" && nameValue.trim() .length>=1 && nameValue.trim()  != "" && phoneNumberValue.trim() .length>=1 && phoneNumberValue.trim()  != "" && PasswordValue.trim() .length>=1 && PasswordValue.trim()  != "" && PasswordAgainValue.trim() .length>=1 && PasswordAgainValue.trim()  != ""){
            if(PasswordValue == PasswordAgainValue){
                const registraData = {
                    Email :EmailValue.trim(),
                    Name : nameValue.trim(),
                    PhoneNumber : phoneNumberValue.trim(),
                    Password :PasswordValue.trim(),
                    DealersLocation : DealerLocation.trim(),
                    Role : 'Rentor'
                }      
                sendRegisterDetails(registraData)
                console.log(DealerLocation)
            }else{
                setShowErrorMessage(true)
                setErrorMsg("Password are not equal")
            }

        }else{
            setShowErrorMessage(true)
            setErrorMsg("Registration form Error Lenght on input Values")

        }
    }
    return(
        <div className="registerForm">
            <h2 style={{fontWeight:'bold',fontStyle:'oblique'}}>Become A Rentor</h2>
            <input type="text" placeholder="Email"  className="InputFieldR" onChange={e=>setEmailValue(e.target.value)}/>
            <br/>
            <input type="text" placeholder="Name" className="InputFieldR"onChange={e=>setNameValue(e.target.value)}/>
            <br/>
            <input type="text" placeholder='Where Are You located' className='InputFieldR' onChange={e=>setDealersLocation(e.target.value)}/>
            <br/>
            <input type="number" placeholder="Phone  Number" className="InputFieldR" onChange={e=>setPhoneNumberValue(e.target.value)}/>
            <br/>
            <input type="password" placeholder="Password" className="InputFieldR" onChange={e=>setPasswordValue(e.target.value)}/>
            <br/>
            <input type="password" placeholder="Password Again" className="InputFieldR"onChange={e=>setPasswordAgainValue(e.target.value)}/>
            <br/>
            <button className="RegisterButton" onClick={registerBtnHandler}>Register</button>
            <hr/>
            <p>Already Have And Account?</p>
            <button className="showLoginFormBtn" onClick={showLoginFormHandler}>Login</button>
            {showSuccessMessage && <Success SuccessMessage={successMsg} closeButton={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={e=>setShowSuccessMessage(false)}>X</button>}/>}
            {showErrorMessage && <Error ErrorMessage={errorMsg}closeButton={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={e=>setShowErrorMessage(false)}>X</button>}/>}
       
        </div>
    )
}