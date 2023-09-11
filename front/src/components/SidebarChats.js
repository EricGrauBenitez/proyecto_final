import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ChatList from './ChatList';
import ChatEditor from './ChatEditor'; 
import './SidebarChats.css';

const SidebarChats = ({
  showSidebar,
  onSaveChatTitle,
}) => {
  const navigate = useNavigate();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  const chats = useSelector(state => state.chat.chats);

  const handleEditTitle = (chatId) => {
    const chat = chats.find((chat) => chat._id === chatId);
    setEditedTitle(chat.title);
    setIsEditingTitle(chatId);
  };

  const handleSaveTitle = (chatId) => {
    onSaveChatTitle(chatId, editedTitle);
    setIsEditingTitle(false);
  };

  const onSelectChat = (chatId) => navigate(`/chat/${chatId}`)

  return (
    <div className={`sidebar ${showSidebar ? '' : 'hidden'}`}>
      <ChatList chats={chats} onSelectChat={onSelectChat} />
      <div className="chat-titles">
      {/* <ul>
        {chatTitleArray.map((chatTitle, index) => (
          <li key={index} className="chat-title-item">
            {isEditingTitle === chatTitle.chatId ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <button
                className="save-button" 
                onClick={() => handleSaveTitle(chatTitle.chatId)}>
                  Save
                </button>
              </>
            ) : (
              <>
              <span
              onClick={() => onSelectChat(chatTitle.chatId)}
              className={selectedChat === chatTitle.chatId ? 'selected' : ''}
            >
              {chatTitle.title}
            </span>
            <button
              className="edit-button"
              onClick={() => handleEditTitle(chatTitle.chatId)}
            >
              Edit
            </button>
          </>
        )}
      </li>
    ))}
    </ul> */}
  </div>
      {/* Agregar el componente ChatEditor */}
      {selectedChat && (
        <ChatEditor
          selectedChat={selectedChat}
          onSaveChat={onSaveChatTitle}
        />
      )}
    </div>
  );
};

export default SidebarChats;
