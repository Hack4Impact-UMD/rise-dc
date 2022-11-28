import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Login from "./login-page/Login";
import Landing from "./landing-page-components/Landing";
import SettingsPage from "./settings-page/SettingsPage";
import { AuthProvider } from "./auth/AuthProvider";
import StudentProfile from "./student-profile/StudentProfile";

function App() {
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
            element={<RequireAuth children={<SettingsPage />} />}
          />
          <Route
            path="*"
            element={<RequireAuth children={<div> Invalid URL </div>} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
