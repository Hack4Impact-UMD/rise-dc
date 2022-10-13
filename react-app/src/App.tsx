import React from 'react';
import StudentLoginPage from './login-page/StudentLoginPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./App.css";

function App() {
  return (
      <div>
        <StudentLoginPage/>
      </div>
  );
}

export default App;
