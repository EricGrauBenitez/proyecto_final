import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/UsersPage.css';

const UsersPage = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);

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

    try {
      await axios.delete(`http://localhost:8000/users/${userId}`, config);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleEdit = async () => {
    if (editMode) {
      const config = {
        headers: {
          'x-access-token': token,
        },
      };

      try {
        // Mostrar la confirmación antes de editar
        setShowEditConfirmation(true);
      } catch (error) {
        console.error('Error al editar el usuario:', error);
      }
    } else {
      setEditMode(true);
    }
  };

  const confirmEdit = async () => {
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    const updatedUserData = { ...user, ...editedData };
    delete updatedUserData.password;

    try {
      await axios.put(`http://localhost:8000/users/${userId}`, updatedUserData, config);
      setEditMode(false); // Desactivar el modo de edición
      setEditedData({}); // Restablecer los datos editados
      setShowEditConfirmation(false); // Ocultar aviso de confirmación
      fetchUserData();
    } catch (error) {
      console.error('Error al editar el usuario:', error);
    }
  };

  const cancelEdit = () => {
    setEditMode(false); // Desactivar el modo de edición
    setEditedData({}); // Restablecer los datos editados
    setShowEditConfirmation(false); // Ocultar aviso de confirmación
  };

  return (
    <div className="container">
      <h1>{user ? `${user.name} ${user.lastName}` : 'Loading...'}</h1>
      {user ? (
        <div>
          <table className="table">
            <tbody>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>Name:</td>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      value={editedData.name || user.name}
                      onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                    />
                  ) : (
                    <span>{user.name}</span>
                  )}
                </td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      value={editedData.lastName || user.lastName}
                      onChange={(e) => setEditedData({ ...editedData, lastName: e.target.value })}
                    />
                  ) : (
                    <span>{user.lastName}</span>
                  )}
                </td>
              </tr>
              <tr>
                <td>City:</td>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      value={editedData.city || user.city}
                      onChange={(e) => setEditedData({ ...editedData, city: e.target.value })}
                    />
                  ) : (
                    <span>{user.city}</span>
                  )}
                </td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      value={editedData.country || user.country}
                      onChange={(e) => setEditedData({ ...editedData, country: e.target.value })}
                    />
                  ) : (
                    <span>{user.country}</span>
                  )}
                </td>
              </tr>

              <tr>
                <td>Role:</td>
                <td>
                  {editMode ? (
                    <select
                      value={editedData.role || user.role}
                      onChange={(e) => setEditedData({ ...editedData, role: e.target.value })}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span>{user.role}</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <button
              className={`button-edit ${editMode ? 'editing' : ''}`}
              onClick={handleEdit}
            >
              {editMode ? 'Guardar' : 'Editar'}
            </button>
            {showEditConfirmation && (
              <div className="edit-warning-text">
                ¡Atención! ¿Deseas guardar los cambios?
                <button
                  className="button-edit"
                  onClick={confirmEdit}
                >
                  Confirmar Guardar
                </button>
                <button onClick={cancelEdit}>Cancelar</button>
              </div>
            )}
            <button
              className={`button-danger ${showEditConfirmation ? 'hidden' : ''}`}
              onClick={handleDelete}
            >
              Eliminar Usuario
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UsersPage;
