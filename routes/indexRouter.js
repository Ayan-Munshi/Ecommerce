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
    let deleteCartP_success = req.flash("deleteCartP_success")
    
    let total_price = 0
    usr.cart.map(product => {
      total_price = total_price + product.price
    })
    //console.log(total_price)
    res.render("cart",{cartuser:usr , deleteCartP_success , total_price})
} )


router.get("/deletecartP/:product_id",isLoggedIn,async(req,res) => {
    //console.log(req.user)
    let usr = await usersModel.findOne({email:req.user.email})
    //console.log("Current cart array:", usr.cart);
    usr.cart = usr.cart.filter(cart_Product_id => cart_Product_id.toString() !== req.params.product_id ) // had to convert the id into string firt
    await usr.save()
    //console.log("new cart array:", usr.cart);
    req.flash("deleteCartP_success","Product deleted from cart")
    res.redirect("/cart")
})


module.exports = router