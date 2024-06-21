//This controller file is just for code convenience
const userModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwt_creator } = require("../util/gen_token_func");

const registerUserAuth = async (req, res) => {
    let { name, email, password } = req.body;
    
    let userExist = await userModel.findOne({ email:email}) // to find that user/email already registered or not

    if(userExist) res.send("user already exists please login")
    else{

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
            res.redirect("/shop")
            //   res.send(token)
            //   console.log(token);
            //   res.send(createdUser);
            
          }
        });
      });
      } catch(error){
         res.send(error.message)
      }
    }  
    
  };



const loginUserAuth = async(req,res) => {
  let{email,password} = req.body

  let userExist = await userModel.findOne({email : email})

try{

  if(!userExist)   res.send("user does not exist please register first")
  else{
      bcrypt.compare( password , userExist.password , (error,result) => {
            if(error) res.send(error.message)
            
            else{
              if(result){
                let token = jwt_creator(userExist)
                res.cookie("token",token)
                //res.send("you have loggedin successfully")
                res.redirect("/shop")
              }else{
                res.send("invalid email or password")
              } 
            }  
            
      })
  } } catch(error){
     res.send(error.message)
  }

} 


module.exports = {registerUserAuth,loginUserAuth}