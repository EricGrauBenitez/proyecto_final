import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import UsersPage from './pages/UsersPage';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import RegisterForm from './pages/RegisterForm';
import PrivateRoute from './components/PrivateRoute';
import { useSelector } from 'react-redux';
import './Home.css';
import Home from './pages/Home';


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
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/chat"
            element={
              // {//<PrivateRoute isLoggedIn={isLoggedIn}>
                <Chat />
              // </PrivateRoute>}
            }
          />
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
