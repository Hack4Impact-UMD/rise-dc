import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DummyLogin from './components/DummyLogin'
import DummyLanding from './components/DummyLanding'
import "./App.css";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path = "/login" element = {<DummyLogin/>} />
          <Route path = "/landing" element = {<DummyLanding/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
