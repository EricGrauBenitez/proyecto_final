import React, { useState } from 'react';
import axios from 'axios';

const ChatComponent = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [chatMessages, setChatMessages] = useState([]);


  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  }
  const sendQuestion = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
        'OpenAI-Organization': 'org-GsbDrECiJ47sjAfkaHrfKaDN'
      },
      body: JSON.stringify({ query: question })
    });

    if (response.ok) {
      const data = await response.text();
      const newMessage = {
        question: question,
        answer: data
      };

      setChatMessages([...chatMessages, newMessage]);
      setQuestion('');
    } else {
      console.error('Error en la solicitud:', response.status);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};
  

  return (
      <div>
    <div className="chat-messages">
      {chatMessages.map((message, index) => (
        <div key={index} className="chat-message">
          <p>Pregunta: {message.question}</p>
          <p>Respuesta: {message.answer}</p>
        </div>
      ))}
    </div>
    <input type="text" value={question} onChange={handleQuestionChange} />
    <button onClick={sendQuestion}>Enviar</button>
  </div>
);
};

export default ChatComponent;
