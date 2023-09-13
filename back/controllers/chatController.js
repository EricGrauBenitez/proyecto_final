const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

// Controlador para guardar el chat
exports.saveChat = async (req, res) => {
  const { conversation, title } = req.body;
  const { userId } = req.params;

  try {
    // Genera un nuevo chatId único usando uuidv4
    const chatId = uuidv4();

    // Crea el nuevo chat con el chatId generado y otros datos
    const newChat = {
      _id: chatId,
      conversation: conversation,
      title: title,
      createdAt: new Date().getTime(),
      updateAt: new Date().getTime()
    };

    // Encuentra al usuario por su ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Agrega el nuevo chat al usuario
    user.chats.push(newChat);

    // Guarda al usuario actualizado
    await user.save();

    // Devuelve el chatId generado después de guardar el chat
    res.status(201).json({ chatId: chatId });
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
    res.status(200).json(user.chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los chats del usuario' });
  }
};

exports.getConversationByChatId = async (req, res) => {
  const { userId, chatId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // const chat = await Chat.findOne({ _id: chatId, userId: user._id });
    const chat = user.chats.find(chat => chat._id === chatId)

    if (!chat) {
      return res.status(404).json({ error: 'Conversación no encontrada' });
    }

    res.status(200).json(chat.conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la conversación' });
  }
};

// Controlador para eliminar un chat específico
exports.deleteChat = async (req, res) => {
  const { userId, chatId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Filtra los chats para mantener solo los que no coincidan con el chatId a eliminar
    user.chats = user.chats.filter((chat) => chat._id !== chatId);

    // Guarda el usuario actualizado sin el chat eliminado
    await user.save();

    res.json({ message: 'Chat eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el chat' });
  }
};

exports.cleanConversation = async (req, res) => {
  const { userId, chatId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    let chat = user.chats.find((chat) => chat._id === chatId);
    if (!chat) {
      return res.status(404).json({ error: 'Chat no encontrado' });
    }

    chat.conversation = [];

    const filteredChats = user.chats.filter(chat => chat._id !== chatId)

    user.chats = [
      ...filteredChats,
      chat
    ]

    // Guarda el usuario actualizado
    await user.save();

    res.status(200).json({ message: 'Conversación borrada exitosamente', chatId: chat._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al limpia la conversación' });
  }
}

// Controlador para actualizar un chat específico

exports.updateChat = async (req, res) => {
  const { userId, chatId } = req.params;
  const { conversation, title } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    let chat = user.chats.find((chat) => chat._id === chatId);
    if (!chat) {
      return res.status(404).json({ error: 'Chat no encontrado' });
    }

    chat = {
      ...chat,
      updateAt: new Date().getTime(),
      conversation: [...chat.conversation, ...conversation],
      title
    };

    const filteredChats = user.chats.filter(chat => chat._id !== chatId)

    user.chats = [
      ...filteredChats,
      chat
    ]

    // Guarda el usuario actualizado
    await user.save();

    res.status(200).json({ message: 'Chat actualizado exitosamente', chatId: chat._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el chat' });
  }
};

// Controlador para editar el título de un chat específico
exports.editChatTitle = async (req, res) => {
  const { userId, chatId } = req.params;
  const { title } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    chat.updateAt = new Date().getTime(),
      chat.chats.title = title;
    await chat.save();

    res.status(200).json({ message: 'Título del chat actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el título del chat' });
  }
};

// Controlador para recoger todos los title de un user
exports.getConversationTitles = async (req, res) => {
  try {
    const { userId, chatId } = req.params;


    const user = await User.findById(userId, 'chats');
    if (!user) {
      return res.status(404).json({ message: 'Chat no encontrado' });
    }
    const titles = user.chats.map(chat => chat.title);


    res.json({ titles: titles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

// Controlador para recoger el title de un chat
exports.getChatTitleById = async (req, res) => {
  try {
    const chatId = req.params.chatId;

    // Busca el chat por su ID y recupera su título
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado' });
    }

    res.json({ title: chat.title });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


