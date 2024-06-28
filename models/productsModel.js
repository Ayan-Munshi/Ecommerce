const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    productname: String,
    price:Number,
    picture:Buffer,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor:String,
    panelcolor: String,
    textcolor:String
})

module.exports = mongoose.model("product",productSchema)