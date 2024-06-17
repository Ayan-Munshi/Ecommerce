const express = require("express")
const isLoggedIn = require("../middlewares/isLoggedIn")
const router = express.Router()

router.get("/",(req,res) => {
    res.render("register_form")
})

router.get("/profile",isLoggedIn,(req,res) => {
    res.send("profile")
})

module.exports = router