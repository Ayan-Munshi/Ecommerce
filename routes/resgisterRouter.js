const express = require("express")
const router = express.Router()

router.get("/",(req,res) => {
    res.render("register_form")
})

module.exports = router