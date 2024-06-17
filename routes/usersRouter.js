const express = require("express");
const { registerUserAuth , loginUserAuth} = require("../controllers/authController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("users route working");
});

router.post("/create",registerUserAuth )

router.post("/login",loginUserAuth)

module.exports = router;
