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
