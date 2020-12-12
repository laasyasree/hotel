const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const axios = require("axios")
var path = require('path');
var urlParser = bodyParser.urlencoded({extended:false});

app.use(bodyParser.json())
mongoose.connect("mongodb+srv://LaasyaSree:less@12345@cluster0.ywaot.mongodb.net/bookings?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true} ,() =>{
  console.log("Success!");
})

require("./booking")
const booking = mongoose.model("booking")

app.post("/bookings",urlParser,async(req,res)=> {
    var newBooking = {
        customerID:mongoose.Types.ObjectId(req.body.customerID),
        roomID:mongoose.Types.ObjectId(req.body.roomID),
        checkIn:req.body.checkIn,
        checkOut:req.body.checkOut
    }

    var booking1 = new booking(newBooking)

    booking1.save().then(() => {
        res.send("Booking done")
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.get("/booking1",(req,res) => {
    booking.find().then((bookings) => {
        res.json(bookings)
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
    })

    app.get("/booking123", function(req,res){
        console.log(req.params);
        res.sendFile(path.join(__dirname,'bookings.html'));
        console.log(__dirname)
      });
      

app.get("/bookings/:id",(req,res) => {
    booking.findById(req.params.id).then((booking1) => {
        if(booking1){
                axios.get("http://localhost:3001/customer/" + booking1.customerID).then((response) => {
                   var bookingObject = {customername: response.data.name, roomType: ''}

                   axios.get("http://localhost:3000/room/"+ booking1.roomID).then((response) => {
                       bookingObject.roomType  = response.data.roomType
                       res.json(bookingObject)
                   })

                })
                
        }
        else{
            res.send("Invalid")
        }
    })
})

app.listen(3002, () => {
    console.log("Booking service")
})