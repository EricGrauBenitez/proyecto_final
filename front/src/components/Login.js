import React, { useState } from 'react';
import axios from 'axios';

// Configurar el interceptor de axios
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password: password,
      });

      const token = response.data.token;

      // Almacenar el token en el local storage
      localStorage.setItem('token', token);
  
      // Manejar la respuesta del servidor, por ejemplo, guardar el token en el estado o en localStorage.

      console.log(response.data); // Respuesta del servidor

      // Restablecer los campos del formulario
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
          type="email" 
          value={email} 
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
           required />
        </div>
        <div>
          <label>Password:</label>
          <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
