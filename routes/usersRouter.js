const express = require("express");
const { registerUserAuth } = require("../controllers/authController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("users route working");
});

router.post("/create",registerUserAuth )

module.exports = router;
