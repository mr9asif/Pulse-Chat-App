const express = require('express');
const sendMessage = require('../Controllers/MessageController/sendMessage');
const authenticateToken = require('../Middleware/authenticateToken');

const router = express.Router();

// send message one to one
router.get('/:id',authenticateToken ,sendMessage);




module.exports = router;