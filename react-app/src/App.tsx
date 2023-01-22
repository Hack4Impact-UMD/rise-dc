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
import Loading from "./loading-screen/Loading";

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
          <Route path="/log" element={<RequireAuth children={<Session />} />} />
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
