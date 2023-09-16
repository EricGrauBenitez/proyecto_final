import { useState } from "react";
import '../css/ChatEditor.css';
import { FaCheck, FaTimes } from 'react-icons/fa';


const ChatEditor = ({ title, selectedChat, onSaveChat, onCloseEditor }) => {
  const [titleToEdit, setTitleToEdit] = useState(title);

  const handleTitleChange = (e) => {
    setTitleToEdit(e.target.value);
  };

  const saveEditedChat = () => {
    onSaveChat(titleToEdit);
    onCloseEditor(false);
  };

  return (
    <div className="chat-editor">
      <input
        type="text"
        value={titleToEdit}
        onChange={handleTitleChange}
      />
      <button
        className='button-confirm-edit'
        onClick={saveEditedChat}>
        <FaCheck />
      </button>
      <button
        className='button-cancel-edit'
        onClick={onCloseEditor}>
        <FaTimes />
      </button>
    </div>
  );
};

export default ChatEditor;
