const mongoose = require('mongoose')

mongoose.model("booking", {
    customerID:{
        type: mongoose.SchemaTypes.ObjectId,
        required:true
    },
    roomID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true

    },
    checkIn: {
        type: Date,
        require:true
    },
    checkOut:{
        type:Date,
        require:true
    }
})