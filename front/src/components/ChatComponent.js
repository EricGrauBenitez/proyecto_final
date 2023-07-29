import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatComponent = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const userId = '64a82c8eaed18ca9c757cc5e'; // Prueba con un usuario
  const chatId = '64c52062df23c7ffdd578529';
  

  useEffect(() => {
    // Obtener la conversación inicial al cargar el componente
    getChatMessages();
  }, []);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };
  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const getChatMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/chat/64a82c8eaed18ca9c757cc5e');
      setChatMessages(response.data);
    } catch (error) {
      console.error('Error al obtener la conversación:', error);
    }
  };

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
        const answer = await response.text();
        setAnswer(answer);
        // Llamar a la función para guardar la conversación en la base de datos
        saveConversationToDB(question, answer);
        setQuestion('');
      
      } else {
        console.error('Error en la solicitud:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const saveConversationToDB = async (question, answer) => {
    try {
      await axios.post('http://localhost:8000/chat', {
        user: userId,
        conversation: [{
          question,
          answer
        }]
      });
  
      // Luego de guardar en la base de datos, actualizamos el estado de chatMessages
    setChatMessages([...chatMessages, { 
      user: userId,
      conversation: [{
        question,
        answer
      }]
    }]);
  } catch (error) {
    console.error('Error al guardar la conversación en la base de datos:', error);
  }
};
const updateChat = async () => {
  try {
    const response = await axios.put(`http://localhost:8000/chat/${chatId}`, {
      question,
      answer
    });

    if (response.status === 200) {
      // Actualizar el estado de chatMessages con la conversación actualizada
      const updatedChat = {
        user: userId,
        conversation: [{
          question,
          answer
        }]
      };
      setChatMessages([...chatMessages, updatedChat]);
      setQuestion('');
      setAnswer('');
    } else {
      console.error('Error en la solicitud:', response.status);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};

  const clearChat = async () => {
    try {
      await axios.delete(`http://localhost:8000/chat/${userId}`);
      setChatMessages([]);
    } catch (error) {
      console.error('Error al borrar la conversación:', error);
    }
  };

  return (
    <div>
    <h1>Chat GPT</h1>
    <div className="chat-messages">
    {/* Mostrar todas las conversaciones en chatMessages */}
    {chatMessages.map((chat, index) => (
      <div key={index} className="chat-message">
        {chat.conversation.map((message, i) => (
          <div key={i}>
            <p>Pregunta: {message.question}</p>
            <p>Respuesta: {message.answer}</p>
          </div>
        ))}
      </div>
    ))}
  </div>
    <input type="text" placeholder="Nueva pregunta" value={question} onChange={handleQuestionChange} />
    <input type="text" placeholder="Nueva respuesta" value={answer} onChange={handleAnswerChange} />
    <button onClick={sendQuestion}>Enviar</button>
    <button onClick={clearChat}>Borrar Conversación</button>
    <button onClick={updateChat}>Actualizar Chat</button>
  </div>
);
};

export default ChatComponent;