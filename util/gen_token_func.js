// this func will go to authController file
const jwt = require("jsonwebtoken")

const jwt_creator = (createdUser) => {
   return jwt.sign({email:createdUser.email,id:createdUser._id},process.env.JWT_SECRET_KEY) // return keyword is important here
    
}

module.exports = {jwt_creator}