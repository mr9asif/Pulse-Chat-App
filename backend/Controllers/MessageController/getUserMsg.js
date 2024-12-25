const User = require('../../Models/User.model');
const Message = require('../../Models/messages.model');

const getUserMsg = async(req, res)=>{
    try {
      const { userId, receiverId } = req.query;
   console.log("u",userId ,"r", receiverId)
   console.log("object")
    
      const user = await User.findById(receiverId);
      if (!user || !receiverId) {
         return res.status(404).json({ message: 'User or Receiver not found' });
     }

      const messages = await Message.find({
         $or: [
             { sender: userId, receiver: receiverId },
             { sender: receiverId, receiver: userId }
         ]
     })
      // console.log(user)
      console.log(messages)
      return res.status(201).send({user: user, messages: messages})

    } catch (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
   


}

module.exports = getUserMsg;