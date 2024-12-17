const User = require('../../Models/User.model');
const Message = require('../../Models/messages.model');

const getUserMsg = async(req, res)=>{
   // const receiverid = req.query.id;
   // console.log(receiverid)
   // const user = JSON.parse(req.params.user);
   // console.log(user)
   const { userId, receiverId } = req.query;
   console.log(userId , receiverId)
    
      const user = await User.findById(receiverId);

      const messages = await Message.find({
         $or: [
             { sender: userId, receiver: receiverId },
             { sender: receiverId, receiver: userId }
         ]
     })
      console.log(user)
      console.log(messages)


}

module.exports = getUserMsg;