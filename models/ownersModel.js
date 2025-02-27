const mongoose = require("mongoose")
// owner was created through postman

const ownerSchema = mongoose.Schema({
    fullname: {
        type:String,
        trim:true,
        minLength:4
    },
    email: String,
    password: String,
    products:{
        type: Array,
        default:[]
    },
    picture: String,
    GST : String
})

module.exports = mongoose.model("owner",ownerSchema)