const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const connectDB = require('./db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', usersRoutes);


// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor en ejecución en http://localhost:3000');
});
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
// });

//? Rutas
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});


app.get('/saludo', (req, res) => {
  res.send('¡Hola desde la ruta /saludo!');
});

// ! Base de datos

connectDB();
