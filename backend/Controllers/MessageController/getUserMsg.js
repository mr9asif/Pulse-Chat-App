const User = require('../../Models/User.model');
const Message = require('../../Models/messages.model');

const getUserMsg = async(req, res)=>{
   const receiverid = req.params.id;
    
   const user = await User.findById(receiverid);
   console.log(user);



}

module.exports = getUserMsg;