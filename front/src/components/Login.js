import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/userSlice'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterForm.css'; 


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector((state) => state.user.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Despachar la acción para manejar el inicio de sesión en Redux
      dispatch(login({ email, password }));
      navigate('/chat'); // Redirigir aquí
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };
   

  return (
    <div className="container">
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
