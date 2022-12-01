import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Login from "./login-page/Login";
import RequireAdminAuth from "./auth/RequireAdminAuth";
import Landing from "./landing-page-components/Landing";
import AdminSettingsPage from "./settings-page/AdminSettingsPage";
import "./App.css";
import { AuthProvider } from "./auth/AuthProvider";

function App() {
  return (
    <div>
         <AdminSettingsPage/>
    </div>
  );
}

export default App;
