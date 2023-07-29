const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const Chat = require('../models/Chat')

// Ruta para guardar el chat
router.post('/', chatController.saveChat);
// GET /chats/:id
router.get('/:userId', async (req, res) => {
    try {
      const chatMessages = await Chat.find();
      res.json(chatMessages);
    } catch (error) {
      console.error('Error al obtener los mensajes del chat:', error);
      res.status(500).json({ error: 'Error al obtener los mensajes del chat' });
    }
  });
// DELETE /chats/:id
router.delete('/:chatId', chatController.deleteChat);
// PUT
router.put('/:chatId', chatController.updateChat)

module.exports = router;
