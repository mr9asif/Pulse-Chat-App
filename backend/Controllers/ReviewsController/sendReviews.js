const Review = require('../../Models/Review.model'); // Import your Review model

const sendReviews = async (req, res) => {
    try {
        const { user, r, review } = req.body;

        // Validate request body
        if (!user || !r || !review) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new review
        const newReview = new Review({
            user,
            r,
            review
        });

        // Save to the database
        await newReview.save();

        // Respond to the client
        res.status(201).json({ message: 'Review added successfully', data: newReview });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving the review', error: error.message });
    }
};

module.exports = sendReviews;
