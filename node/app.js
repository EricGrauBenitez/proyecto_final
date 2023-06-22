const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRoutes = require('./routes/users');
const connectDB = require('./db');
const loginRouter = require('./routes/login');
require('dotenv').config();


app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // Para que las solicitudes con método 'OPTIONS' tengan el código de estado 200
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login', loginRouter);
app.use('/users', usersRoutes);


// Iniciar el servidor
app.listen(8000, () => {
  console.log('Servidor en ejecución en http://localhost:8000');
});
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
// });

//? Rutas
app.get('/', (req, res) => {
  res.send('<h1>¡Hola, mundo!</h1>');
});

app.get('/users', (req, res) => {
  res.send('<h1>¡Hola, usuarios!</h1><button>Crear usuario</button>');
  });


// ! Base de datos

connectDB();
