import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './AuthProvider';

interface Props {
  children: JSX.Element
}

const RequireAdminAuth:React.FC<Props> = ({ children }) => {
  const auth = useAuth();
  if (!auth.user || auth.token.claims.role != "admin") {
    return <Navigate to="/login" />;
  }

  return <AuthProvider children={children}/>;
}
  
export default RequireAdminAuth;