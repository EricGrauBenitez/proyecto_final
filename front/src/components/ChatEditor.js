import { useState } from "react";

const ChatEditor = ({ selectedChat, onSaveChat, onToggleSidebar }) => {
  const [editedTitle, setEditedTitle] = useState(selectedChat.title); // Estado para el título editado

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const saveEditedChat = () => {
    // Realizar una solicitud PUT para guardar el título editado en la base de datos
    onSaveChat(selectedChat._id, editedTitle);
  };

  return (
    <div className="chat-editor">
      <input
        type="text"
        value={editedTitle}
        onChange={handleTitleChange}
      />
      <button onClick={saveEditedChat}>Guardar Título</button>
      <button onClick={onToggleSidebar}>Cerrar Editor</button>
    </div>
  );
};

export default ChatEditor;
