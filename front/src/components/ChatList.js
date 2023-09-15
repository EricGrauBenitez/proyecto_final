import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import ChatEditor from "./ChatEditor";
import axios from 'axios';
import '../css/ChatList.css';
import DeleteConfirmation from './DeleteConfirmation';
import { setConversation, removeChat } from '../features/chatSlice';

const ChatList = ({ onSelectChat, getChatMessages }) => {
  const chats = useSelector(state => state.chat.chats);
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const chatId = localStorage.getItem('chatId');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [deleteConfirmationState, setDeleteConfirmationState] = useState({});


  const onSaveChat = async (title) => {
    await axios.put(`http://localhost:8000/chat/${userId}/${selectedChat._id}`, {
      ...selectedChat,
      title
    })
    setIsEditingTitle(false)
    getChatMessages()
  }

  const clearChat = async (chat) => {
    try {
      if (!chat) {
        console.error('El chat es nulo o indefinido');
        return;
      }
      {
        // Si el usuario confirma la eliminación, realiza la solicitud de eliminación
        await axios.delete(`http://localhost:8000/chat/${userId}/${chat._id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        dispatch(removeChat(chat._id));
        dispatch(setConversation([]));
      }
    } catch (error) {
      console.error('Error al borrar la conversación:', error);
    }
  };

  const sortedChats = useMemo(() => chats.slice().sort((a, b) => b.updateAt - a.updateAt, [chats]))

  const setChatToEdit = (chat) => {
    setSelectedChat(chat)
    setIsEditingTitle(true)
  }


  return (
    <div className="chat-list">
      <ul>
        {
          sortedChats
            .map((chat, index) => (
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
                      <FaEdit />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => {
                        // Abre la confirmación para este chat específico
                        setDeleteConfirmationState({ ...deleteConfirmationState, [chat._id]: true });
                      }}
                    >
                      <AiOutlineDelete />
                    </button>

                    {/* Agrega la confirmación de eliminación solo si está abierta para este chat */}
                    {deleteConfirmationState[chat._id] && (
                      <DeleteConfirmation
                        isOpen={deleteConfirmationState[chat._id]}
                        onCancel={() => {
                          // Cierra la confirmación para este chat específico
                          setDeleteConfirmationState({ ...deleteConfirmationState, [chat._id]: false });
                        }}
                        onConfirm={() => clearChat(chat)}
                      />
                    )}
                  </>
                )}
              </li>
            ))
        }
      </ul>
    </div>
  )
};

export default ChatList;
