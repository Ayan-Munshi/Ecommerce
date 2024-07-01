const express = require("express")
const isLoggedIn = require("../middlewares/isLoggedIn")
const router = express.Router()
const productsModel = require("../models/productsModel")

router.get("/",(req,res) => {
    
    res.render("register_form")
})

router.get("/shop",isLoggedIn, async(req,res) => {
    const allproducts = await productsModel.find()
    let flash_message = req.flash("success")  // this is for registration success
    let login_flash = req.flash("loginsuccess")  // this is for login success
    res.render("shop",{allproducts,flash_message,login_flash})
})

router.get("/login",(req,res) => {
    let  logout_flash = req.flash("logoutsuccess")
    res.render("login",{logout_flash})
})

module.exports = router