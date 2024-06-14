const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownersModel");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("owners route is working");
});

console.log(process.env.NODE_ENV); // this will show (undefined) at first because we didnt set environment var "NODE_ENV" to "development"/"production"
// so we need to run (export NODE_ENV=development)(dont add extra space)

if (process.env.NODE_ENV === "development") {
  //console.log("testing")
  router.post("/create", async (req, res) => {
    // route is (/owners/create)
try{
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(503).send("owner already exists cant create new owner"); // if any owner already exists then send status code 503(service unavailable) else create owner
    }

    let { fullname, email, password } = req.body; // testing by postman

    let createdowner = await ownerModel.create({
      fullname: fullname,
      email: email,
      password: password,
    })
    return res.send(createdowner);
}catch(error){
  return res.send(error.message)
}

   })
}

module.exports = router;
