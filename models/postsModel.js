const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    productname: String,
    price:Number,
    picture:String,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor:String,
    panelcolor: String,
    textcolor:String
})

module.exports = mongoose.model("posts",postSchema)