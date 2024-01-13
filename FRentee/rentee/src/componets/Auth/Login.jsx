import { useState } from 'react'
import './Login.css'
import Error from "../ErrorSuccessFolder/Error"
export default function Login ({setShowRegisterForm,setUserGlobalData,setIsUserlogedIn}) {
    const showRegisterFormHandler = () => {
        setShowRegisterForm(true)
    }
    const [emailValue,setEmailValue] = useState('')
    const [passwordValue,setPasswordValue] = useState('')   
    const [errorMsg,setErrorMsg] = useState('')
    const [showErrorMsgForm,setShowErrorMsgForm] =useState(false)
    
    //this function is sending the login details to the Server
    const sendLoginDetail = async(loginDetails)=>{
        try {
            const res = await fetch("http://localhost:8080/RentorLogin",{
                method : "POST",
                headers : {"content-type":"application/json"},
                body : JSON.stringify(loginDetails)
            })
            const data = await res.json();
            if(data.status){
                setIsUserlogedIn(true)
                setUserGlobalData(data.userData)
            }else{
                setErrorMsg(data.msg)
                setShowErrorMsgForm(true)
                
            }
        } catch (error) {
            console.log("this Error Happenend when sending the login details->",error)
        }
    }
    //this function is used to login the Renter of the Vehicle
    const loginHandler =()=>{
        if(emailValue.trim().length>0 && passwordValue.trim().length>0){
            const details = { Email : emailValue.trim(),Password : passwordValue.trim()}
            sendLoginDetail(details);
        }else{
            console.log("This form is not oky for submition")
            setErrorMsg("Error Field Value lenght to Short")
            setShowErrorMsgForm(true)
        }
    }
    return(
        <div className="LoginForm">
            <h2 style={{fontWeight:'bold',fontStyle:'oblique'}}>Welcome Back Rentor</h2>
            <input type="text" placeholder="Your Email"  className="InputField" onChange={e=> setEmailValue(e.target.value)}/>
            <br/>
            <input type="password" placeholder="Password" className="InputField" onChange={e=> setPasswordValue(e.target.value)}/>
            <br/>
            <button className="LoginBtn" onClick={loginHandler}>Login</button>
            <hr></hr>
            {/*
            <p>Dont Have An Account?</p>
            <button className='showRegisterForm' onClick={showRegisterFormHandler}>Register</button>
            */
            }
            {showErrorMsgForm && <Error ErrorMessage={errorMsg} closeButton={<button style={{border:'none',borderRadius:50,height:20, width:20, backgroundColor:'black', color:'white'}} onClick={e=>setShowErrorMsgForm(false)}>X</button>}/>}
        </div>
    )
}