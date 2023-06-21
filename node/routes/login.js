const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;

    const newUser = new User({
      nombre,
      email,
      contraseña
    });

    await newUser.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar el usuario' });
  }
});

module.exports = router;
