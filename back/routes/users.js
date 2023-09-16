const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');
require('dotenv').config();


// Ruta para crear un usuario
router.post('/register', UserController.createUser);

// Ruta para obtener todos los usuarios (protegida por el token JWT)
router.get('/admin', authMiddleware, UserController.getAllUsers);

router.get('/:id', authMiddleware, UserController.getUserById);

router.post('/email', UserController.getUserByEmail);

router.put('/:id', UserController.updateUser);

router.delete('/:id', authMiddleware, UserController.deleteUser);



module.exports = router;
