const mongoose = require('mongoose');

const chatGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Group name
    unique: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Participants are users in the group
    },
  ],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Admin of the group
  },
  createdAt: {
    type: Date,
    default: Date.now, // When the group was created
  },
  isActive: {
    type: Boolean,
    default: true, // Whether the group is active or archived
  },
});

module.exports = mongoose.model('ChatGroup', chatGroupSchema);
