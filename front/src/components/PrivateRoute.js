import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element, ...rest }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirigir al inicio de sesión si no hay token
    return <Navigate to="/login" />;
  }

  // Permitir el acceso si hay un token
  return <Route {...rest} element={element} />;
}

export default PrivateRoute;