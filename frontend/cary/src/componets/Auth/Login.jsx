import { useState } from 'react'
import './Auth.css'
import Error from '../ErrorSuccessFolder/Error'
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai"
export default function Login({showLogin,setLogin,setIsLogin,setShowLoginForm,setGobalData}){
    const [emailValue,setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [showErrorMessage,setShowErrorMessage] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [showPassword,setShowPassword] = useState(false)
const showRegisterFormHandler=()=>{
    setLogin(false)
}
//this is the function for sending the details to the server 
const sendLoginDetails = async(email,password)=>{
    try{
        const res = await fetch("http://localhost:8080/login",{
            method : "POST",
            headers :{'content-type': "application/json"},
            body: JSON.stringify({email:email,password:password})
        })
        const data = await res.json();
        if(data.status){
            console.log(data.userData)
            setIsLogin(true)
            setGobalData(data.userData)
            setShowLoginForm(false)
        }else{
            setErrorMsg(data.msg)
            setShowErrorMessage(true)
        }
    }catch(error){
        console.log("This error Happened when tring to log in the user ",error)

    }
}
const loginBtnHandler=()=>{
    if(emailValue.length>0 && emailValue != "" && passwordValue.length>0 && passwordValue != ""){
        sendLoginDetails(emailValue,passwordValue)
    }else{
        setShowErrorMessage(true)
        setErrorMsg("Form Values Does not meet required Length")
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
        <div className="LoginForm">
            <h2 className='formTitle'>Login</h2>
            <input placeholder="Email" className="inputField" type="text" onChange={e=>setEmailValue(e.target.value)}/>
                <br/>
            <input placeholder="Password" type={showPassword ? "text" : "password"} className="inputField"  onChange={e=>setPasswordValue(e.target.value)}/>
            <button  onClick={showPasshandler} className={showPassword ? "seePassBtn red" : "seePassBtn green"}>{showPassword ? <AiFillEyeInvisible color='white'/> : < AiFillEye color='white' />}</button>
            <a className='forgotPasswordLink' href={"#"}>Forgot password ?</a>
            <button className="loginBtn" onClick={loginBtnHandler}>Login</button>
            <hr/>
            <span>Don't have and Account ?</span>
            <button className='btnShowRegister' onClick={showRegisterFormHandler}>Register</button>
            {showErrorMessage && <Error ErrorMessage={errorMsg} closeButton={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={e=>setShowErrorMessage(false)}>X</button>}/> }
        </div>
    )
}