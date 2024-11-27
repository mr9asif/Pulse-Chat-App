const Message = require('../../Models/messages.model');
const sendMessage =async (req, res)=>{
   try {
    const {sender, receiver, content}= req.body;
    let mediaURL =null;
   if(req.file){
    mediaURL = `/upload/files/${req.file.filename}`

   }
   const message = new  Message({
     sender, receiver, content, media:mediaURL
   });

   await message.save();

   res.status(201).send({message:"message send successfulle", data:message})
   } catch (error) {
    res.status(500).send({message:"server error"});
    console.log(error)
   }

}


module.exports = sendMessage;