import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Login from "./login-page/Login";
import RequireAdminAuth from "./auth/RequireAdminAuth";
import Landing from "./landing-page-components/Landing";
import AdminSettingsPage from "./settings-page/AdminSettingsPage";
import "./App.css";
import { AuthProvider } from "./auth/AuthProvider";
import Session from "./session-log-components/Session";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/landing"
            element={<RequireAuth children={<Landing />} />}
          />
          <Route
            path="/settings"
            element={<RequireAdminAuth children={<AdminSettingsPage />} />}
          />
          <Route
            path="/logs"
            element={<RequireAuth children={<Session />} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;