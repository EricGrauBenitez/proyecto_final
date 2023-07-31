import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import ChatComponent from './components/ChatComponent';
import UsersPage from './pages/UsersPage';
import RegisterForm from './components/RegisterForm';
import './Home.css';

function Home() {
  return (
    <div className="container">
      <h1>CHAT GEPETO</h1>
      <p>Inicia sesión para usar el chat o regístrate, ¡es muy fácil!.</p>
      <div className="link-container">
        <Link className="link" to="/login">Iniciar sesión</Link>
        <Link className="link" to="/register">Registrarse</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/chat" element={<ChatComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
