const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middlewares/auth');
require('dotenv').config();

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(process.env.JWT_SECRET);
      return res.status(401).json({ mensaje: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
};

// Ruta para crear un usuario
router.post('/register', UserController.createUser);

// Ruta para obtener todos los usuarios (protegida por el token JWT)
router.get('/', authMiddleware, UserController.getAllUsers);

// Ruta para obtener un usuario por su ID (protegida por el token JWT)
router.get('/:id', authMiddleware, UserController.getUserById);

// Ruta para actualizar un usuario (protegida por el token JWT)
router.put('/:id', authMiddleware, UserController.updateUser);

// Ruta para eliminar un usuario (protegida por el token JWT)
router.delete('/:id', authMiddleware, UserController.deleteUser);



module.exports = router;
