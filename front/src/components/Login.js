import React, { useState } from 'react';
import axios from 'axios';

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
