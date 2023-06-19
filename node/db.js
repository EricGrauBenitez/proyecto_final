const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/proyecto_final';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

module.exports = mongoose.connection;
