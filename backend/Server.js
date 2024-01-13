const express = require("express")
const app = express();
const cors = require("cors")
const mongoose = require('mongoose')

const {userAccount,UserBook,RentorAccount,vehicleStore,cancelBooking,supportMesssages} = require("./DataBaseSchema")
mongoose.connect("mongodb://127.0.0.1:27017/CaryRentals")
const db = mongoose.connection;
db.on("error",(error)=>{
    console.log("This error Ocured when connection to the database->",error)
})
db.once("open",(e)=>{
    console.log("Connected to the database Succesfuly")
})
app.use(express.json({limit : '250mb'}))
app.use(cors())
//function for login in the user
const Check_User_Exist = async(email,password)=>{
    try {
        const result = await userAccount.findOne({Email:email,Password:password})
        if(result){
            return {status : true, msg : `Welcome Back ${email}`,userData :result }
        }else{
            return {status : false ,msg : `Wrong Email or Password` }
        }
    } catch (error) {
        
    }
}

//this route handles the Login Details
app.post("/login",async( req,res)=>{
    const {email ,password} = req.body;
        const functionResult = await Check_User_Exist(req.body.email,req.body.password)

        if(functionResult.status){
            res.json(functionResult)
        }else{
            res.json(functionResult)
        }
})
//this is the function that check if the email name or phone number is taken
const Email_Number_Checker = async (email,name,mobileNumeber)=>{
    try {
        const checkEmail = await userAccount.findOne({ Email : email})
        const checkName = await userAccount.findOne({Name : name})
        const checkPhoneNumber = await userAccount.findOne({PhoneNumber :mobileNumeber})
        if(checkEmail || checkName || checkPhoneNumber){
            return {
                status :true,
                msg :'Account Already Taken',
            }
        }else{
            return {
                status : false,
                msg : 'Success You Have Been registred ,Now Login',
            }
        }
    } catch (error) {
        
    }
}
//this is the route to handle the registraion of users 
app.post("/register",async (req,res)=>{
    const { Email ,Name ,PhoneNumber ,Password,Role} = req.body
    const checker_Results = await Email_Number_Checker(Email,Name,PhoneNumber)
    if(!checker_Results.status){
        //this is when the the account does not exist 
        const newUser = await userAccount.create({Name : Name ,Email : Email, PhoneNumber : PhoneNumber ,Password : Password,Role})
        newUser.save()
        res.json(checker_Results)
    }else{
        res.json(checker_Results)
    }
})
//this route is to get all the vehicles available
app.get("/getVehicles",async(req,res)=>{
    try {
        const vehicleList = await vehicleStore.find();
        res.json({status:true ,vehicleData : vehicleList})
    } catch (error) {
        console.log("This happened when getting the Vehicles->",error)
    }
})
//this route takes the rental details from the frontend and saves it to the database
app.post("/Rental",async(req,res)=>{
    try {
        const {Email,PhoneNumber,VehicleId,PickUpDate,PickUpLocation,DropOffDate,DropOffLocation,NoOfDaysBooked,PricePerDay ,TotalPrice ,vehicleImages,DealerName,ModeOfPayment} = req.body;
        const newBooking = await UserBook.create( {Email,PhoneNumber,VehicleId,PickUpDate,PickUpLocation,DropOffDate,DropOffLocation,NoOfDaysBooked,PricePerDay ,TotalPrice ,vehicleImages,DealerName, paymentMethod : ModeOfPayment})
        newBooking.save()
        res.json({msg : ' Successfuly Booked .Got to DashBoard To see Your Bookings',status :true})
    } catch (error) {
        console.log("errorin Rental route->",error)
    }
})
//this route will get the car the user has booked 
app.post("/myRentalBooking",async(req,res)=>{
    try {
        const {emailValue} = req.body;
        const myVehicleRental = await UserBook.find({Email:emailValue})
        if(myVehicleRental){
            res.json({status:true, myBookingsData :myVehicleRental})
        }else{
            res.json({status:false, myBookingsData :null})
        }
    } catch (error) {
        
    }
})
//this route handles the the cancelations of bookings 
app.post("/Cancel",async(req,res)=>{
    try {
        const {_id,Email,DealerName,vehicleImages,Reason} = req.body
        console.log("hit")
        const deleteResult = await UserBook.deleteOne({_id})
        if(deleteResult.acknowledged){
            res.json({status : true , msg: "This Booking has been Cancled "})
        }else{
            res.json({status:false, msg:"Something Happened Try again or contact Support"})
        }

        const newDeleteBooking = await cancelBooking.create({Email,vehicleImages,DealerName,Reason})
        newDeleteBooking.save()
        
    } catch (error) {
        console.log("this happened when Canceling",error)
    }
})
//this route is for the saving the messages between the client and the support 
app.post("/spMessageSave",async(req,res)=>{
    try {
        const {From,To,messageContent,senderRole} = req.body;
        const saveMessage = await supportMesssages.create({From,To,messageContent,senderRole});
        saveMessage.save();
    } catch (error) {
        console.log("Error on spMessageSave Route server->",error)
    }
})
//this route is for retreaving messages between the user an the support 
app.post("/spMessageGet",async(req,res)=>{
    try{
        const {Email} = req.body;
        const messages = await supportMesssages.find({
            $or: [{ From: Email }, { To: Email }]
          });
        res.json(messages)
    }catch(error){
        console.log("Error on spMessageGet Route server->",error)
    }
})
/*               |-----------------------------------------------------------------------------------------------|
--------------------------------------------------------- RENTORS SECTION ------------------------------------------------------------
                 |-----------------------------------------------------------------------------------------------|
*/

//this function checks if the account of the Rentor is already taken
const rentorAccountExist = async(email,PhoneNumber,Name)=>{
    try{
        const resultOfCheck = await RentorAccount.findOne({Email :email,Name:Name,PhoneNumber:PhoneNumber})
        if(resultOfCheck){
            //if the result is not null
            return {status: true, msg:"Account Taken"}
        }else{
            return { status:false,msg:"Welcome As A Rentoor Now Login",}
        }
    }catch(error){
        console.log("This error happened when trying to chech if the Rentor Account Exists ->",error)
    }
}

//rentors register route
app.post("/RentorRegistor",async(req,res)=>{
    const {Email,Name,PhoneNumber,Password,Role,DealersLocation} = req.body;
    const checkFunctionResult = await rentorAccountExist(Email,PhoneNumber,Name)
    console.log(Email,Name,PhoneNumber,Password,Role,DealersLocation)
     if(checkFunctionResult.status){
        res.json({
            msg:"This Account Is Taken",
            status: false
        })
     }else{
        const newRentor= await RentorAccount.create({Name,Email,PhoneNumber,Password,Role,DealersLocation : DealersLocation})
        newRentor.save();
        res.json({
            msg:"Welcome Rentor🎉 Your Account Has Been Created Now Login",
            status: true
        })
     }
})
//function for chechiking if the Rentors Account Exits
const checkIfAccountExist = async (email,password)=>{
    try {
        const checkResults = await RentorAccount.findOne({Email :email, Password :password})
        if(checkResults){
            //if it is not null meaning its their 
            return {status:true, userData:checkResults}
        }else{
            return {status:false, userData:null , msg:"😲 Wrong Email or Password"}
        }
    } catch (error) {
        console.log("This Happend when checking if the Rentors Account exits",error)
    }
}
//this is the login route for the RENTOR
app.post("/RentorLogin",async(req,res)=>{
    const {Email,Password} = req.body ;
    const checkFunctionResult = await checkIfAccountExist(Email,Password);
    if(checkFunctionResult.status){
        res.json(checkFunctionResult)
    }else{
        res.json(checkFunctionResult)
    }
})
//this route handles when the rentol uploads a new car for rent
app.post("/CarUpload",async(req,res)=>{
    try {
        const {
            vName,
            brandName,
            vColor,
            vNoOfSits,
            vClass,
            fuelType,
            vImage,
            DealerLocation,
            DealerName,
            rentalPrice,
            gearType
        } = req.body

      const newCarUpload = await vehicleStore.create({          
            vName,
            brandName,
            vColor,
            vNoOfSits,
            vClass,
            fuelType,
            vImage,
            DealerLocation,
            DealerName,
            rentalPrice,
            gearType})
            newCarUpload.save();
           res.json({status:true,msg:"Success Upload Completed (͠≖ ͜ʖ͠≖)👌"})
           
    } catch (error) {
        console.log("This happened when trying to save the new vehicle upload ->",error)
        res.json({status:false,msg:"Error in uploading try again or contact Support "})
    }
})
//this is getting the listings of the  Rentor using using the DealerName
app.post("/getMyListings",async(req,res)=>{
    try {
        const {DealerName} = req.body;
        const listingsResult = await vehicleStore.find({DealerName:DealerName})
        if(listingsResult.length > 0){
            res.json({status : true, vehicleData : listingsResult})
        }else{
            res.json({status : false, vehicleData : listingsResult})
        }
    } catch (error) {
        console.log("This happened when trying to get the listing of the rentor ->",error)
    }
})
//this route will be when the rentor whats to know who has rented his or her car 
app.post("/bookedCar",async(req,res)=>{
    try{
        const {DealerName} = req.body
        const rentedList = await  UserBook.find({DealerName:DealerName});
        if(rentedList.length>0){
            res.json({status : true, details :rentedList})
        }else{
            res.json({status : false, details :rentedList})
        }
    }catch(error){
        console.log("Error in bookedCar Route ->",error)
    }
})
//this is the function for getting the list 
const getCancelList = async(rentorsName)=>{
    try {
        const result = await cancelBooking.find({DealerName:rentorsName})
        if(result.length>0){
            return({status:true,listData : result})
        }else{
            return({status:false,listData : null})
        }
    } catch (error) {
        console.log("Error in 'getCancelList' function ->",error)
    }
}
//this gets the list of cars which where cancled
app.post("/CanceledList",async(req,res)=>{
    try {
        const {DealerName} = req.body
        const functionResult = await getCancelList(DealerName)
        res.json(functionResult)
        
    } catch (error) {
        
    }
})


app.listen(8080,console.log("Server is Acitve And listening"))