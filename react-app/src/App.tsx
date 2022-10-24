import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './auth/RequireAuth';
import RequireAdminAuth from './auth/RequireAdminAuth';
import DummyLogin from './temp-components/DummyLogin'
import DummyLanding from './temp-components/DummyLanding';
import "./App.css";
import {AuthProvider} from './auth/AuthProvider'
import SearchPage from './search-page/SearchPage'

function App() {
  return (
    <div>
      <SearchPage/>
    </div>
  );
}

export default App;
