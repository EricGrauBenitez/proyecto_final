import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../components/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';

const Login = () => {
  const { isLoggedIn, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const successMessage = queryParams.get('success');

  // const user = useSelector((state) => state.user.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/login', { email, password });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('chatId', response.data.chatId);

        login();

        navigate('/chat');
      } else {
        console.error('Error al iniciar sesión', response.status);
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      if (error.response && error.response.status === 401) {
        setError('Credenciales incorrectas. Verifique su correo y contraseña.');
      } else {
        setError('Ocurrió un error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
      }
    }
  };


  return (

    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {successMessage && <div className="success-message success">{successMessage}</div>}
        {error && <div className="error-message error">{error}</div>}
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
          <button className='link-button' onClick={() => navigate('/forgot-password')}>Forgot Password?</button>

        </div>
        <div className="space-between-input-button">
          <button type="submit" className="login-button">Login</button>
        </div>
        <span>Don't have an account?
          <button className='link-button' onClick={() => navigate('/register')}>Sign up</button>
        </span>
      </form>
    </div>
  );
};

export default Login;
