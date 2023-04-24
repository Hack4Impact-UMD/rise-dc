import React from "react";
import { Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthProvider";
import Loading from "../components/LoadingScreen/Loading";

interface Props {
  children: JSX.Element;
}

const RequireAuth: React.FC<Props> = ({ children }) => {
  const authContext = useAuth();
  if (authContext.loading) {
    return <Loading />;
  } else if (!authContext.user) {
    return <Navigate to="/login" state={{ redir: window.location.pathname }} />;
  }

  return <AuthProvider children={children} />;
};

export default RequireAuth;
