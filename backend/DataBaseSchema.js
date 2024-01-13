const mongoose = require("mongoose")
const UserAccountSchema = new mongoose.Schema({
    Name:String,
    Email: String,  
    PhoneNumber:String,
    Password:String,
    Role :String
})
const RentorAccountSchema = new mongoose.Schema({
    Name:String,
    Email: String,  
    PhoneNumber:String,
    Password:String,
    DealersLocation: String,
    Role :String
})
const UserBookSchema = new mongoose.Schema({
    Email : String,
    vehicleId : String,
    PickUpDate : String,
    PickUpLocation : String,
    DropOffDate : String,
    DropOffLocation : String,
    NoOfDaysBooked : String,
    PricePerDay : String,
    TotalPrice : String,
    vehicleImages : Array,
    DealerName : String,
    paymentMethod :String,
    PhoneNumber : String,
})
const VehicleSchema = new mongoose.Schema({
    vName : String,
    brandName: String,
    vColor : String,
    vNoOfSits : String,
    vClass : String,
    fuelType : String,
    vImage : Array,
    DealerLocation: String,
    DealerName : String,
    rentalPrice :String,
    gearType: String,
})
const CanceledBookingSchema  = new mongoose.Schema({
    Email : String,
    DealerName : String,
    vehicleImages : Array,
    CancelDate : {
        type : Date,
        default : Date.now
    },
    Reason : String,
})
const supportMessageSchema = new mongoose.Schema({
    From :String,
    To : String,
    senderRole : String,
    timeSent : {
        type : Date,
        default : Date.now
    },
    messageContent : String
})
const cancelBooking = mongoose.model("cancelBooking",CanceledBookingSchema)
const userAccount = mongoose.model("UserAccount", UserAccountSchema)
const UserBook = mongoose.model("UserBook",UserBookSchema);
const RentorAccount = mongoose.model("RentorAccount",RentorAccountSchema)
const vehicleStore = mongoose.model("vehicleStore",VehicleSchema)
const supportMesssages = mongoose.model("spMessages",supportMessageSchema)
module.exports = {userAccount,UserBook,RentorAccount,vehicleStore,cancelBooking,supportMesssages}