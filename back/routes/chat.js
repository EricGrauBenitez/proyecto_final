const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Ruta para guardar el chat
router.post('/', chatController.saveChat);

router.get('/:userId', chatController.getUserChats);

router.delete('/:chatId', chatController.deleteChat);

router.put('/:chatId', chatController.updateChat)

// titles
router.put('/:chatId/title', chatController.editChatTitle);

router.get('/titles/:userId', chatController.getChatTitles);

router.get('/:chatId/title', chatController.getChatTitleById);


module.exports = router;
