import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/Login';
import ChatComponent from './components/ChatComponent';


function App() {
  return (
    <div className="App">
      <Login />
      <h1>Chat GPT</h1>
      <ChatComponent />
    </div>
  );
}

export default App;
