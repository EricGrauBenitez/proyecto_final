import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const [userId, setUserId] = useState(localStorage.getItem('userId')); 

  useEffect(() => {
    const config = {
      headers: {
        'x-access-token': token // Incluir el token en los encabezados
      }
    };
    axios.get(`http://localhost:8000/users/${userId}`, config)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
      });
  }, [token]);
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/users/${userId}`);
      // Remove the deleted user from the state
      setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div>
      <h1>User</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <Link to={`/users/${user._id}`}>Ver detalles</Link> {/* Enlace a la página de detalles del usuario */}
            <button onClick={() => handleDelete(user._id)}>Eliminar</button> {/* Botón para eliminar el usuario */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
