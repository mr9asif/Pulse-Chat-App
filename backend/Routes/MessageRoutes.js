const express = require('express');
const {sendMessage,upload} = require('../Controllers/MessageController/sendMessage');
const authenticateToken = require('../Middleware/authenticateToken');
const sendReaction = require('../Controllers/MessageController/sendReaction');
const editMessage = require('../Controllers/MessageController/editMessage');
const deleteMessage = require('../Controllers/MessageController/deleteMessage');
const getChats = require('../Controllers/MessageController/getChats');
const getUserMsg = require('../Controllers/MessageController/getUserMsg');

const router = express.Router();

// get all chat users
router.get('/getchats', authenticateToken, getChats)

// get user and message with id 
router.get('/user/:id', getUserMsg);

// send message one to one
router.post('/:id',authenticateToken ,upload,sendMessage);

// reaction send feature
router.post('/reaction/:msgId', authenticateToken, sendReaction);

// edit message
router.patch('/edit/:msgId', authenticateToken, editMessage)

// delete message
router.delete('/delete/:msgId', authenticateToken, deleteMessage);


module.exports = router;