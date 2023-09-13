import './css/App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ChatLayout from './layouts/ChatLayout';
import UsersPage from './pages/UsersPage';
import ForgotPassword from './pages/ForgotPassword';
import RegisterForm from './pages/RegisterForm';
import PrivateRoute from './components/PrivateRoute';
import { useSelector } from 'react-redux';
import './css/Home.css';
import Home from './pages/Home';
import ConversationPage from './pages/Conversation';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      console.log('Usuario autenticado.'); // Agrega un console.log aquí

    } else {
      setIsLoggedIn(false);
      console.log('Usuario no autenticado.'); // Agrega un console.log aquí

    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/chat"
            element={<ChatLayout />}>
            <Route
              path=":chatId"
              element={
                <ConversationPage />
              }
            />
          </Route>
          <Route
            path="/users"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <UsersPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
