const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { 
        id: { type: String, required: true }, // User ID
        fullName: { type: String, required: true }, // Full Name
        username: { type: String, required: true }, // Username
        email: { type: String, required: true }, // Email
        image: { type: String } // Profile image
    },
    r: { type: Number, required: true }, // Rating (assuming a numeric value)
    review: { type: String, required: true }, // Review text
    createdAt: { type: Date, default: Date.now } // Timestamp
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
