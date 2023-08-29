import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(logout());
      localStorage.removeItem('userId'); 
      localStorage.removeItem('chatId'); 
      navigate('/login'); 
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
