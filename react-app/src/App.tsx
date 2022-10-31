import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './auth/RequireAuth';
import DummyLogin from './temp-components/DummyLogin'
import Landing from './landing-page-components/Landing';
import "./App.css";
import { AuthProvider } from './auth/AuthProvider';
import storeLog from './session-logs/store-log';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<DummyLogin/>} />
          storeLog(Timestamp.fromDate(new Date("December 10, 1815")), 1, "test1", "test2", "test3", "test4", "test5");
          <Route path = "/login" element = {<DummyLogin/>} /> 
          <Route path = "/landing" element = {<RequireAuth children = {<Landing/>} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
