import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface Props {
  children: JSX.Element;
}

const RequireAdminAuth: React.FC<Props> = ({ children }) => {
  const authContext = useAuth();
  // Use loading state to check if context is loading. Even if a user is signed
  // in, the state is still null initially for some reason, causing the component to
  // always redirect to login.
  if (authContext.loading) {
    return <div>Loading</div>;
  } else if (!authContext.user || authContext.token.claims.role != "admin") {
    return <Navigate to="/login" state={{ redir: window.location.pathname }} />;
  }

  return children;
};

export default RequireAdminAuth;
