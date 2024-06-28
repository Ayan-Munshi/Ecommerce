const express = require("express")
const router = express.Router()
const productModel = require("../models/productsModel")
const upload = require("../config/multer-config")

router.get("/",(req,res) => {
    res.send("product route is working")
})

router.post("/create",upload.single("picture"),async(req,res)=>{
   let {productname,discount,price,panelcolor,textcolor,bgcolor} = req.body 
   await productModel.create({
    picture: req.file.buffer,
    productname: productname,
    price:price,
    discount:discount,
    bgcolor:bgcolor,
    panelcolor: panelcolor,
    textcolor:textcolor
   })

   res.redirect("/shop")

})

module.exports = router