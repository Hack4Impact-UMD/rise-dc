import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './auth/RequireAuth';
import DummyLogin from './temp-components/DummyLogin'
import Landing from './landing-page-components/Landing';
import "./App.css";
import { AuthProvider } from './auth/AuthProvider';
import Session from './session-log-components/Session';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<DummyLogin/>} />
          <Route path = "/login" element = {<DummyLogin/>} /> 
          <Route path = "/landing" element = {<RequireAuth children = {<Landing/>} />} />
          <Route path = "/logs" element = {<RequireAuth children = {<Session/>} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
