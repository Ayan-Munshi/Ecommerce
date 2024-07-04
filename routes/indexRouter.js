const express = require("express")
const isLoggedIn = require("../middlewares/isLoggedIn")
const router = express.Router()
const productsModel = require("../models/productsModel")
const usersModel = require("../models/usersModel")

router.get("/",(req,res) => {
    
    res.render("register_form")
})

router.get("/shop",isLoggedIn, async(req,res) => {
    const allproducts = await productsModel.find()
    let flash_message = req.flash("success")  // this is for registration success
    let login_flash = req.flash("loginsuccess")  // this is for login success
    let cart_success = req.flash("addtocart")
    res.render("shop",{allproducts,flash_message,login_flash,cart_success})
})

router.get("/login",(req,res) => {
    let  logout_flash = req.flash("logoutsuccess")
    res.render("login",{logout_flash})
})


router.get("/addtocart/:product_id",isLoggedIn,async(req,res) => {
    //console.log(req.user)
    let usr = await usersModel.findOne({email : req.user.email})
    usr.cart.push(req.params.product_id)
    await usr.save()
    req.flash("addtocart","added to cart..")
    res.redirect("/shop")
    
})


router.get("/cart",isLoggedIn,async(req,res) => {
    let usr = await usersModel.findOne({email: req.user.email}).populate("cart")
    res.render("cart",{cartuser:usr})
} )


router.get("/deletecartP/:product_id",isLoggedIn,async(req,res) => {
    console.log("product")
})


module.exports = router