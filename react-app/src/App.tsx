import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DummyLogin from './temp-components/DummyLogin'
import DummyLanding from './temp-components/DummyLanding'
import "./App.css";
import RequireAuth from './auth/RequireAuth';
import { AuthProvider } from './auth/AuthProvider';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<DummyLogin />} />
          <Route path = "/login" element = {<DummyLogin/>} /> 
          <Route path = "/landing" element={<RequireAuth children={<DummyLanding />} /> }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
