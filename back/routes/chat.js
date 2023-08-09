const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const Chat = require('../models/Chat')
const authMiddleware = require('../middlewares/auth');


// Aplica el middleware de autenticación JWT a todas las rutas de chat
router.use(authMiddleware);
// Ruta para guardar el chat
router.post('/', chatController.saveChat);
// GET /chats/:id
router.get('/:userId', chatController.getUserChats);
// DELETE /chats/:id
router.delete('/:chatId', chatController.deleteChat);
// PUT
router.put('/:chatId', chatController.updateChat)

module.exports = router;
