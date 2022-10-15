import React from 'react';
import LoginPage from './login-page/Login';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
