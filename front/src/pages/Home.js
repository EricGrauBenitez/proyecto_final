import React from "react";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1>CHAT GEPETO</h1>
      <p>Inicia sesión para usar el chat o regístrate, ¡es muy fácil!.</p>
      <div className="link-container">
        <Link className="link" to="/login">Iniciar sesión</Link>
        <Link className="link" to="/register">Registrarse</Link>
        <Link className="link" to="/chat">Ir al Chat</Link>
      </div>
    </div>
  );
}
export default Home;