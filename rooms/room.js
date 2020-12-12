const mongoose = require("mongoose");

mongoose.model("room", {

   roomType: {
       type: String,
       require: true
   },
   Price: {
       type: Number,
       require: true
   },
   numberOfPeople: {
       type: Number,
       require: true
   }
});