const Message = require('../../Models/messages.model');
const User = require('../../Models/User.model');
const { ObjectId } = require('mongodb');

const getChats = async (req, res) => {
    try {
        const { user } = req; // Extract the logged-in user
        // console.log(user); // Log user object for debugging
        // console.log("Fetching chats...");

        const userId = user.id; // Current user's ID

        // Fetch all messages where the user is either the sender or the receiver
        const chatMsg = await Message.find({
            $or: [
                { sender: userId },
                { receiver: userId }
            ]
        });

        // Extract unique participants (both senders and receivers)
        const participantIds = [...new Set(
            chatMsg.flatMap(msg => [msg.sender, msg.receiver]) // Combine sender and receiver IDs
        )].filter(id => id.toString() !== userId); // Exclude the current user's ID

        // console.log("Participant IDs:", participantIds);

        // Convert IDs to ObjectId for querying
        const uniqueParticipantIds = participantIds.map(id => new ObjectId(id));

        // Fetch user details for all participants
        const users = await User.find({ _id: { $in: uniqueParticipantIds } }).lean();

        // console.log("Chat participants:", users);

        // Return the list of users
        res.status(200).json({ users });

    } catch (error) {
        console.error("Error in getChats:", error); // Log error for debugging
        return res.status(500).json({ message: "Server error", error });
    }
};

module.exports = getChats;
