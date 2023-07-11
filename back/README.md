http://localhost:8000/ GET

http://localhost:8000/login POST

http://localhost:8000/users/register POST Para registro de usuarios

http://localhost:8000/login POST Para el login de usuarios

Para autenticación JWT:

POST a http://localhost:8000/login

Recibirás un token

GET a http://localhost:8000/users insertando el token recibido anteriormente en el auth.
