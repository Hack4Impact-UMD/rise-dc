import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Login from "./login-page/Login";
import RequireAdminAuth from "./auth/RequireAdminAuth";
import Landing from "./landing-page-components/Landing";
import AdminSettingsPage from "./settings-page/AdminSettingsPage";
import { AuthProvider } from "./auth/AuthProvider";
import styles from "./App.module.css";

function App() {
  const s = styles;
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Landing />} />
          <Route
            path="/landing"
            element={<RequireAuth children={<Landing />} />}
          />
          <Route
            path="/settings"
            element={<RequireAdminAuth children={<AdminSettingsPage />} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
