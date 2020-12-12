const express=require("express");
const app =express();
const bodyParser = require("body-parser");
var path = require('path');
var urlParser = bodyParser.urlencoded({extended:false});
const hostname='0.0.0.0';

app.use(bodyParser.json());

const mongoose = require("mongoose");

require("./guest")
const guest=mongoose.model("guest")

mongoose.connect("mongodb+srv://LaasyaSree:less@12345@cluster0.ywaot.mongodb.net/customers?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true} ,() =>{
  console.log("Success!");
})

app.get("/guests", (req,res) => {
  guest.find().then((guests) => {
      res.json(guests)
  }).catch(err => {
      if(err){
          throw err
      }
  })
})

app.post("/guest",urlParser,async (req,res) => {
  var newGuest = {
    name: req.body.name,
    mail: req.body.mail
  }
  
  var guest1 = new guest(newGuest)
  guest1.save().then(() => {
    res.send("new guest added")
}).catch((err) => {
  if(err){
    throw err
  }
})
})


app.get("/guest1", function(req,res){
  console.log(req.params);
  res.sendFile(path.join(__dirname,'guests.html'));
  console.log(__dirname)
});

app.get("/guest/:id",(req,res) => {
  guest.findById(req.params.id).then((guest1) => {
      if(guest1){
          res.json(guest1)
      }else{
          res.sendStatus(404);
      }
  


  }).catch(err => {
      if(err){
          throw err
      }
  })
  
})

app.delete("/guest/:id", (req,res) => {
  Book.findOneAndRemove(req.params.id).then(() => {
      res.send("Guest removed")
  }).catch(err => {
      if(err){
          throw err
      }
  })
})

app.listen(3001, hostname, () =>{
    console.log("Working!")
})