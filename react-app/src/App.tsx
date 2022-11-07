import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './auth/RequireAuth';
import Login from './login-page/Login'
import Landing from './landing-page-components/Landing';
import "./App.css";
import { AuthProvider } from './auth/AuthProvider';
import storeLog from './session-logs/store-log';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Login/>} />
          <Route path = "/login" element = {<Login/>} /> 
          <Route path = "/landing" element = {<RequireAuth children = {<Landing/>} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
