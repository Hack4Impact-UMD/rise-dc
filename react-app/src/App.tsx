import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import RequireAdminAuth from "./auth/RequireAdminAuth";
import Login from "./pages/Login/Login";
import Landing from "./pages/LandingPage/Landing";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import { AuthProvider } from "./auth/AuthProvider";
import StudentProfile from "./pages/StudentProfile/StudentProfile";
import Session from "./session-log-components/Session";
import AllUsers from "./pages/AllUsers/AllUsers";
import InvalidPage from "./pages/InvalidPage/InvalidPage";
import StudentCreation from "./pages/StudentProfile/CreateStudent/StudentCreation";
import TimeReport from "./report/TimeReport/TimeReport";
import IndividualReport from "./report/IndividualReport/IndividualReport";
import UsersPage from "./pages/AllUsers/IntroPage";

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
            path="/log/:id"
            element={<RequireAuth children={<Session />} />}
          />
          <Route
            path="/users"
            element={<RequireAuth children={<UsersPage />} />}
          />
          <Route
            path="/students"
            element={<RequireAuth children={<AllUsers mode="STUDENTS" />} />}
          />
          <Route
            path="/teachers"
            element={<RequireAuth children={<AllUsers mode="TEACHERS" />} />}
          />
          <Route
            path="/createstudent"
            element={<RequireAuth children={<StudentCreation />} />}
          />
          <Route
            path="/timereport/:id"
            element={<RequireAuth children={<TimeReport />} />}
          />
          <Route
            path="/indivreport/:id/:date"
            element={<RequireAuth children={<IndividualReport />} />}
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
