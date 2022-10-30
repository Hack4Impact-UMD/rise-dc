import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './auth/RequireAuth';
import DummyLogin from './temp-components/DummyLogin'
import Landing from './landing-page-components/Landing';
import "./App.css";
import { AuthProvider } from './auth/AuthProvider';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<DummyLogin/>} />
          <Route path = "/login" element = {<DummyLogin/>} /> 
          <Route path = "/landing" element = {<RequireAuth children = {<Landing/>} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
