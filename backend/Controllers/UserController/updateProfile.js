const User = require('../../Models/User.model');
const getUserProfile = require('./getUserProfile');
const updateUserProfile = async(req, res)=>{
   try {
    const user =await getUserProfile(req);
    //    res.send({data:user})
        
    //    update
     user.fullname = req.body.fullname || user.fullname;
     user.username = req.body.username || user.username;
     user.image = req.body.image || user.image;
        
     await user.save();
    
     res.status(200).send({ message: "Profile updated successfully", data: user });
   } catch (error) {
     res.send({error: error})
   }
};

module.exports = updateUserProfile;