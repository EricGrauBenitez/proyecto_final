import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.css'; 
import Logout from '../components/Logout'; 
import { useNavigate } from 'react-router-dom';
import ChatList from '../components/ChatList';
import ChatEditor from '../components/ChatEditor';
import SidebarChats from '../components/SidebarChats';


const Chat = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId')); 
  const [chatId, setChatId] = useState(localStorage.getItem('chatId')); 
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentChatId, setCurrentChatId] = useState(null); // Estado para el chat actual
  const [userChats, setUserChats] = useState([]); // Estado para almacenar los chats del usuario
  const [chatTitles, setChatTitles] = useState([]);

  const navigate = useNavigate();

  // Conseguir todos los títulos de los chats de un user
  useEffect(() => {
    getChatTitles(); // Esta función debe obtener los títulos de los chats del usuario
  }, []);

  const getChatTitles = async () => {
    try {
      // Realiza una solicitud GET al nuevo endpoint para obtener los títulos
      const { data } = await axios.get(`http://localhost:8000/chat/titles/${userId}/`);
      setChatTitles(data); // Almacena los títulos en el estado
    } catch (error) {
      console.error('Error al obtener los títulos de los chats:', error);
    }
  };

  // Lista chats
  useEffect(() => {
    getUserChats(); // Esta función debe obtener los chats del usuario
  }, []);

  const getUserChats = async () => {
    try {
      // Realiza una solicitud GET al servidor para obtener los chats del usuario
      const { data } = await axios.get(`http://localhost:8000/user/${userId}/chats`);
      setUserChats(data);
    } catch (error) {
      console.error('Error al obtener los chats del usuario:', error);
    }
  };

// Función para guardar un nuevo título en la db

const handleSaveChatTitle = async (chatId, newTitle) => {
  try {
    // Realiza una solicitud PUT para actualizar el título del chat en la base de datos
    await axios.put(`http://localhost:8000/chat/${chatId}/title`, {
      title: newTitle,
    });

    // Actualiza el estado de los chats con el título actualizado
    const updatedChats = userChats.map((chat) =>
      chat._id === chatId ? { ...chat, title: newTitle } : chat
    );
    setUserChats(updatedChats);

    // Si el chat seleccionado tiene el mismo chatId, actualiza su título
    if (selectedChat && selectedChat._id === chatId) {
      setSelectedChat({ ...selectedChat, title: newTitle });
    }
  } catch (error) {
    console.error('Error al guardar el título del chat:', error);
  }
};
// Conseguir los mensajes de una conversación
  useEffect(() => {
    getChatMessages();
  }, []);

  const getChatMessages = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/chat/${userId}`);
      // * http://localhost:8000/chat/${userId}/{chatId}
      setChatMessages(data);
      setConversation(data[0].conversation);
    } catch (error) {
      console.error('Error al obtener la conversación:', error);
    }
  };
  // Función para seleccionar una conversación
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };
  const startNewConversation = async () => {
    try {
      // Hacer una solicitud POST al servidor para crear una nueva conversación
      const response = await axios.post('http://localhost:8000/chat', {
        userId,
        conversation: [
          {
            question: ' ',
            answer: ' '
          }
        ],
      });

      const newChatId = response.data.chatId;

      // Actualizar el chatId en el estado y en la localStorage
      setChatId(newChatId);
      localStorage.setItem('chatId', newChatId);
  
      const newChat = {
        _id: newChatId, // Define el _id con el valor del nuevo chatId
        userId: 'valorDelUserId',
        conversation: [
          {
            question: 'Hola',
            answer: 'Hola! En qué puedo ayudarte?'
          }
        ],
        title: 'Título del chat'
      };
      
      // Actualizar la conversación en el estado con el nuevo chat
      setChatMessages({ [newChatId]: newChat }); // Agregar el nuevo chat al estado
      setCurrentChatId(newChatId); // Establecer el chat actual

    } catch (error) {
      console.error('Error al crear una nueva conversación:', error);
    }
  };
  const updateChat = async (newChatId, newChat) => {
    try {
      // Realizar la solicitud PUT utilizando el _id del nuevo chat
      await axios.put(`http://localhost:8000/chat/${newChatId}`, {
        conversation: [{ question, answer }]
      });
  
      // Actualizar el estado con la nueva conversación
      setChatMessages([newChat]);
    } catch (error) {
      console.error('Error al actualizar el chat:', error);
    }
  };
  const onSelectChat = async (chatId) => {
    setSelectedChat(chatId); // Establecer el chat seleccionado

    try {
      // Obtener mensajes del chat seleccionado y mostrarlos en el editor de chat
      const { data } = await axios.get(`http://localhost:8000/chat/${chatId}`);
      setSelectedChat(data);
    } catch (error) {
      console.error('Error al cargar el chat seleccionado:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      if (selectedChat) {
        // Si hay un chat seleccionado, actualiza el chat usando una solicitud PUT
        const response = await axios.put(
          `http://localhost:8000/chat/${chatId}`,
          {
            conversation: [...selectedChat.conversation, { question, answer }],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.status === 200) {
          // Actualiza el estado de la conversación seleccionada
          const updatedSelectedChat = {
            ...selectedChat,
            conversation: [...selectedChat.conversation, { question, answer }],
          };
          setSelectedChat(updatedSelectedChat);
  
          // Actualiza el estado de la conversación en la lista de chats del usuario (userChats)
          const updatedUserChats = userChats.map((chat) =>
            chat._id === selectedChat._id
              ? { ...chat, conversation: updatedSelectedChat.conversation }
              : chat
          );
          setUserChats(updatedUserChats);
  
          setQuestion('');
        } else {
          console.error('Error al actualizar el chat:', response.status);
        }
      } else {
        // Si no hay un chat seleccionado, envía una nueva pregunta usando una solicitud POST
        const response = await fetch('http://localhost:4000/api/v1/gpt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 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',
            'OpenAI-Organization': 'org-GsbDrECiJ47sjAfkaHrfKaDN',
          },
          body: JSON.stringify({ query: question }),
        });
  
        if (response.ok) {
          const answer = await response.text();
          setAnswer(answer);
  
          // Agregar la pregunta y respuesta a la conversación
          saveChat(userId, question, answer);
  
          const newMessage = { question, answer };
          const updatedChat = {
            ...chatMessages[currentChatId],
            conversation: [...chatMessages[currentChatId].conversation, newMessage],
          };
          setChatMessages({ ...chatMessages, [currentChatId]: updatedChat }); // Actualizar el chat en el estado
          setQuestion('');
        } else {
          console.error('Error en la solicitud:', response.status);
        }
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  

  const handleCreateChat = async () => {
    try {
      // Realiza una solicitud para crear una nueva conversación en la base de datos
      const response = await axios.post('http://localhost:8000/chat', {
        userId, 
        title: 'Nuevo Chat', 
      });
  
      if (response.status === 201) {
        // Si la solicitud es exitosa, obtén el chatId generado
        const chatId = response.data.chatId;
  
        // Actualiza el estado de las conversaciones
        setChats([...chats, { _id: chatId, title: 'Nuevo Chat' }]);
  
        // Selecciona la conversación recién creada
        setSelectedChat({ _id: chatId, title: 'Nuevo Chat', conversation: [] });
      } else {
        console.error('Error al crear la conversación:', response.status);
      }
    } catch (error) {
      console.error('Error al crear la conversación:', error);
    }
  };
  const handleSaveChat = async (chatId, newTitle) => {
    try {
      // Realiza una solicitud para actualizar el título de la conversación en la base de datos
      const response = await axios.put(`http://localhost:8000/chat/${chatId}`, {
        title: newTitle,
      });
  
      if (response.status === 200) {
        // Si la solicitud es exitosa, actualiza el estado de las conversaciones
        const updatedChats = chats.map((chat) => {
          if (chat._id === chatId) {
            return { ...chat, title: newTitle };
          }
          return chat;
        });
  
        setChats(updatedChats);
  
        // Actualiza la conversación seleccionada si es la misma
        if (selectedChat && selectedChat._id === chatId) {
          setSelectedChat({ ...selectedChat, title: newTitle });
        }
      } else {
        console.error('Error al guardar el título de la conversación:', response.status);
      }
    } catch (error) {
      console.error('Error al guardar el título de la conversación:', error);
    }
  };
  // Función para mostrar u ocultar la barra lateral
  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };


  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };
  
 
  const saveChat = async (userId, question, answer) => {
    try {
      // Obtener el chat actual
      const currentChat = chatMessages[currentChatId];
  
      if (currentChat) {
        // Si existe un chat actual, hacer una solicitud PUT para actualizarlo
        const chatId = currentChat._id; // Obtener el ID del chat actual
        await axios.put(`http://localhost:8000/chat/${chatId}`, {
          conversation: [...currentChat.conversation, { question, answer }]
        });
      } else {
        // Si no existe un chat actual, hacer una solicitud POST para crear uno nuevo
        const response = await axios.post('http://localhost:8000/chat', {
          userId,
          conversation: [{ question, answer }]
        });
  
        if (response.status === 201) {
          // Si la solicitud es exitosa, obtén el chatId generado
          const chatId = response.data.chatId;
  
          // Actualizar el estado de las conversaciones
          const updatedChats = [
            ...chats,
            { _id: chatId, title: 'Nuevo Chat' }
          ];
          setChats(updatedChats);
  
          // Establecer el chat actual y su chatId
          setCurrentChatId(chatId);
          setChatId(chatId);
          localStorage.setItem('chatId', chatId);
        } else {
          console.error('Error al crear la conversación:', response.status);
        }
      }
  
      // Actualizar el estado del chat actual con la nueva conversación
      const updatedChat = {
        ...currentChat,
        conversation: [...currentChat.conversation, { question, answer }]
      };
      setChatMessages({ ...chatMessages, [currentChatId]: updatedChat });
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
    <button onClick={handleToggleSidebar}>Toggle Sidebar</button>
    <SidebarChats
    chats={userChats}
    onSelectChat={onSelectChat}
    onSaveChatTitle={handleSaveChatTitle}
    handleToggleSidebar={handleToggleSidebar}
    chatTitles={chatTitles} 
    showSidebar={showSidebar} // Agrega showSidebar como prop

  />
      <h1>Chat GPT</h1>
      <section className="chat-wrapper">
        {showSidebar && (
          <ChatList
            chats={userChats}
            selectedChat={selectedChat}
            onSelectChat={handleSelectChat}
            onCreateChat={handleCreateChat}
          />
        )}
        {selectedChat && (
          <ChatEditor
            selectedChat={selectedChat}
            onSaveChat={handleSaveChat}
            onToggleSidebar={handleToggleSidebar}
          />
        )}
        <div className="chat-messages">
          {Object.values(chatMessages).map((chat, index) => (
            <div key={index} className="chat-message">
              {chat.conversation.map((message, messageIndex) => (
                <div key={messageIndex} className="message-bubble">
                  {/* Representa los mensajes de la conversación aquí */}
                  <div className="question message-wrapper">
                    <p>Human</p>
                    <p>{message.question}</p>
                  </div>
                  {message.answer && (
                    <div className="answer message-wrapper">
                      <p> &#8704 :</p>
                      <p>{message.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
      <footer className="chat-footer">
        <textarea type="text" placeholder="Nueva pregunta" value={question} onChange={handleQuestionChange} />
        <div className="chat-footer-buttons">
          <button onClick={handleSendMessage}>Enviar</button>   
          <button onClick={startNewConversation}>Crear Conversación</button>
          <button onClick={clearChat}>Borrar Conversación</button>
          <button onClick={updateChat}>Actualizar Chat</button>
          <button onClick={() => navigate('/')}>Go to Home</button>
          <button onClick={() => navigate('/users')}>User</button>
          <Logout />
        </div>
      </footer>
    </div>
  );
};

export default Chat;