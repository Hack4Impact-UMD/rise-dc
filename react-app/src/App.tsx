import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Login from "./login-page/Login";
import RequireAdminAuth from "./auth/RequireAdminAuth";
import Landing from "./landing-page-components/Landing";
import AdminSettingsPage from "./settings-page/AdminSettingsPage";
import { AuthProvider } from "./auth/AuthProvider";
import styles from "./App.module.css";
import StudentProfile from "./student-profile/StudentProfile";
import { logsToWeeks } from "./backend/FirestoreCalls";

function App() {
  const s = styles;
  console.log(logsToWeeks().then((result) => console.log(result)));
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RequireAuth children={<Landing />} />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/landing"
            element={<RequireAuth children={<Landing />} />}
          />
          <Route
            path="/profile"
            element={<RequireAuth children={<StudentProfile />} />}
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
