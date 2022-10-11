import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminSettingsPage from './pages/AdminSettingsPage';
import MentorTutorSettingsPage from './pages/MentorTutorSettingsPage';

import "./App.css";

function App() {
  return (
      <div>
        <AdminSettingsPage/>
      </div>
  );
}

export default App;
