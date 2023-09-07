import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Importa useParams para obtener el token de la URL
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams(); // Obtiene el token de la URL
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Envía una solicitud al servidor para restablecer la contraseña utilizando el token y la nueva contraseña
    try {
      await axios.post(`/reset-password/${token}`, { password }); // Asegúrate de que esta ruta exista en tu servidor
      alert("Contraseña restablecida con éxito.");
      // Redirige al usuario a la página de inicio de sesión u otra página de tu elección
    } catch (error) {
      alert("Hubo un error al restablecer la contraseña.");
    }
  };

  return (
    <div className="container">
      <h1>Restablecer Contraseña</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">Nueva Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Ingresa tu nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Restablecer Contraseña
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
