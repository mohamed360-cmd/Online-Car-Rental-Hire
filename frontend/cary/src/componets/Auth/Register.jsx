import { useState } from "react"
import Error from "../ErrorSuccessFolder/Error"
import Success from "../ErrorSuccessFolder/Success"
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai"

export default function Register({showLogin,setLogin}) {
    const [EmailValue,setEmailValue] = useState('')
    const [ nameValue ,setNameValue] = useState('')
    const [phoneNumberValue, setPhoneNumberValue] =useState()
    const [ PasswordValue ,setPasswordValue] = useState('')
    const [ PasswordAgainValue,setPasswordAgainValue] = useState('')
    const [ showErrorMessage,setShowErrorMessage] =useState(false)
    const [errorMsg,setErrorMsg] = useState('')
    const [showSuccessMessage,setShowSuccessMessage] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    const showLoginFormHandler=()=>{
        setLogin(true)
    }
    //function for sending the details to the server for registration
    const registerUser = async (datatoBeSent) => {
        try {
            const res = await fetch("http://localhost:8080/register",{
                method : 'POST',
                headers : {"content-type" : "application/json"},
                body : JSON.stringify(datatoBeSent)
            })
            const data = await res.json()
            if(data.status){
                setShowSuccessMessage(false)

                setShowErrorMessage(true)
                setErrorMsg(data.msg)
            }else{
                setShowErrorMessage(false)
                setShowSuccessMessage(true)
            }
        } catch (error) {
            console.log("This error happened when trying to send the register info to the server->",error)
        }
    }
    //function for registering the user  presses the register btn
    const registerBtnHandler =()=>{
        if(EmailValue.trim().length>=1 && EmailValue.trim() != "" && nameValue.trim() .length>=1 && nameValue.trim()  != "" && phoneNumberValue.trim() .length>=1 && phoneNumberValue.trim()  != "" && PasswordValue.trim() .length>=1 && PasswordValue.trim()  != "" && PasswordAgainValue.trim() .length>=1 && PasswordAgainValue.trim()  != ""){
            if(PasswordValue == PasswordAgainValue){
                const registraData = {
                    Email :EmailValue,
                    Name : nameValue,
                    PhoneNumber : phoneNumberValue,
                    Password :PasswordValue
                }      
                registerUser(registraData)
            }else{
                setShowErrorMessage(true)
                setErrorMsg("Password are not equal")
            }

        }else{
            setShowErrorMessage(true)
            setErrorMsg("Registration form Error Lenght on input Values")

        }
    }
    const showPasshandler =()=>{
    if(showPassword){
        setShowPassword(false)
    }else{
        setShowPassword(true)
    }
}
    return(
        <div className="registerForm">
            <h2 className="formTitle">Register</h2>
            <input type="text" placeholder="Email" className="inputField" onChange={e=>setEmailValue(e.target.value)}/>
            <input type="text" placeholder="Your Name" className="inputField" onChange={e=>setNameValue(e.target.value)}/>
            <input type="text" placeholder="PhoneNumber" className="inputField" onChange={e=>setPhoneNumberValue(e.target.value)}/>
            <input type={showPassword ? "text" : "password"} placeholder="Password" className="inputField" onChange={e=>setPasswordValue(e.target.value)}/>
            <input type={showPassword ? "text" : "password"} placeholder="Enter Password Again" className="inputField"onChange={e=>setPasswordAgainValue(e.target.value)}/>
            <button  onClick={showPasshandler} className={showPassword ? "seePassBtn red" : "seePassBtn green"}>{showPassword ? <AiFillEyeInvisible color='white'/> : < AiFillEye color='white' />}</button>
            <button className="registerBtn" onClick={registerBtnHandler}>Register</button>
            <hr/>
            <span>Already have and Account?</span>
            <button className="showLoginBtn" onClick={showLoginFormHandler}>Login</button>
            {showSuccessMessage && <Success SuccessMessage={"Registration Successfuly Now Login "} closeButton={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={e=>setShowSuccessMessage(false)}>X</button>}/>}
            {showErrorMessage && <Error ErrorMessage={errorMsg}closeButton={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={e=>setShowErrorMessage(false)}>X</button>}/>}
        </div>
    )
}