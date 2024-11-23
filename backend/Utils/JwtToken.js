const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateToken= (id)=>{
     
    const jwtSecret = process.env.JWT_SECRET;
    console.log(jwtSecret)

    const Token = jwt.sign( {id}, jwtSecret, {expiresIn:"7d"})
    return Token;


}


module.exports = generateToken;