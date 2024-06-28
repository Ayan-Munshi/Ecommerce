const express = require("express")
const isLoggedIn = require("../middlewares/isLoggedIn")
const router = express.Router()
const productsModel = require("../models/productsModel")

router.get("/",(req,res) => {
    res.render("register_form")
})

router.get("/shop",isLoggedIn, async(req,res) => {
    const allproducts = await productsModel.find()
    res.render("shop",{allproducts})
})

router.get("/login",(req,res) => {
    res.render("login")
})

module.exports = router