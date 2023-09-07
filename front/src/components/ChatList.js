import React from 'react';

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <div key={chat._id} onClick={() => onSelectChat(chat._id)}>
          {chat.title}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
