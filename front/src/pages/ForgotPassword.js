import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      // Realizar la solicitud POST para buscar el usuario por correo electrónico
      const response = await axios.post('http://localhost:8000/users/email', {
        email: email,
      });

      // Obtener el userId de la respuesta del servidor
      const userId = response.data.userId;

      // Guardar el userId en localStorage
      localStorage.setItem('userId', userId);

      // Actualizar la contraseña utilizando el userId en la solicitud PUT
      await axios.put(`http://localhost:8000/users/${userId}`, {
        password: newPassword,
      });

      setMessage('Contraseña restablecida con éxito.');
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      setMessage('Error al restablecer la contraseña. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Forgot Your Password?</h2>
      <p>{message}</p>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleResetPassword}>
          Restablecer Contraseña
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
