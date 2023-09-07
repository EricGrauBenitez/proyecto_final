const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRoutes = require('./routes/users');
const connectDB = require('./db');
const loginRouter = require('./routes/login');
const chatRoutes = require('./routes/chat');
const passwordRoutes = require('./routes/password')
require('dotenv').config();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // Para que las solicitudes con método 'OPTIONS' tengan el código de estado 200
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ? Rutas

app.use('/users', usersRoutes);
app.use('/chat', chatRoutes);
app.use('/login', loginRouter); 
app.use('/password', passwordRoutes);
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
