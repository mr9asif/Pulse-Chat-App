const express = require('express');
const sendReviews = require('../Controllers/ReviewsController/sendReviews');

const router = express.Router();

// send reviews
router.post('/sendReviews', sendReviews);

module.exports = router;