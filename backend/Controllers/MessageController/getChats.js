const Message = require('../../Models/messages.model')
const getChats = async(req, res)=>{
     try {
        const {user}= req;
        console.log(user);
        const senderId = user.id;
        const chatMsg = await Message.find({sender: senderId});
        res.send(chatMsg)
     } catch (error) {
        res.send(error)
     }
}

module.exports = getChats;