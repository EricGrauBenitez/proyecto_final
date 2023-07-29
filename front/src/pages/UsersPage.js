import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Hacer la solicitud GET a la ruta /users en el backend
    axios.get('http://localhost:8000/users')
      .then(response => {
        // Al recibir los datos de los usuarios, almacenarlos en el estado del componente
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
