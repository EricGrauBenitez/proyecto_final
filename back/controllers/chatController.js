const Chat = require('../models/Chat');
const User = require('../models/User');

// Controlador para guardar el chat
exports.saveChat = async (req, res) => {
  const { userId, question, answer } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const chat = new Chat({
      user: user._id,
      question,
      answer
    });

    await chat.save();
    res.status(201).json({ message: 'Chat guardado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar el chat' });
  }
};

// Controlador para obtener todos los chats de un usuario específico
exports.getUserChats = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const chats = await Chat.find({ user: user._id });
    res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los chats del usuario' });
  }
};

// Controlador para eliminar un chat específico
exports.deleteChat = async (req, res) => {
  const chatId = req.params.chatId;

  try {
    // Buscar y eliminar el chat por su chatId
    const deletedChat = await Chat.findByIdAndDelete(chatId);

    if (!deletedChat) {
      return res.status(404).json({ error: 'Mensaje del chat no encontrado' });
    }

    res.json({ message: 'Mensaje del chat eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el mensaje del chat:', error);
    res.status(500).json({ error: 'Error al eliminar el mensaje del chat' });
  }
};
// Controlador para actualizar un chat específico
exports.updateChat = async (req, res) => {
  const { chatId } = req.params;
  const { question, answer } = req.body;

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: 'Chat no encontrado' });
    }

    chat.conversation.push({ question, answer });
    await chat.save();

    res.status(200).json({ message: 'Chat actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el chat' });
  }
};





