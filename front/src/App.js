import './css/App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ChatLayout from './layouts/ChatLayout';
import UsersPage from './pages/UsersPage';
import ForgotPassword from './pages/ForgotPassword';
import RegisterForm from './pages/RegisterForm';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/AuthContext';
import { useSelector } from 'react-redux';
import './css/Navbar.css';
import Home from './pages/Home';
import ConversationPage from './pages/Conversation';
import Navbar from './components/Navbar'; // Importa el componente de navegación


function App() {

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <ChatLayout />
                </PrivateRoute>}>
              <Route
                path=":chatId"
                element={
                  <PrivateRoute>
                    <ConversationPage />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UsersPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
