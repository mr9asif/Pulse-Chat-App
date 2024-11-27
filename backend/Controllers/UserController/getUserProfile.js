const User = require('../../Models/User.model')
const getUserProfile = async(req, res)=>{
    try {
        const user = await User.findOne(req.user._id).select("-password");
        if(!user){
            // res.status(401).send({message:"user not found!"});
            throw new Error('User not found');
        }
        // res.json(user);
        return user;
    } catch (error) {
        // res.send({message:"server eroror"})
        console.log(error)
    }
}

module.exports = getUserProfile;