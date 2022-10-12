import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminSettingsPage from './settings-page/AdminSettingsPage';
import MentorTutorSettingsPage from './settings-page/MentorTutorSettingsPage';

import "./App.css";

function App() {
  return (
      <div>
        <AdminSettingsPage/>
      </div>
  );
}

export default App;
