const express = require("express")
const isLoggedIn = require("../middlewares/isLoggedIn")
const router = express.Router()

router.get("/",(req,res) => {
    res.render("register_form")
})

router.get("/shop",isLoggedIn,(req,res) => {
    res.render("shop")
})

router.get("/login",(req,res) => {
    res.render("login")
})

module.exports = router