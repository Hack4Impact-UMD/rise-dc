import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DummyLogin from './temp-components/DummyLogin'
import DummyLanding from './temp-components/DummyLanding'
import "./App.css";
import RequireAuth from './auth/RequreAuth';
import Landing from './landing-page-components/Landing';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<RequireAuth children = {<DummyLanding/>} />} />
          <Route path = "/login" element = {<DummyLogin/>} />
          <Route path = "/landing" element = {<RequireAuth children = {<DummyLanding/>} />} />
          <Route path = "/dummylanding" element = {<Landing/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
