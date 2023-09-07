import React, { useState } from 'react';
import ChatList from './ChatList';
import './SidebarChats.css';

const SidebarChats = ({ 
  chats, 
  onSelectChat, 
  onSaveChatTitle, 
  handleToggleSidebar, 
  chatTitles }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  const handleEditTitle = (chatId) => {
    const chat = chats.find((chat) => chat._id === chatId);
    setEditedTitle(chat.title);
    setIsEditingTitle(chatId);
  };

  const handleSaveTitle = (chatId) => {
    onSaveChatTitle(chatId, editedTitle);
    setIsEditingTitle(false);
  };
  
  const chatTitleArray = Object.keys(chatTitles).map((chatId) => ({
    chatId,
    title: chatTitles[chatId],
  }));

  return (
    <div className="sidebar">
      <button onClick={handleToggleSidebar}>Toggle Sidebar</button>
      <ChatList chats={chats} onSelectChat={onSelectChat} />
      <div className="chat-titles">
        {chatTitleArray.map((chatTitle, index) => (
          <div key={index}>
            {isEditingTitle === chatTitle.chatId ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <button onClick={() => handleSaveTitle(chatTitle.chatId)}>Save</button>
              </>
            ) : (
              <>
                <span onClick={() => onSelectChat(chatTitle.chatId)}>{chatTitle.title}</span>
                <button onClick={() => handleEditTitle(chatTitle.chatId)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarChats;
