import React from "react";
import { Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthProvider";

interface Props {
  children: JSX.Element;
}

const RequireAuth:React.FC<Props> = ({ children }) => {
  const { user } = useAuth();
  console.log("Req user is" + user);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <AuthProvider children={children} />;
};

export default RequireAuth;
