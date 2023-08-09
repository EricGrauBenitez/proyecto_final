import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TokenComponent = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    // Obtener el token del almacenamiento local del navegador
    const token = localStorage.getItem('accessToken');

    // Incluir el token en el encabezado de autorización
    axios.get('http://localhost:3000/chat', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos protegidos:', error);
      });
  }, []);

  return (
    <div>
      <p>Datos protegidos:</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TokenComponent;
