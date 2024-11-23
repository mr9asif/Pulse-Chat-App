const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Reference to the User who sent the message
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // For one-to-one messages
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatGroup',
    required: false, // For group messages
  },
  content: {
    type: String,
    required: true, // Text content of the message
  },
  media: {
    type: String, // URL to image/video (optional)
    required: false,
  },
  reactions: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      reaction: { type: String }, // Emoji or reaction type (e.g., 'like', 'love')
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now, // Timestamp when the message was sent
  },
  edited: {
    type: Boolean,
    default: false, // Track if message has been edited
  },
  deleted: {
    type: Boolean,
    default: false, // Track if the message has been deleted
  },
});

module.exports = mongoose.model('Message', messageSchema);
