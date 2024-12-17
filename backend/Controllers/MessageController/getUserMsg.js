const User = require('../../Models/User.model');
const Message = require('../../Models/messages.model');

const getUserMsg = async(req, res)=>{
    try {
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
      res.status(201).send({user: user, messages: messages})

      if (!user || !receiverId) {
         return res.status(404).json({ message: 'User or Receiver not found' });
     }
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
   


}

module.exports = getUserMsg;