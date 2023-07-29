const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRoutes = require('./routes/users');
const connectDB = require('./db');
const loginRouter = require('./routes/login');
const chatRoutes = require('./routes/chat');
require('dotenv').config();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // Para que las solicitudes con método 'OPTIONS' tengan el código de estado 200
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ? Rutas
// app.get('/', (req, res) => {
//   res.send('<h1>¡Hola, mundo!</h1>');
// });
app.use('/users', usersRoutes);
app.use('/chat', chatRoutes);
app.use('/login', loginRouter); 
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Aquí debes implementar la lógica para verificar las credenciales del usuario
  // y generar un token de autenticación si son válidas
  if (email === 'user@example.com' && password === 'password') {
    // Generar un token de autenticación
    const token = '...'; // Generar el token de autenticación utilizando una biblioteca como JSON Web Tokens (JWT)

    // Devolver el token al frontend
    return res.status(200).json({ token });
  }

  // Si las credenciales no son válidas, devolver un mensaje de error
  return res.status(401).json({ error: 'Credenciales inválidas' });
});

app.use('/api/v1', chatRoutes);
app.post('/chat', chatRoutes);


// Iniciar el servidor
app.listen(8000, () => {
  console.log('Servidor en ejecución en http://localhost:8000');
});
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
// });



// ! Base de datos

connectDB();
