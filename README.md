<!-- * Soy Eric Grau, aprendiz de programador Full-Stack Web Developer en el curso CodeSpace en Málaga.

<!--* Entre los diferentes lenguajes de programación, frameworks y tecnologías a usar, he decidido escoger Javascript, React, MongoDB y Node.js -->

<!-- * En este proyecto final debo realizar una página web con diferentes características   -->

<!--TODO - Desarrollo Completo Font-End y Back-End -->

<!--TODO - Implementación de las bases de datos  -->

<!--TODO - Gestión de usuarios completa. Debe incluir registro e inicio de sesión. -->

<!--TODO - CRUD completo sobre, al menos, un modelo de la BBDD con interacción desde el front-end.

<!-- TODO - Implementación de una API REST para llevar a cabo la conexión entre las partes. -->

<!-- TODO - Las partes presentadas no deberán presentar errores de ningún tipo. -->

<!-- TODO - Un diseño y experiencia de usuario coherente, siguiendo la premisa mobile first y valorando la usabilidad de todos los contenidos.

<!-- TODO - <!-- El proyecto deberá estar documentado, incluyendo un archivo README.md  detallado, una licencia, y los correspondientes comentarios dentro del código.


<!--?   Para instalar Node.js y dependencias como express, nodemon y mongoose  -->

<!--* NODE.js

- npm init
- npm install express
- npm install mongoose
- npm i --save-dev nodemon / nodemon app.js (activar servidor y cambios sin reiniciarlo)
- node app.js (activar el servidor dependiendo del puerto en /env)
- npm install express mongodb mongoose body-parser
- npm install --save mongoose-unique-validator
- npm install ramda
- npm install cors
- npm install bcrypt
- npm install jsonwebtoken
- npm install openai

REACT.js

- npx create-react-app proyecto_final_react
- npm start (servidor React)
- npm install axios -->

Para poder ejecutar este proyecto, necesitarás Node.js y React.
Se trata de un chatbot con la api de Chat GPT, de OpenAI.
Se diferencian 3 carpetas, una con el frontend (front) , otra con el backend (back) y otra con la lógica y gestión de la api (openai-api).

Para poder empezar, abre tu terminal:

git clone https://github.com/EricGrauBenitez/proyecto_final

Para activar el backend:

cd back
npm install

USUARIOS

diferentes rutas:

http://localhost:8000/login POST

http://localhost:8000/users/register POST Para registro de usuarios
Por ejemplo:
{
"name": "Nombre del Usuario",
"lastName": "Apellido del Usuario",
"city": "Ciudad (opcional)",
"country": "País (opcional)",
"email": "correo@ejemplo.com",
"password": "contraseña_segura",
"chats": [
{
"\_id": "ID_DEL_CHAT_1",
"conversation": [],
"title": "Título del Chat 1",
"createdAt": 1631295667000
},
{
"\_id": "ID_DEL_CHAT_2",
"conversation": [],
"title": "Título del Chat 2",
"createdAt": 1631295668000
}
]
}

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

POST a http://localhost:8000/chat/:userId/
con estructura JSON:
{
"conversation": [
{
"question": "Primera pregunta",
"answer": "Primera respuesta"
}
],
"title": "Título del Nuevo Chat"
}

-Para conseguir un chat de un usuario: GET a http://localhost:8000/chat/:userId/:chatId
-Para borrar un chat de un usuario: DELETE a http://localhost:8000/chat/:userId/:chatId
-Para actualizarlo: PUT a http://localhost:8000/chat/:userId/:chatId
{
"conversation":
[{"question":"hola",
"answer":"bien"}]
}
