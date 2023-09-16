import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorClass, setErrorClass] = useState(''); // Estado para la clase de error

  const handleResetPassword = async () => {
    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      setErrorClass('error-message');
      return;
    }

    if (!email) {
      setMessage('Por favor, ingresa un correo electrónico.');
      setErrorClass('error-message');
      return;
    }

    try {
      // Realizar la solicitud POST para buscar el usuario por correo electrónico
      const response = await axios.post('http://localhost:8000/users/email', {
        email: email,
      });

      const userId = response.data.userId;

      localStorage.setItem('userId', userId);

      // Actualizar la contraseña utilizando el userId en la solicitud PUT
      await axios.put(`http://localhost:8000/users/${userId}`, {
        password: newPassword,
      });

      setMessage('Contraseña restablecida con éxito.');
      setErrorClass('success-message');
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      if (error.response && error.response.status === 404) {
        setMessage('El usuario no existe. Por favor, verifica el correo electrónico.');
      } else {
        setMessage('Error al restablecer la contraseña. Por favor, inténtalo de nuevo.');
      }

      setErrorClass('error-message');
    }
  };

  return (
    <div>
      <h1>Forgot Your Password?</h1>
      <p className={errorClass}>{message}</p>
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
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleResetPassword}>
          New Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
