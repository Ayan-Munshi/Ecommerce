//This controller file is just for code convenience
const userModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwt_creator } = require("../util/gen_token_func");

const registerUserAuth = (req, res) => {
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
  
          // adding token to cookie
          let token = jwt_creator(createdUser)  //jwt_creator() func is comming from (gen_token_func) file
          res.cookie("token",token)
          
        //   res.send(token)
        //   console.log(token);
          
          res.send(createdUser);
        }
      });
    });
    } catch(error){
       res.send(error.message)
    }
  };



module.exports = {registerUserAuth}