const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    cart:{
        type:Array,
        default:[]
    },
    orderlist:{
        type:Array,
        default:[]
    },
    picture: String,
    contact: Number
})

module.exports = mongoose.model("user",userSchema)