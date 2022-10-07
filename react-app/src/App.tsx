import React from 'react';

import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { NavBar } from './components/Navbar';

import "./App.css";

function App() {
  return (
    <>
      <p>
        Home
      </p>
      <BrowserRouter>
        <NavBar />
            <Route path="/">
              Home 
            </Route>
            <Route path="/about">
              
            </Route>
            <Route path="/contact">
              
            </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
