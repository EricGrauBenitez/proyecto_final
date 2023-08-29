import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import UsersPage from './pages/UsersPage';
import RegisterForm from './pages/RegisterForm';
import TokenComponent from './components/TokenComponent';
import { useSelector } from 'react-redux';
import './Home.css';
import Home from './pages/Home';


function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Cambia esto según el estado de autenticación real

  useEffect(() => {
    console.log('Is logged in', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/protected" element={isLoggedIn ? <TokenComponent /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
