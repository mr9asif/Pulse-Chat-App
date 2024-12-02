const Message = require('../../Models/messages.model');

const deleteMessage = async (req, res) => {
  const { msgId } = req.params;
  const userId = req.user.id;

  try {
    // Find the message by ID
    const msg = await Message.findById(msgId);
    if (!msg) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Check if the user is the sender
    const senderId = msg.sender.toString();
    if (userId !== senderId) {
      return res.status(401).json({ message: "You cannot delete another user's message" });
    }

    // Delete the message
    await msg.deleteOne();

    // Send success response
    return res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while deleting the message" });
  }
};

module.exports = deleteMessage;
