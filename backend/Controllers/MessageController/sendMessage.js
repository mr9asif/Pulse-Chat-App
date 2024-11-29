const multer = require('multer');
const path = require('path');
const Message = require('../../Models/messages.model');
const mongoose = require('mongoose')

const storage=multer.diskStorage({
    destination:'./upload',
    filename:(req,file, cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif|mp4|mp3|pdf/; // Allowed file types
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Unsupported file type'));
      }
    },
  }).single('media');




const sendMessage = async(req, res)=>{
    try {
        const receiverId = req.params.id;
        console.log('r', receiverId)
    const {user} = req;
    const senderId = user.id;
    console.log(senderId, receiverId);

    const {text, reaction} = req.body;
    const media = req.file? req.file.filename : null;

    if(!senderId &&  !receiverId){
        res.json({message:"sender or reciver not found"})
    }

    if(!text && !reaction && !media){
        res.status(400).json({message:"Content not found to send"})
    }

    const message = new Message({
        
            sender:senderId,
            receiver:new mongoose.Types.ObjectId(receiverId),
            content:text,
            reactions:reaction,
            media:media,
            timestamp: new Date(),
          
    })

    const messages = await message.save();

      res.status(200).json({ message: "Message sent successfully", data: messages});
    } catch (error) {
        console.log(error);
        res.send({error:error});
    }



}

module.exports = {sendMessage, upload};