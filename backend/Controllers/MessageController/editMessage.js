const Message = require('../../Models/messages.model');
const mongoose = require('mongoose');

const editMessage = async(req, res)=>{
     const {msgId}=req.params;
     const {content}= req.body;
     const userId = req.user.id;
     console.log(content);
     
     try {
          const msg = await Message.findById(msgId);
          if(!msg){
               res.status(401).json({message:"message not available"});
          }
          // console.log(msg.content)
          // console.log(msg)
          const senderId = msg.sender.toString();
          if(userId !== senderId){
               res.status(401).json({message:"You are not able to edit other message"});
          }
         
          if(msg && senderId && content){
              msg.content = content
              msg.edited=true;
              await msg.save();
              res.status(200).json({message:"message edit successfully", data:msg})
          }
          
     } catch (error) {
          res.status(500).json({message:error});
          console.log(error)
     }
}

module.exports= editMessage;