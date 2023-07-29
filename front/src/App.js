import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ChatComponent from './components/ChatComponent';
import UsersPage from './pages/UsersPage';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
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
