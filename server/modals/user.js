const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    restaurantId : {
        type : String,
        required : true
    },
    address : {
        type : String
    },
    food : {
        type : String
    }
});

module.exports = mongoose.model('User', userSchema);