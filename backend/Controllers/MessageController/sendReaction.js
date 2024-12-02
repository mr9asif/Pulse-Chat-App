const Message = require('../../Models/messages.model');
const mongoose = require('mongoose');

const sendReaction = async(req, res)=>{
     const {msgId} = req.params;
     const {reaction}= req.body;
     const userId = req.user.id;
     
     
     try {
             const msg = await Message.findById(new mongoose.Types.ObjectId(msgId));
            const message = await Message.findById(msg);
            if(!message){
               res.status(400).json({message:"message not found"});
            }
           // Check if the user has already reacted
    const existingReactionIndex = message.reactions.findIndex(
        (r) => r.user.toString() === userId // Convert ObjectId to string for comparison
      );
  
      if (existingReactionIndex !== -1) {
        // User already reacted, update the reaction
        message.reactions[existingReactionIndex].reaction = reaction;
      } else {
        // User has not reacted, add a new reaction
        message.reactions.push({ user: userId, reaction });
      }
            
              await message.save();
       
              res.status(200).send({message:"reaction added successfully"});
       
         } catch (error) {
            console.log(error)
                res.status(500).send({message:error});
         }
}

module.exports = sendReaction;