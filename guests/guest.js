const mongoose = require("mongoose")

mongoose.model('guest', {
    name: {
        type: String,
        require: true
    },
    mail: {
        type: String,
        require: false
    }

})