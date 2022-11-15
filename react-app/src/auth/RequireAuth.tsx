import React from "react";
import { Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthProvider";

interface Props {
  children: JSX.Element;
}

const RequireAuth: React.FC<Props> = ({ children }) => {
  const authContext = useAuth();
  if (authContext.loading) {
    return (<div>Loading</div>);
  } else if (!authContext.user) {
    return <Navigate to="/login" />;
  }

  return <AuthProvider children={children} />;
};

export default RequireAuth;
