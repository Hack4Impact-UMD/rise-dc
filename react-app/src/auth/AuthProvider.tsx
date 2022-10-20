import { getAuth, onIdTokenChanged } from '@firebase/auth';
import React, { createContext, useContext, useEffect, useState} from 'react';
import app from '../config/firebase';


interface Props {
  children: JSX.Element
}

interface AuthContextType {
  user: any;
  token: IdToken;
}

interface IdToken {
  claims: {
    role: String
  }
}

let AuthContext = createContext<AuthContextType>(null!);


export const AuthProvider: React.FC<Props> = ({children}) => {
  const [user, setUser] = useState<any>({});
  const [token, setToken] = useState<any>({claims: {role: "none"}});
  useEffect(() => {
    const auth = getAuth(app);
    onIdTokenChanged(auth, (user) => {
      setUser(user);
      if (user != null) {
        user.getIdTokenResult().then((token) => {
          setToken(token);
        });
      }
    });
  }, [])

  return (
    <AuthContext.Provider value={{user, token }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  return useContext(AuthContext);
}
