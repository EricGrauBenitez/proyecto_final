Para activar el backend:

cd back
npm install

diferentes rutas:

http://localhost:8000/login POST

http://localhost:8000/users/register POST Para registro de usuarios

http://localhost:8000/login POST Para el login de usuarios

Para autenticación JWT:
-POST a http://localhost:8000/login
-Recibirás un token
-GET a http://localhost:8000/users insertando el token recibido anteriormente en el auth.

---

POST a http://localhost:8000/chat
con estructura JSON:
{
"userId": "64a82ca1aed18ca9c757cc60",
"question":"hola",
"answer":"bien"
}
