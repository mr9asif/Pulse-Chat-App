const getUserProfile = require("../UserController/getUserProfile");

const sendMessage = async(req, res)=>{
    const receiverId = req.params;
    const {user} = req;
    const senderId = user.id;
    console.log(senderId, receiverId);

    // const {text, reaction, media} = req.body;

    // if(!senderId &&  !receiverId){
    //     res.json({message:"sender or reciver not found"})
    // }

    // if(!text || !reaction || !media){
    //     res.status(400).json({message:"Content not found to send"})
    // }



}

module.exports = sendMessage;