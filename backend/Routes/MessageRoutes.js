const express = require('express');
const {sendMessage,upload} = require('../Controllers/MessageController/sendMessage');
const authenticateToken = require('../Middleware/authenticateToken');

const router = express.Router();

// send message one to one
router.post('/:id',authenticateToken ,upload,sendMessage);




module.exports = router;