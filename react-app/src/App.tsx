import React from 'react';
import LoginPage from './login-page/Login';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './auth/RequireAuth';
import RequireAdminAuth from './auth/RequireAdminAuth';
import DummyLogin from './temp-components/DummyLogin'
import DummyLanding from './temp-components/DummyLanding';
import AdminSettingsPage from './settings-page/AdminSettingsPage';
import "./App.css";
import {AuthProvider} from './auth/AuthProvider'

function App() {
  return (
    <AdminSettingsPage/>
  );
}

export default App;
