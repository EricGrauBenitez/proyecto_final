const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const User = require('../models/User');

// Ruta para crear un usuario
router.post('/', UserController.createUser);

// Ruta para obtener todos los usuarios
router.get('/', UserController.getAllUsers);

// Ruta para obtener un usuario por su ID
router.get('/:id', UserController.getUserById);

// Ruta para actualizar un usuario
router.put('/:id', UserController.updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', UserController.deleteUser);

module.exports = router;