const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Chat = require('../models/Chat')
require('dotenv').config();

// Ruta para inicio de sesión
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ mensaje: 'Email y contraseña son requeridos' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const passwordValidated = await bcrypt.compare(password, user.password);
    if (!passwordValidated) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const chat = await Chat.findOne({ userId: user._id });
    const chatId = chat ? chat._id : null;
    
    const userId = user._id;
    // const chatId = Chat._Id;

    // Generar un token JWT válido
    const token = jwt.sign({ email, userId, chatId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Devolver el token JWT al cliente
    res.status(200).json({ token, userId, chatId });
  } catch (error) {
    console.error('Error en el inicio de sesión', error);
    res.status(500).json({ mensaje: 'Error en el inicio de sesión' });
  }
});

module.exports = router;
