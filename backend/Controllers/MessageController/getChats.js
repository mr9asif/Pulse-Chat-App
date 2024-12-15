const Message = require('../../Models/messages.model');
const User = require('../../Models/User.model');
const {ObjectId}=require('mongodb');

const getChats = async (req, res) => {
    try {
        const { user } = req;
        console.log(user); // Log user object for debugging
        const senderId = user.id;

        // Fetch messages where the sender matches the current user
        const chatMsg = await Message.find({ sender: senderId });

        // Extract unique receiver IDs from the fetched messages
        const receiverIds = [...new Set(chatMsg.map((msg) => msg.receiver))];
        console.log(receiverIds); // Log receiver IDs for debugging

        // Step 1: Remove duplicates
        const uniqueReceiverIds = [...new Set(receiverIds.map(id => id.toString()))]
            .map(id => new ObjectId(id)); // Convert back to ObjectId

        // Step 2: Query User collection
        const users = await User.find({ _id: { $in: uniqueReceiverIds } })
            .select('fullName profileImage username') // Fetch only necessary fields
            .lean(); // Return plain JS objects for easier manipulation

        // Step 3: Return user details
        res.status(200).json({ users });

        // Respond with the fetched messages
        // res.status(200).json({ receiverIds, messages: chatMsg });
    } catch (error) {
        console.error("Error in getChats:", error); // Log error for debugging
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = getChats;
