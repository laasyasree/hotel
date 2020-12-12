const express=require("express");
const app =express();
const bodyParser = require("body-parser");
var path = require('path');
var urlParser = bodyParser.urlencoded({extended:false});
app.use(express.static(path.join(__dirname, 'smtg')));

app.use(bodyParser.json());

const mongoose = require("mongoose");

require("./room")
const room=mongoose.model("room")

mongoose.connect("mongodb+srv://LaasyaSree:less@12345@cluster0.ywaot.mongodb.net/roomservices?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true} ,() =>{
  console.log("Success!");
})

app.get("/rooms",(req,res) => {
  room.find().then((rooms) => {
      res.json(rooms)
  }).catch((err) => {
      if(err){
          throw err;
      }
  })
  })


app.get('/', (req,res) => {
  console.log(req.params);
  res.sendFile(path.join(__dirname,'smtg/index.html'));
  console.log(__dirname)
})


app.post("/room", urlParser,async (req,res) => {
  var newRoom = {
    roomType: req.body.roomType,
    Price: req.body.Price,
    numberOfPeople: req.body.numberOfPeople
  }
  
  var Room1 = new room(newRoom)
  Room1.save().then(() => {
    res.send("new room created")
}).catch((err) => {
  if(err){
    throw err;
  }
})
})

app.post("/login", urlParser,async (req,res) => {
  var newlogin = {
    username: req.body.username,
    pwd: req.body.pwd,
  }
  
  var login1 = new login(newlogin)
  login1.save().then(() => {
    res.send("new login")
}).catch((err) => {
  if(err){
    throw err;
  }
})
})

app.get("/room1", function(req,res){
  console.log(req.params);
  res.sendFile(path.join(__dirname,'smtg/rooms.html'));
  console.log(__dirname)
});


app.get("/room/:id",(req,res) => {
  room.findById(req.params.id).then((Room1) => {
      if(Room1){
          res.json(Room1)
      }else{
          res.sendStatus(404);
      }
  


  }).catch(err => {
      if(err){
          throw err;
      }
  })
  
})

app.delete("/room/:id", (req,res) => {
  Book.findOneAndRemove(req.params.id).then(() => {
      res.send("Room removed")
  }).catch(err => {
      if(err){
          throw err;
      }
  })
})

module.exports=app;
app.listen(3000, () =>{
    console.log("Working!")
})