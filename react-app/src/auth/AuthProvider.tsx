import { getAuth, onIdTokenChanged, User, IdTokenResult } from "@firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../config/firebase";

interface Props {
  children: JSX.Element;
}

interface AuthContextType {
  user: User;
  token: IdTokenResult;
  loading: boolean;
}

// The AuthContext that other components may subscribe to.
let AuthContext = createContext<AuthContextType>(null!);

// Updates the AuthContext and re-renders children when the user changes.
// See onIdTokenChanged for what events trigger a change.
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | any>(null!);
  const [token, setToken] = useState<IdTokenResult>(null!);
  // The loading state is used by RequireAuth/RequireAdminAuth
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const auth = getAuth(app);
    onIdTokenChanged(auth, (newUser) => {
      setUser(newUser);
      if (newUser != null) {
        newUser.getIdTokenResult().then((newToken) => {
          setToken(newToken);
        });
      }
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
