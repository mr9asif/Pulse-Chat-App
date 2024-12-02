const express = require('express');
const {sendMessage,upload} = require('../Controllers/MessageController/sendMessage');
const authenticateToken = require('../Middleware/authenticateToken');
const sendReaction = require('../Controllers/MessageController/sendReaction');

const router = express.Router();

// send message one to one
router.post('/:id',authenticateToken ,upload,sendMessage);

// reaction send feature
router.post('/reaction/:msgId', authenticateToken, sendReaction);


module.exports = router;