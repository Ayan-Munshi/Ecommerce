const express = require("express");
const router = express.Router();
const userModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("users route working");
});

router.post("/create", (req, res) => {
  let { name, email, password } = req.body;

  try{ 

    bcrypt.genSalt(10, (salterror, salt) => {

    if (salterror) res.send(error.message);

    bcrypt.hash(password,salt, async (hasherror, hashedpwd) => {
        
      if (hasherror) res.send(error.message);
      else {
        let createdUser = await userModel.create({
          name: name,
          email: email,
          password: hashedpwd,
        });
        res.send(createdUser);
      }
    });
  });
  } catch(error){
     res.send(error.message)
  }
});

module.exports = router;
