import Login from "./Login"
import Register from "./Register"
import "./AuthMain.css"
import { useEffect, useState } from "react"
import CaryLogo from "../../../src/assets/cary-logo.png"
export default function AuthMain ({setIsUserlogedIn,setUserGlobalData}){
    useEffect(()=>{
        const canvas = document.getElementById("Canvas");
        const ctx =  canvas.getContext("2d")
        canvas.width = innerWidth-5;
        canvas.height = innerHeight-5;
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
        function drawLine(mX,mY,lineToX,lineToY){
            ctx.beginPath()
            ctx.moveTo(mX,mY)
            ctx.lineTo(lineToX,lineToY)
            ctx.strokeStyle = grd;
            ctx.stroke()
        }
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
                
                    //drawLine(mouse.x,mouse.y,this.x,this.y)
                
                this.draw()
            }
        }
        var arrayOfBalls = []
        function generateBalls() {
            for (var i = 0; i < 100; i++) {
                var positionX = Math.random() * (innerWidth - 30); 
                var positionY = Math.random() * (innerHeight - 30); 
                var radius = Math.floor(Math.random() * 30);
                var dx = Math.floor(Math.random() * 2 + 1);
                var dy = Math.floor(Math.random() * 2 + 1);
        
                var isOverlap = false;
                for (var j = 0; j < arrayOfBalls.length; j++) {
                    var existingBall = arrayOfBalls[j];
                    var distance = Math.sqrt(Math.pow((positionX - existingBall.x), 2) + Math.pow((positionY - existingBall.y), 2));
        
                    if (distance < radius + existingBall.radius) {
                        isOverlap = true;
                        break;
                    }
                }
        
                if (!isOverlap) {
                    arrayOfBalls.push(new Ball(positionX, positionY, radius, 0, 360, dx, dy));
                }
            }
        
            console.log(arrayOfBalls);
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
    const [showRegisterForm, setShowRegisterForm] = useState(false)
    return(
        <div>
            <canvas className="CanvasBackground" id="Canvas"/>
            <div className="MainAuthContainer">
                <div className="LeftSideContainer">
                    <img className="Carylogo" src={CaryLogo} alt="Cary Logo" />
                    <h1 className="Title">Cary For Rentors</h1>
                </div>
                <div className="RightSideContainer">
                    {!showRegisterForm && <Login setShowRegisterForm={setShowRegisterForm} setIsUserlogedIn={setIsUserlogedIn} setUserGlobalData={setUserGlobalData} />}
                    {showRegisterForm && <Register setShowRegisterForm={setShowRegisterForm} />}
                </div>
            </div>
        </div>
    )
}