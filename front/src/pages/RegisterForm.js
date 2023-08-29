import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/users/register', {
        name,
        email,
        password
      });

      // Procesar la respuesta del backend según sea necesario
      console.log('Successful resgister:', response.data);
      navigate('/');
    } catch (error) {
      // Manejar errores de la solicitud o del backend
      console.error('Error at the register:', error);
    }

    // Reiniciar los campos del formulario
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form   onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </form>
    </div>
  );
};

export default RegisterForm;