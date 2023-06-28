import React, { useState } from 'react';
import { completarTexto, getRespuestaGenerada } from '../api-chatgpt/api';

const PruebaChat = () => {
  const [inputText, setInputText] = useState('');
  const [respuesta, setRespuesta] = useState('');

  const generadorDeRespuestas = async () => {
    const response = await completarTexto(inputText);
    setRespuesta(response);
  };

  // Obtener la respuesta generada
  const respuestaGenerada = getRespuestaGenerada();

  return (
    <div>
      <h1>Prueba de Chat</h1>
      <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} />
      <button onClick={generadorDeRespuestas}>Generar Respuesta</button>
      <p>{respuestaGenerada}</p>
    </div>
  );
};

export default PruebaChat;
