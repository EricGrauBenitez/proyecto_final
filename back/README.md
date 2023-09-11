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

SOBRE TITLES:

-Para editar un title:
http://localhost:8000/chat/:chatId/title
con JSON
{
"title":"Gran pollo"
}

-Para recoger todos los títulos de chats de un usuario:
GET a http://localhost:8000/chat/titles/:userId

-Para recoger un título de un chat:
GET a http://localhost:8000/chat/:chatId/title

---

PARA LA CONTRASEÑA OLVIDADA
Paso 1: Enviar una solicitud de recuperación de contraseña

POST http://localhost:puerto/forgot-password

{
"email": "correo@example.com"
}

Paso 2: Verifica la base de datos

Verifica que el token de recuperación de contraseña se ha almacenado correctamente en tu base de datos. Puedes hacerlo consultando tu base de datos o utilizando una herramienta de administración de bases de datos como MongoDB Compass si estás utilizando MongoDB.

Paso 3: Simula el proceso de restablecimiento de contraseña

Crea una nueva solicitud en Thunder Client para simular el proceso de restablecimiento de contraseña. Configura la solicitud para acceder a la página de restablecimiento de contraseña utilizando el token en la URL. Por ejemplo:
bash
Copy code
GET http://localhost:puerto/reset-password/elTokenAqui
Ejecuta la solicitud. Deberías recibir una respuesta del servidor que confirma si el token es válido o ha expirado.
Paso 4: Verifica la página de restablecimiento de contraseña

Si la solicitud en el paso anterior confirmó que el token es válido, puedes verificar que la página de restablecimiento de contraseña se muestra correctamente en tu aplicación React.

Paso 5: Simula el restablecimiento de contraseña

Crea una nueva solicitud en Thunder Client para simular el restablecimiento de contraseña real. Configura la solicitud para enviar una solicitud POST al servidor con la nueva contraseña del usuario. Por ejemplo:
bash
Copy code
POST http://localhost:puerto/reset-password/elTokenAqui
En el cuerpo de la solicitud, agrega la nueva contraseña del usuario en formato JSON:

json
Copy code
{
"password": "nueva_contraseña_aqui"
}
Ejecuta la solicitud. Deberías recibir una respuesta del servidor indicando que la contraseña se ha restablecido con éxito.
Paso 6: Verifica el acceso con la nueva contraseña

Asegúrate de que ahora puedas iniciar sesión en tu aplicación utilizando la nueva contraseña que estableciste en el paso anterior. Puedes hacerlo manualmente iniciando sesión en tu aplicación con el correo electrónico y la nueva contraseña.

Siguiendo estos pasos, podrás probar y verificar el flujo completo de recuperación de contraseña en tu aplicación, desde el envío del correo electrónico de recuperación hasta el restablecimiento de la contraseña y la comprobación de que la nueva contraseña funcione para iniciar sesión. Esto te ayudará a garantizar que tu funcionalidad de recuperación de contraseña esté funcionando correctamente tanto en el backend como en el frontend.
