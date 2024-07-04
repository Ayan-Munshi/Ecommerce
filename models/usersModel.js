const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    cart:[{
        type:mongoose.Schema.Types.ObjectId,      // The cart array will contain ObjectIds that reference documents in the Product model 
        ref:"product"
    }],
    orderlist:{
        type:Array,
        default:[]
    },
    picture: String,
    contact: Number
})

module.exports = mongoose.model("user",userSchema)  // user is model name