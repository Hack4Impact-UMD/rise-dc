import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import RequireAdminAuth from "./auth/RequireAdminAuth";
import DummyLogin from "./temp-components/DummyLogin";
import DummyLanding from "./temp-components/DummyLanding";
import AdminSettingsPage from "./settings-page/AdminSettingsPage";
import "./App.css";
import { AuthProvider } from "./auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DummyLogin />} />
          <Route path="/login" element={<DummyLogin />} />
          <Route
            path="/landing"
            element={<RequireAuth children={<DummyLanding />} />}
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
