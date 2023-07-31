import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatComponent.css'; 

const ChatComponent = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const userId = '64c787b38f00c453efb785a5'; // Prueba con un usuario
  const chatId = '64c7884d8f00c453efb785a8';
  

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
      const response = await axios.get(`http://localhost:8000/chat/${userId}`);
      setChatMessages(response.data);
    } catch (error) {
      console.error('Error al obtener la conversación:', error);
    }
  };

  const saveConversationToDB = async (question, answer) => {
    try {
      await axios.post('http://localhost:8000/chat', {
        userId,
        conversation: [
          {question, answer}]});
      // Luego de guardar en la base de datos, actualizamos el estado de chatMessages
      setChatMessages([
        ...chatMessages,
        {userId, conversation: [
            { question, answer }]}]);
    } catch (error) {
      console.error('Error al guardar la conversación en la base de datos:', error);
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
  
        // Verificar si hay un chat existente para actualizar
        const existingChat = chatMessages.find((chat) => chat.userId === userId);
        console.log(existingChat);
        console.log(chatMessages);
        if (existingChat) {
          // Si hay un chat existente, hacer una solicitud PUT para actualizarlo
          const chatId = existingChat._id; // Obtener el ID del chat existente
          await axios.put(`http://localhost:8000/chat/${chatId}`, {
            conversation: 
            [{question,
            answer}]
          });
        } else {
          // Si no hay un chat existente, hacer una solicitud POST para crear uno nuevo
          await axios.post('http://localhost:8000/chat', {
            userId,
            conversation: [{
              question,
              answer
            }]
          });
        }
  
        // Actualizar el estado de chatMessages con la nueva conversación
        getChatMessages();
  
        // Limpiar el input de pregunta después de enviarla
        setQuestion('');
      } else {
        console.error('Error en la solicitud:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
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
        userId,
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
    await axios.delete(`http://localhost:8000/chat/${chatId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setChatMessages([]);
    } catch (error) {
      console.error('Error al borrar la conversación:', error);
    }
  };

   return (
    <div className="container">
    <h1>Chat GPT</h1>
    <div className="chat-messages">
      {/* Mostrar todas las conversaciones en chatMessages */}
      {chatMessages.map((chat, index) => (
        <div key={index} className="chat-message">
          {chat.conversation.map((message, i) => (
            <div key={i} className="message-bubble">
            <div className="question">
            <p>Human</p>
              <p>{message.question}</p>
              </div>
              {message.answer && (
                <div className="answer">
                  <p> &#129302 :</p>
                  <p>{message.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
      <input type="text" placeholder="Nueva pregunta" value={question} onChange={handleQuestionChange} />
      <button onClick={sendQuestion}>Enviar</button>
      <button onClick={clearChat}>Borrar Conversación</button>
    </div>
  );
};

export default ChatComponent;