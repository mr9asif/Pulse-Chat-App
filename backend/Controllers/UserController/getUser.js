const jwt = require("jsonwebtoken");
const User = require("../../Models/User.model");
const getUser = async(req, res)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).send({message:"token not find & user not authenticated"});
        }

        // varify user
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user = await User.findById(decoded.id).select('-password');

          if(!user){
           return res.status(403).send({message:"user not found or unauthorize token"});
          }
          
          res.status(201).json({user});

    } catch (error) {
        res.send(error);
        console.log(error)
    }
}

module.exports = getUser;