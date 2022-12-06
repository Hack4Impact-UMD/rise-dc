import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Login from "./login-page/Login";
import RequireAdminAuth from "./auth/RequireAdminAuth";
import Landing from "./landing-page-components/Landing";
import AdminSettingsPage from "./settings-page/AdminSettingsPage";
import "./App.css";
import { AuthProvider } from "./auth/AuthProvider";
import Report from "./report/report-page-2/Report"

function App() {
  return (
    <div>
         <Report/>
    </div>
  );
}

export default App;
