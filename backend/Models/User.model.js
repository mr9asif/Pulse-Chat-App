const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensures no two users have the same username
    trim: true,
    minlength: 3, // Minimum length for username
  },
  bio: {
    type: String,
    maxlength: 160, // Limit bio to a certain number of characters
  },
  image: {
    type: String, // URL or path to the profile image
    default: 'default-profile-image-url', // Optional default image
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures unique email
    lowercase: true, // Automatically converts email to lowercase
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], // Email validation regex
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length for password
  },
  lastLogin: {
    type: Date, // Track when the user last logged in
  },
  isActive: {
    type: Boolean,
    default: true, // Status to track if user is active or deactivated
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
