import React, { useState } from 'react';
import axios from 'axios';
import '../css/RegisterForm.css';
import { useNavigate } from 'react-router-dom';
import { HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi';

const RegisterForm = () => {
  const [step, setStep] = useState(1); // Estado para rastrear el paso actual
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    city: '',
    country: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [missingField, setMissingField] = useState(null); // Estado para rastrear el campo faltante
  const [allRequiredFieldsComplete, setAllRequiredFieldsComplete] = useState(false); // Nuevo estado para rastrear campos obligatorios

  const navigate = useNavigate();

  const handleNextStep = () => {

    if (step === 1 && (!formData.name || !formData.lastName)) {
      setMissingField('name');
      setError('Por favor, complete los campos obligatorios.');
      return;
    }

    setStep(step + 1);
    setError(null);
    setMissingField(null);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    let missingFieldName = null;

    // Valida campos del paso actual
    if (step === 1) {
      if (!formData.name) {
        missingFieldName = 'name';
      } else if (!formData.lastName) {
        missingFieldName = 'lastName';
      }
    } else if (step === 2) {
      if (!formData.city) {
        missingFieldName = 'city';
      } else if (!formData.country) {
        missingFieldName = 'country';
      }
    } else if (step === 3) {
      if (!formData.email) {
        missingFieldName = 'email';
      } else if (!formData.password) {
        missingFieldName = 'password';
      } else if (!formData.confirmPassword) {
        missingFieldName = 'confirmPassword';
      } else if (formData.password !== formData.confirmPassword) {
        setError('La contraseña y la confirmación de contraseña no coinciden.');
        return;
      }
    }

    if (missingFieldName) {
      setMissingField(missingFieldName);
      setError(`Por favor, complete el campo "${missingFieldName}".`);
      return;
    }

    try {
      // Realiza la solicitud POST aquí con los datos de formData
      const response = await axios.post('http://localhost:8000/users/register', formData);

      navigate('/login?success=Registro+exitoso.+Inicia+sesión+para+probar+el+chat!');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('El usuario ya existe. Por favor, inicie sesión o utilice otro correo electrónico.');
      } else {
        setError('Ocurrió un error al registrar el usuario. Por favor, inténtelo de nuevo más tarde.');
      }
    }
  };

  const getTitle = () => {
    switch (step) {
      case 1:
        return 'Paso 1: Información Personal';
      case 2:
        return 'Paso 2: Ubicación';
      case 3:
        return 'Paso 3: Información de Cuenta';
      default:
        return '';
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <h3>{getTitle()}</h3>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <h4 className="required-fields">Los campos con * son obligatorios.</h4>
          {step === 1 && (
            <>
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={missingField === 'name' ? 'error-input' : ''}
              />
              <label htmlFor="lastname">Lastname *</label>
              <input
                type="text"
                id="lastname"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={missingField === 'lastName' ? 'error-input' : ''}
              />
            </>
          )}
          {step === 2 && (
            <>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={missingField === 'city' ? 'error-input' : ''}
              />
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={missingField === 'country' ? 'error-input' : ''}
              />
            </>
          )}
          {step === 3 && (
            <>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={missingField === 'email' ? 'error-input' : ''}
              />
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={missingField === 'password' ? 'error-input' : ''}
              />
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={missingField === 'confirmPassword' ? 'error-input' : ''}
              />
            </>
          )}
        </div>

        <div className="arrow-buttons">
          {step > 1 && (
            <button className="arrow-button prev" type="button" onClick={handlePrevStep}>
              <HiArrowSmLeft />
            </button>
          )}
          {step < 3 && (
            <button className="arrow-button next" type="button" onClick={handleNextStep}>
              <HiArrowSmRight />
            </button>
          )}
          {step === 3 && (
            <button type="submit">Sign in</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
