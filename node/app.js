console.log('patata');
const express = require('express');
const app = express();

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Ruta adicional
app.get('/saludo', (req, res) => {
  res.send('¡Hola desde la ruta /saludo!');
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor en ejecución en http://localhost:3000');
});
