import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './ChatComponent.css'; 
import { logout } from '../features/userSlice';
import { useDispatch } from 'react-redux';

const ChatComponent = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [chatMessages, setChatMessages] = useState(null);
  const [conversation, setConversation] = useState([]);


  const userId = '64c787b38f00c453efb785a5'; // Prueba con un usuario
  const chatId = '64c7c71065cdaf3c21ce98c5';
  const dispatch = useDispatch();
  // const [chatId, setChatId] = useState(null);
  // const [userId, setUserId] = useState(null);
  
  // useEffect(() => {
  //   // Iniciar un nuevo chat y obtener el chatId
  //   axios.post('http://localhost:8000/chat', { userId, conversation: [] })
  //     .then(response => {
  //       setChatId(response.data.chatId);
  //     })
  //     .catch(error => {
  //       // Manejar el error
  //       console.error('Error al iniciar el chat:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   // Obtener el userId desde el backend
  //   axios.get('http://localhost:8000/users') // Aquí debes proporcionar el userId del usuario actual
  //     .then(response => {
  //       setUserId(response.data.userId);
  //       // Puedes también guardar los chats obtenidos si los necesitas
  //       // const chats = response.data.chats;
  //     })
  //     .catch(error => {
  //       // Manejar el error
  //       console.error('Error al obtener el userId:', error);
  //     });
  // }, []);

  useEffect(() => {
    // Obtener la conversación inicial al cargar el componente
    getChatMessages();
  }, []);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };
  // const handleAnswerChange = (e) => {
  //   setAnswer(e.target.value);
  // };

  const getChatMessages = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/chat/${userId}`);
      setChatMessages(data);
      setConversation(data[0].conversation)
    } catch (error) {
      console.error('Error al obtener la conversación:', error);
    }
  };

  // const saveConversationToDB = async (question, answer) => {
  //   try {
  //     await axios.post('http://localhost:8000/chat', {
  //       userId,
  //       conversation: [
  //         {question, answer}]});
  //     // Luego de guardar en la base de datos, actualizamos el estado de chatMessages
  //     setChatMessages([
  //       ...chatMessages,
  //       {userId, conversation: [
  //           { question, answer }]}]);
  //   } catch (error) {
  //     console.error('Error al guardar la conversación en la base de datos:', error);
  //   }
  // };
  
  const sendQuestion = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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',
          'OpenAI-Organization': 'org-GsbDrECiJ47sjAfkaHrfKaDN'
        },
        body: JSON.stringify({ query: question })
      });
  
      if (response.ok) {
        const answer = await response.text();
        setAnswer(answer);
  
        // Verificar si hay un chat existente para actualizar
        const existingChat = chatMessages.find((chat) => chat.userId === userId);
        console.log(existingChat);
        console.log(chatMessages);
        if (existingChat) {
          // Si hay un chat existente, hacer una solicitud PUT para actualizarlo
          const chatId = existingChat._id; // Obtener el ID del chat existente
          await axios.put(`http://localhost:8000/chat/${chatId}`, {
            conversation: [{question, answer}]
          });
        } else {
          // Si no hay un chat existente, hacer una solicitud POST para crear uno nuevo
          await axios.post('http://localhost:8000/chat', {
            userId,
            conversation: [{question, answer}]
          });
        }
  
        // Actualizar el estado de chatMessages con la nueva conversación
        getChatMessages();
  
        // Limpiar el input de pregunta después de enviarla
        setQuestion('');
      } else {
        console.error('Error en la solicitud:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }; 

//   const updateChat = async () => {
//   try {
//     const response = await axios.put(`http://localhost:8000/chat/${chatId}`, {
//       question,
//       answer
//     });

//     if (response.status === 200) {
//       // Actualizar el estado de chatMessages con la conversación actualizada
//       const updatedChat = {
//         userId,
//         conversation: [{
//           question,
//           answer
//         }]
//       };
//       setChatMessages([...chatMessages, updatedChat]);
//       setQuestion('');
//       setAnswer('');
//     } else {
//       console.error('Error en la solicitud:', response.status);
//     }
//   } catch (error) {
//     console.error('Error en la solicitud:', error);
//   }
// };

  const clearChat = async () => {
  try {
    await axios.delete(`http://localhost:8000/chat/${chatId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setConversation([]);
    } catch (error) {
      console.error('Error al borrar la conversación:', error);
    }
  };

  /*

  chatMessages = [
    {
      question: "",
      answer: "",
    },
    
      question: "",
      answer: "",
    },
    
      question: "",
      answer: "",
    },
    
      question: "",
      answer: "",
    },
  ]

  chatMessages = [
    {
      userId: "",
      conversation: [
        {
          question: "",
          answer: ""
        }
      ]
    }
  ]

  */

   return (
    <div className="container">
    <h1>Chat GPT</h1>
    <section className="chat-wrapper">
    <div className="chat-messages">
      {/* Mostrar todas las conversaciones en chatMessages */}
        <div className="chat-message">
          {conversation && conversation.map(({question, answer}, i) => (
            <div key={i} className="message-bubble">
            <div className="question message-wrapper">
            <p>Human</p>
              <p>{question}</p>
              </div>
              {answer && (
                <div className="answer message-wrapper">
                  <p> &#129302 :</p>
                  <p>{answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
    </div>
    </section>
    <footer className="chat-footer">
      <textarea type="text" placeholder="Nueva pregunta" value={question} onChange={handleQuestionChange} />
      <div className="chat-footer-buttons">
        <button onClick={sendQuestion}>Enviar</button>
        <button onClick={clearChat}>Borrar Conversación</button>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </footer>
    </div>
  );
};

export default ChatComponent;