const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middlewares/auth');
require('dotenv').config();


// Ruta para crear un usuario
router.post('/register', UserController.createUser);

// Ruta para obtener todos los usuarios (protegida por el token JWT)
// router.get('/', authMiddleware, UserController.getAllUsers); esto para el admin

router.get('/:id', authMiddleware, UserController.getUserById);

router.put('/:id', authMiddleware, UserController.updateUser);

router.delete('/:id', authMiddleware, UserController.deleteUser);



module.exports = router;
