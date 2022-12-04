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
import Session from "./session-log-components/Session";
import SearchPage from "./search-page/SearchPage";
import InvalidPage from "./InvalidPage/InvalidPage";

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
            path="/profile/:id"
            element={<RequireAuth children={<StudentProfile />} />}
          />
          <Route
            path="/settings"
            element={<RequireAdminAuth children={<AdminSettingsPage />} />}
          />
          <Route
            path="/log"
            element={<RequireAdminAuth children={<Session />} />}
          />
          <Route
            path="/search"
            element={<RequireAuth children={<SearchPage />} />}
          />
          <Route
            path="*"
            element={<RequireAuth children={<InvalidPage />} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
