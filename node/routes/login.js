const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Ruta para inicio de sesión
router.post('/', async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // Verificar las credenciales del usuario en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const contraseñaValida = await bcrypt.compare(contraseña, user.contraseña);
    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
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
