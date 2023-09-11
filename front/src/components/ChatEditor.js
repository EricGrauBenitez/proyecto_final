import { useState } from "react";
import './ChatEditor.css'

const ChatEditor = ({ title, selectedChat, onSaveChat, onCloseEditor }) => {
  const [titleToEdit, setTitleToEdit] = useState(title);

  const handleTitleChange = (e) => {
    setTitleToEdit(e.target.value);
  };

  const saveEditedChat = () => {
    onSaveChat(titleToEdit);
  };

  return (
    <div className="chat-editor">
          <input
            type="text"
            value={titleToEdit}
            onChange={handleTitleChange}
          />
          <button onClick={saveEditedChat}>Guardar Título</button>
          <button onClick={onCloseEditor}>Cerrar Editor</button>
    </div>
  );
};

export default ChatEditor;
