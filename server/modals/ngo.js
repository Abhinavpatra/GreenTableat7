const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ngoSchema = new Schema({
    name: {
        type : String
    },
    address : {
        type : String
    },
    food : {
        type : String
    }
});

module.exports = mongoose.model('NGO', ngoSchema);