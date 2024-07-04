const express = require("express");
const { registerUserAuth , loginUserAuth,logoutUserAuth} = require("../controllers/authController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("users route working");
});

router.post("/create",registerUserAuth )   // these Auths are comming from controller

router.post("/login",loginUserAuth)

router.get("/logout",logoutUserAuth)

module.exports = router;
