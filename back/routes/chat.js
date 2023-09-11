const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Ruta para guardar el chat
router.post('/:userId', chatController.saveChat);

router.get('/:userId', chatController.getUserChats);

router.get('/:userId/:chatId', chatController.getConversationByChatId);

router.delete('/:userId/:chatId', chatController.deleteChat);

router.put('/:userId/:chatId', chatController.updateChat)

// titles
// router.put('/title/:userId/:chatId', chatController.editChatTitle);

// router.get('/titles/:userId/:chatId', chatController.getConversationTitles);

// router.get('/title/:userId/:chatId', chatController.getChatTitleById);


module.exports = router;
