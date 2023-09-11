import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatLayout.css'; 
import Logout from '../components/Logout';
import SidebarChats from '../components/SidebarChats';
import ConversationPage from '../pages/Conversation' ;
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat, setConversation, setChats } from '../features/chatSlice';

const ChatLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [chatId, setChatId] = useState(localStorage.getItem('chatId')) 
  const [showSidebar, setShowSidebar] = useState(true);


  const userId = localStorage.getItem('userId'); 

  const currentChat = useSelector(state => state.chat.currentChat)

  useEffect(() => {
    if (chatId) dispatch(setCurrentChat(chatId))
    return () => {}
  }, [chatId])

  useEffect(() => {
    if (currentChat) {
      getChatConversation()
      navigate(`/chat/${currentChat}`)
    }
    return () => {}
  }, [currentChat])

  useEffect(() => {
    // Obtener la conversación inicial al cargar el componente
    getChatMessages();
  }, []);
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const sendQuestion = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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', // TODO
          'OpenAI-Organization': 'org-GsbDrECiJ47sjAfkaHrfKaDN'
        },
        body: JSON.stringify({ query: question })
      });

      if (response.ok) {
        const answer = await response.text(); 

        setAnswer(answer);
        saveChat(question, answer);
        setQuestion('');
      } else {
        console.error('Error en la solicitud:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  const saveChat = async (question, answer) => {
    try {
      const chatData = {
        conversation: [{ question, answer }]
      };
  
      let response;

      console.log('CHAT ID', chatId)
  
      if (chatId) {
        response = await axios.put(`http://localhost:8000/chat/${userId}/${chatId}`, chatData);
      } else {
        response = await axios.post(`http://localhost:8000/chat/${userId}`, chatData);
        localStorage.setItem('chatId', response.data.chatId)
      } 
  
      if (response.status === 200 || response.status === 201) {
        // Actualizar el estado de chatMessages con la nueva conversación
        getChatMessages();

        getChatConversation();
  
        // Limpiar el input de pregunta después de enviarla
        setQuestion('');
      } else if (response.status === 404) {
        console.error('Chat no encontrado.');
      } else {
        console.error('Error al guardar el chat:', response.statusText);
      }
    } catch (error) {
      console.error('Error al guardar el chat:', error);
    }
  };
  
  const clearChat = async () => {
  try {
    if (chatId) {
      await axios.delete(`http://localhost:8000/chat/${userId}/${chatId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

    dispatch(setConversation([]))
    localStorage.removeItem('chatId')
    setChatId(null)
  } else {
    console.log('No hay chatId válido para borrar');
  }
    } catch (error) {
      console.error('Error al borrar la conversación:', error);
    }
  };
  const getChatMessages = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/chat/${userId}`);
      dispatch(setChats(data));
    } catch (error) {
      console.error('Error al obtener la lista de chats:', error);
      // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  const getChatConversation = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/chat/${userId}/${chatId}`);

      dispatch(setConversation(data))
    } catch (error) {
      console.error('Error al obtener la conversación:', error);
      // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  }
   const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

   return (
    <>
      <button className="toggle-sidebar-button" onClick={handleToggleSidebar}>
        Toggle Sidebar
      </button>
      <div className="chat-layout">
        <SidebarChats showSidebar={showSidebar} />
      <div className="container">
        <h1>Chat GPT</h1>
        <Outlet />
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
      </div>
    </>
  );
};

export default ChatLayout;