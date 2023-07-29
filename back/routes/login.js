const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Ruta para inicio de sesión
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar las credenciales del usuario en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ mensaje: 'Invalid credentials' });
    }

    const passwordValidated = await bcrypt.compare(password, user.password);
    if (!passwordValidated) {
      return res.status(401).json({ mensaje: 'Invalid credentials' });
    }

    // Generar un token JWT válido
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Devolver el token JWT al cliente
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el inicio de sesión' });
  }
});

module.exports = router;