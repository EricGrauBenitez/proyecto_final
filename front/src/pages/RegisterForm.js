import React, { useState } from 'react';
import axios from 'axios';
import '../css/RegisterForm.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [missingField, setMissingField] = useState(null); // Agrega esta línea


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMissingField(null); // Reiniciar missingField

    if (!name) {
      setMissingField("nombre");
      setError(`Por favor, complete el campo "nombre".`);
      return;
    } else if (!lastName) {
      setMissingField("lastname");
      setError(`Por favor, complete el campo "Last Name".`);
      return;
    } else if (!email) {
      setMissingField("correo electrónico");
      setError(`Por favor, complete el campo "correo electrónico".`);
      return;
    } else if (!password) {
      setMissingField("contraseña");
      setError(`Por favor, complete el campo "contraseña".`);
      return;
    } else if (!confirmPassword) {
      setMissingField("confirmación de contraseña");
      setError(`Por favor, complete el campo "confirmación de contraseña".`);
      return;
    }
    if (password !== confirmPassword) {
      setError("La contraseña y la confirmación de contraseña no coinciden.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/users/register', {
        name,
        lastName,
        email,
        password
      });

      navigate('/login?success=Registro+exitoso.+Inicia+sesión+para+probar+el+chat!');
    } catch (error) {

      if (error.response && error.response.status === 409) {
        setError("El usuario ya existe. Por favor, inicie sesión o utilice otro correo electrónico.");
        console.log(error)
      } else {
        setError("Ocurrió un error al registrar el usuario. Por favor, inténtelo de nuevo más tarde.");
      }
    }
    // Reiniciar los campos del formulario
    // setName('');
    // setEmail('');
    // setPassword('');
    // setConfirmPassword('');
    // setLastName(');
    setError('');
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={missingField === "nombre" ? "error-input" : ""}
          />
        </div>
        <div>
          <label htmlFor="name">Lastname:</label>
          <input
            type="text"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={missingField === "lastName" ? "error-input" : ""}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={missingField === "correo electrónico" ? "error-input" : ""}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={
              (missingField === "contraseña" || (password !== confirmPassword && (missingField === "contraseña" || missingField === "confirmación de contraseña")))
                ? "error-input"
                : ""
            }
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={
              (missingField === "confirmación de contraseña" || (password !== confirmPassword && (missingField === "contraseña" || missingField === "confirmación de contraseña" || !missingField)))
                ? "error-input"
                : ""
            }
          />
        </div>

        <button type="submit">Register</button>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </form>
    </div>
  );
};

export default RegisterForm;