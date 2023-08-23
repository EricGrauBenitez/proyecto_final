// import axios from 'axios';

// // Función para obtener el userId
// export const getUserId = async () => {
//   try {
//     const response = await axios.get('http://localhost:8000/users'); // Ajusta la URL
//     const userId = response.data.userId; 

//     return userId;
//   } catch (error) {
//     console.error('Error al obtener el userId:', error);
//     return null;
//   }
// };

// // Función para obtener el chatId después de hacer POST al chat
// export const getChatId = async (userId) => {
//   try {
//     const response = await axios.post('http://localhost:8000/chat', {
//       userId,
//       question: '',
//       answer: '',
//     });

//     const chatId = response.data.chatId;

//     return chatId;
//   } catch (error) {
//     console.error('Error al obtener el chatId:', error);
//     return null;
//   }
// };
