import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { TAuthContext } from './types';
import { FirebaseApp } from 'firebase/app';
import { getAuth, User, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth';

type TProps = {
  children: React.ReactNode;
  firebaseApp: FirebaseApp;
};

export const authContext = createContext<TAuthContext>({
  isAuthenticated: null,
  user: null,
  loginWithEmailAndPassword: () => Promise.reject({}),
});

export const useAuthContext = (): TAuthContext => {
  return useContext<TAuthContext>(authContext);
};

export const AuthContextProvider: FC<TProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<TAuthContext['isAuthenticated']>(null);
  const [user, setUser] = useState<User | null>(null);
  const [auth] = useState(getAuth(props.firebaseApp));

  useEffect(() => {
    if (!auth) {
      return;
    }

    auth.setPersistence(browserSessionPersistence);

    auth.onAuthStateChanged((user) => {
      // console.log('auth changed', user);
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
  }, [auth]);

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // log success auth
        return result;
      })
      .catch((error) => {
        // log auth errors
        throw error;
      });
  };

  return (
    <authContext.Provider value={{ isAuthenticated, user, loginWithEmailAndPassword }}>
      {props.children}
    </authContext.Provider>
  );
};
