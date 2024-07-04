const jwt = require("jsonwebtoken")
const userModel = require("../models/usersModel")

module.exports = async (req,res,next) => {
  
    if(!req.cookies.token){
       //req.flash("you need to login first")
       return res.redirect("/")
    }

    try{
      
        let data = jwt.verify(req.cookies.token,process.env.JWT_SECRET_KEY) //data contains email and id of the user
        let user = await userModel.findOne({email:data.email}).select("-password") // don't select password
        req.user = user
        next()
        
    }catch(error){
        //req.flash("error , something went wrong")
        res.send(error.message)  //for testing
        //res.redirect("/")
    }
}