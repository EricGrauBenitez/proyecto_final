import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ChatEditor from "./ChatEditor";
import axios from 'axios';
import './ChatList.css';

const ChatList = ({ onSelectChat }) => {
  const chats = useSelector(state => state.chat.chats);
  const userId = localStorage.getItem('userId'); 
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const onSaveChat = async (title) => {
    await axios.put(`http://localhost:8000/chat/${userId}/${selectedChat._id}`, {
      ...selectedChat,
      title
    })
  }

  const setChatToEdit = (chat) => {
    setSelectedChat(chat)
    setIsEditingTitle(true)
    console.log(selectedChat)
    console.log(isEditingTitle)
  }
  return (
    <div className="chat-list">  
      <ul>
        {
          chats.map((chat, index) => (
          <li key={index} className="chat-title-item">
            {isEditingTitle && selectedChat._id === chat._id ? (
              <>
              <ChatEditor title={chat.title} onSaveChat={onSaveChat} onCloseEditor={() => setIsEditingTitle(false)} /> 
              </>
            ) : (
              <>
              <span
              onClick={() => onSelectChat(chat._id)}
              className={selectedChat && selectedChat._id === chat._id ? 'selected' : ''}
            >
              {chat.title}
            </span>
            <button
              className="edit-button"
              onClick={() => setChatToEdit(chat)}
            >
              Edit
            </button>
          </>
        )}
      </li>
          ))
        }
      </ul>
    </div>
  )

  // const [chats, setChats] = useState([]);
  // const [selectedChat, setSelectedChat] = useState(null);
  // const userId = localStorage.getItem('userId'); 
  // useEffect(() => {
  //   const fetchChatTitles = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8000/chat/titles/${userId}/`);
  //       const chatTitles = response.data;
  //       const chatList = Object.keys(chatTitles).map((chatId) => ({
  //         _id: chatId,
  //         title: chatTitles[chatId],
  //       }));
  //       setChats(chatList);
  //     } catch (error) {
  //       console.error('Error al obtener los títulos de los chats:', error);
  //     }
  //   };

  //   fetchChatTitles(); // Llamar a la función para obtener los títulos de los chats
  // }, []);
  // return (
  //   <div className="chat-list">
  //     <ul className="chat-list-items">
  //       {chats.map((chat) => (
  //         <li key={chat._id} onClick={() => onSelectChat(chat._id)}>
  //           <span className="chat-list-bullet">&#8226;</span>
  //           {chat.title}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default ChatList;
