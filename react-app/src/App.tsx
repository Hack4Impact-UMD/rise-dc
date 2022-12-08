import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import RequireAdminAuth from "./auth/RequireAdminAuth";
import Login from "./login-page/Login";
import Landing from "./landing-page-components/Landing";
import SettingsPage from "./settings-page/SettingsPage";
import { AuthProvider } from "./auth/AuthProvider";
import StudentProfile from "./student-profile/StudentProfile";
import Session from "./session-log-components/Session";
import SearchPage from "./search-page/SearchPage";
import InvalidPage from "./InvalidPage/InvalidPage";
import StudentCreation from "./student-profile/StudentCreation";

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
            path="/profile/:id"
            element={<RequireAuth children={<StudentProfile />} />}
          />
          <Route
            path="/settings"
            element={<RequireAuth children={<SettingsPage />} />}
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
            path="/createstudent"
            element={<RequireAuth children={<StudentCreation />} />}
          />
          <Route
            path="*"
            element={<RequireAuth children={<InvalidPage />} />}
          />
          <Route path="*" element={<p>404 Page not found</p>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
