import { useState,useEffect } from "react"
import './Auth.css'
import Login from "./Login"
import Register from "./Register"
export default function AuthRoot({setShowLoginForm,setIsLogin,setGobalData}){
    const [showLogin,setLogin]=useState(true)
    const closeAuthFormHandler=()=>{
        setShowLoginForm(false)
    }
    ///Background animation code
    useEffect(()=>{
        const canvas = document.getElementById("Canvas");
        const ctx =  canvas.getContext("2d")
        canvas.width = innerWidth-20;
        canvas.height = innerHeight-50;
        const grd = ctx.createLinearGradient(0, 0, innerWidth, innerHeight);
        grd.addColorStop(0.1, "#F62691");
        grd.addColorStop(0.2,"#C1C168")
        grd.addColorStop(0.3,"#F16A63")
        grd.addColorStop(0.4, "#F48A3F")
        grd.addColorStop(0.6,"#B267C5")
        grd.addColorStop(0.8,"#84D78D")
        grd.addColorStop(0.9,"#6C88E1")
        grd.addColorStop(1,"#45B9D8")

        var mouse = {
            x : undefined,
            y : undefined
        }
        document.addEventListener("mousemove",(event)=>{
            mouse.x = event.x
            mouse.y = event.y
        })
        class Ball{
            constructor(x,y,radius,startAngle,EndAngle,dx,dy) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.startAngle = startAngle;
                this.EndAngle = EndAngle;
                this.dx = dx;
                this.dy = dy;

            }
            draw(){
                ctx.beginPath()
                ctx.arc(this.x,this.y,this.radius,this.startAngle,this.EndAngle)
                ctx.fillStyle = grd;
                ctx.strokeStyle = "black"
                ctx.fill()
                ctx.stroke()
            }
            update(){
                this.x += this.dx;
                this.y +=this.dy;
                if(this.x + this.radius >canvas.width  || this.x +this.radius < 0){
                    this.dx = -this.dx;
                }
                if(this.y + this.radius > canvas.height+10 || this.y +this.radius < 0){
                    this.dy = -this.dy;
                }

                this.draw()
            }
        }
        var arrayOfBalls = []
        function generateBalls() {
            for(var i =0 ; i < 100; i++){
                var postionX = (Math.random() * innerWidth);
                var postionY = (Math.random() * innerHeight);
                var radius = Math.floor(Math.random() * 15);
                var dx = Math.floor(Math.random() * 3 +1);
                var dy = Math.floor(Math.random() *  3+1);
                arrayOfBalls.push(new Ball(postionX,postionY,radius,Math.floor(Math.random()*100),360,dx,dy))
            }
            console.log(arrayOfBalls)
        }
        generateBalls();
        
        function animation() {
            
            ctx.clearRect(0,0,canvas.width,canvas.height);
            arrayOfBalls.forEach(ball => {
                ball.update()
            });

            requestAnimationFrame(animation)
        }
        animation();
    },[])
    return(
        <div className="holdingMain">

        <canvas className="CanvasBackground" id="Canvas"/>

        <div className="MainAuthContainer">
            {showLogin && <Login setLogin={setLogin} showLogin={showLogin} setIsLogin={setIsLogin} setShowLoginForm={setShowLoginForm} setGobalData={setGobalData}/>}
            {!showLogin && <Register setLogin={setLogin} showLogin={showLogin}/>}
            <button className="closePopUpBtn" onClick={closeAuthFormHandler}>Close</button>
        </div>
        </div>
    )
}