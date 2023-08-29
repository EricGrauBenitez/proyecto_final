import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/RegisterForm.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const user = useSelector((state) => state.user.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', { email, password }); // Hacer la solicitud POST

      if (response.status === 200) {
        dispatch(login({ email, token: response.data.token })); // Guardar el token en el estado
        localStorage.setItem('userId', response.data.userId); // Guardar userId en el localStorage
        localStorage.setItem('chatId', response.data.chatId);
        
        navigate('/chat');
      } else {
        console.error('Error al iniciar sesión', response.status);
      }
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
        <button onClick={() => navigate('/')}>Go to Home</button>

      </form>
    </div>
  );
};

export default Login;
