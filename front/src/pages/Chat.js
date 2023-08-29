import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.css'; 
import { useDispatch } from 'react-redux';
import Logout from '../components/Logout'; 
import { useNavigate } from 'react-router-dom';


const Chat = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId')); // Usa un estado para el userId
  const [chatId, setChatId] = useState(localStorage.getItem('chatId')); // Usa un estado para el chatId
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener la conversación inicial al cargar el componente
    getChatMessages();
  }, []);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const getChatMessages = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/chat/${userId}`);
      setChatMessages(data);
      setConversation(data[0].conversation);
      
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
        const answer = await response.text(); // Obtener el contenido JSON de la respuesta
        setAnswer(answer);
        setConversation(conversation => [...conversation, { question, answer }]);
  
        // Guardar el chat en la base de datos con el answer
        saveChat(userId, question, answer);
        setQuestion('');
      } else {
        console.error('Error en la solicitud:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  const saveChat = async (userId, question, answer) => {
    try {
      // Verificar si hay un chat existente para actualizar
      const existingChat = chatMessages.find((chat) => chat.userId === userId);
  
      if (existingChat) {
        // Si hay un chat existente, hacer una solicitud PUT para actualizarlo
        const chatId = existingChat._id; // Obtener el ID del chat existente
        await axios.put(`http://localhost:8000/chat/${chatId}`, {
          conversation: [{ question, answer }]
        });
      } else {
        // Si no hay un chat existente, hacer una solicitud POST para crear uno nuevo
        await axios.post('http://localhost:8000/chat', {
          userId,
          conversation: [{ question, answer }]
        });
      }
  
      // Actualizar el estado de chatMessages con la nueva conversación
      getChatMessages();
  
      // Limpiar el input de pregunta después de enviarla
      setQuestion('');
    } catch (error) {
      console.error('Error al guardar el chat:', error);
    }
  };
  const clearChat = async () => {
  try {
    if (chatId) {
      await axios.delete(`http://localhost:8000/chat/${chatId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    setConversation([]);
  } else {
    console.log('No hay chatId válido para borrar');
  }
    } catch (error) {
      console.error('Error al borrar la conversación:', error);
    }
  };

   return (
    <div className="container">
    <h1>Chat GPT</h1>
    <section className="chat-wrapper">
    <div className="chat-messages">
      {/* Mostrar todas las conversaciones en chatMessages */}
        <div className="chat-message">
          {conversation && conversation.map(({question, answer}, i) => (
            <div key={i} className="message-bubble">
            <div className="question message-wrapper">
            <p>Human</p>
              <p>{question}</p>
              </div>
              {answer && (
                <div className="answer message-wrapper">
                  <p> &#8704 :</p>
                  <p>{answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
    </div>
    </section>
    <footer className="chat-footer">
      <textarea type="text" placeholder="Nueva pregunta" value={question} onChange={handleQuestionChange} />
      <div className="chat-footer-buttons">
        <button onClick={sendQuestion}>Enviar</button>
        <button onClick={clearChat}>Borrar Conversación</button>
        <button onClick={() => navigate('/')}>Go to Home</button>
        <button onClick={() => navigate('/users')}>User</button>
        <Logout />
      </div>
    </footer>
    </div>
  );
};

export default Chat;