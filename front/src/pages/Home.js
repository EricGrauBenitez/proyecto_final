import React from "react";
import { Link } from 'react-router-dom';
import '../css/Home.css';

function Home() {
  return (
    <div className="container">
      <div className="content">
        <h1>CHAT GPT</h1>
        <p>Inicia sesión para usar el chat o regístrate, ¡es muy fácil!.</p>
        <div className="link-container">
          <Link className="link" to="/login">LOGIN</Link>
          <Link className="link" to="/register">SIGNUP</Link>
          <Link className="link" to="/chat">CHAT</Link>
        </div>
      </div>
    </div>
  );
}
export default Home;