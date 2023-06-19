const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  contraseña: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
