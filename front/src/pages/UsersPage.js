import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UsersPage = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editingField, setEditingField] = useState('');
  const [editedRole, setEditedRole] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, [token, userId]);

  const fetchUserData = () => {
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    axios
      .get(`http://localhost:8000/users/${userId}`, config)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el usuario:', error);
      });
  };

  const handleDelete = async () => {
    const config = {
      headers: {
        'x-access-token': token,
      },
    };

    const chatId = localStorage.getItem('chatId'); // Obtener el chatId del localStorage
    
    try {
      // Verificar si hay un chatId almacenado
      if (chatId) {
        await axios.delete(`http://localhost:8000/chat/${chatId}`, config);
      }
  
      await axios.delete(`http://localhost:8000/users/${userId}`, config);
      setUser(null); 
      navigate('/');
    } catch (error) {
      console.error('Error al eliminar el usuario o el chat:', error);
    }
  };

  const handleEdit = async (field, value) => {
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    const updatedUserData = { ...user, [field]: value };

    axios
      .put(`http://localhost:8000/users/${userId}`, updatedUserData, config)
      .then(() => {
        fetchUserData(); 
      })
      .catch((error) => {
        console.error('Error al editar el usuario:', error);
      });
      try {
        await axios.put(`http://localhost:8000/users/${userId}`, updatedUserData, config);
        setEditMode(false); 
        fetchUserData(); 
      } catch (error) {
        console.error('Error al editar el usuario:', error);
      }
    
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditingField('');
    setEditedName('');
    setEditedEmail('');
  };

  const enterEditMode = (field) => {
    setEditingField(field);
    setEditMode(true);
    if (field === 'name') {
      setEditedName(user.name);
      setEditedEmail('');
    } else if (field === 'email') {
      setEditedName('');
      setEditedEmail(user.email);
    }
  };

  const isEmailValid = (email) => {
    // Expresión regular para validar el formato de email
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };
  

  return (
    <div>
      <h1>User</h1>
      {user ? (
        <div>
          <p>
            Name: {editMode && editingField === 'name' ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <button onClick={() => handleEdit('name', editedName)}>Guardar</button>
                <button onClick={cancelEdit}>Cancelar</button>
              </>
            ) : (
              <>
                <span>{user.name}</span>
                <button onClick={() => enterEditMode('name')}>Editar</button>
              </>
            )}
          </p>
          <p>
            Email: {editMode && editingField === 'email' ? (
              <>
                <input
                  type="text"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
                {editMode && editingField === 'email' && !isEmailValid(editedEmail) && (
                  <p className="error-message">Introduce un email válido</p>
                )}
                <button onClick={() => handleEdit('email', editedEmail)}>Guardar</button>
                <button onClick={cancelEdit}>Cancelar</button>
              </>
            ) : (
              <>
                <span>{user.email}</span>
                <button onClick={() => enterEditMode('email')}>Editar</button>
              </>
            )}
          </p>
          <p>
          Role: {editMode && editingField === 'role' ? (
            <select
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          ) : (
            <span>{user.role}</span>
          )}
          {editMode && editingField === 'role' ? (
            <>
              <button onClick={() => handleEdit('role', editedRole)}>Guardar</button>
              <button onClick={cancelEdit}>Cancelar</button>
            </>
          ) : (
            <button onClick={() => enterEditMode('role')}>Editar</button>
          )}
        </p>
          <button onClick={handleDelete}>Eliminar Usuario</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};


export default UsersPage;
