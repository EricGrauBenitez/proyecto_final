import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ChatLayout.css';
import { IoIosSend, IoMdMenu } from 'react-icons/io';
import { BsLayoutSidebarReverse } from 'react-icons/bs'
import { AiFillHome, AiOutlineUser } from 'react-icons/ai';
import SidebarChats from '../components/SidebarChats';
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat, setConversation, setChats } from '../features/chatSlice';

import { logout } from '../features/userSlice'

const ChatLayout = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const dispatch = useDispatch();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  // const [chatId, setChatId] = useState(params.chatId)
  const [showSidebar, setShowSidebar] = useState(true);


  const userId = localStorage.getItem('userId');

  const currentChat = useSelector(state => state.chat.currentChat)

  useEffect(() => {
    dispatch(setCurrentChat(chatId))
    return () => { }
  }, [chatId])

  useEffect(() => {
    if (currentChat) {
      getChatConversation()
      navigate(`/chat/${currentChat}`)
    }
    return () => { }
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

      // if (chatId) {
      //   response = await axios.put(`http://localhost:8000/chat/${userId}/${chatId}`, chatData);
      // } else {
      //   response = await axios.post(`http://localhost:8000/chat/${userId}`, chatData);
      //   localStorage.setItem('chatId', response.data.chatId)
      //   setChatId(response.data.chatId)
      // }
      response = await axios.put(`http://localhost:8000/chat/${userId}/${chatId}`, chatData);

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

  const getChatMessages = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/chat/${userId}`, {
        token: localStorage.getItem
      });
      dispatch(setChats(data));
    } catch (error) {
      console.error('Error al obtener la lista de chats:', error);
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
      <div className="toggle-sidebar-container">
        <button
          className={`toggle-sidebar-button ${showSidebar ? 'move-right' : ''}`}
          onClick={handleToggleSidebar}
        >
          <BsLayoutSidebarReverse />
        </button>
        <div className="chat-layout">
          <SidebarChats showSidebar={showSidebar} getChatMessages={getChatMessages} />
          <div className="container">
            <h1>Chat GPT</h1>
            <Outlet />
            <footer className="chat-footer">
              <div className="textarea-container">
                <div className="textarea-button-container">
                  <div className="textarea-wrapper">
                    <textarea
                      type="text"
                      placeholder="Send question"
                      value={question}
                      onChange={handleQuestionChange}
                    />
                    <button className="send-button" onClick={sendQuestion}>
                      <IoIosSend />
                    </button>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatLayout;