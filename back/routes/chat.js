const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Ruta para guardar el chat
router.post('/chats', chatController.saveChat);

module.exports = router;
