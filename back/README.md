Para activar el backend:

cd back
npm install

USUARIOS

diferentes rutas:

http://localhost:8000/login POST

http://localhost:8000/users/register POST Para registro de usuarios

http://localhost:8000/login POST Para el login de usuarios

Para autenticación JWT:
-POST a http://localhost:8000/login
-Recibirás un token
-GET a http://localhost:8000/users insertando el token recibido anteriormente en el auth.

Una vez autenticado:
-Para borrar un usuario: DELETE a http://localhost:8000/users/{userId}
-Para encontrarlo: GET a http://localhost:8000/users/{userId}
-Para actualizar alguno de sus parámetros: PUT a http://localhost:8000/users/{userId}

---

CHAT

POST a http://localhost:8000/chat
con estructura JSON:
{
"userId": "64a82ca1aed18ca9c757cc60",
"question":"hola",
"answer":"bien"
}
Al hacer esto se generará un chatId tanto en la bbdd como en la respuesta.

-Para conseguir un chat de un usuario: GET a http://localhost:8000/chat/:userId
-Para borrar un chat de un usuario: DELETE a http://localhost:8000/chat/:chatId
-Para actualizarlo: PUT a http://localhost:8000/chat/:chatId
