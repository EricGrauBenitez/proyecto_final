const User = require('../models/User');
const bcrypt = require('bcrypt');


const userController = {
  // Crear un usuario
  createUser: async (req, res) => {
    try {
      const { nombre, email, contraseña, rol } = req.body;

      // Validar la contraseña
    // if (contraseña.length < 8) {
    //   return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 8 caracteres' });
    // }

    // Generar el hash de la contraseña
    const hashedContraseña = await bcrypt.hash(contraseña, 10);


      const newUser = new User({
        nombre,
        email,
        contraseña: hashedContraseña,
        rol: 'usuario'
      });

      await newUser.save();

      res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al registrar el usuario' });
    }
  },

  // Obtener todos los usuarios
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
    }
  },

  // Obtener un usuario por su ID
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener el usuario' });
    }
  },

  // Actualizar un usuario
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, email, contraseña, rol } = req.body;

      // Validar la contraseña
    if (contraseña && contraseña.length < 8) {
      return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 8 caracteres' });
    }

    // Generar el hash de la nueva contraseña (si se proporciona)
    let hashedContraseña;
    if (contraseña) {
      hashedContraseña = await bcrypt.hash(contraseña, 10);
    }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { nombre, email, contraseña: hashedContraseña, rol },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
    }
  },

  // Eliminar un usuario
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
    }
  }
};

module.exports = userController;
