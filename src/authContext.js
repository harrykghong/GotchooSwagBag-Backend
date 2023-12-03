import React, { createContext, useContext } from 'react';
import { Auth } from 'aws-amplify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const signIn = async (username, password) => {
    return await Auth.signIn(username, password);
  };

  const signOut = async () => {
    return await Auth.signOut();
  };

  // other functionalities like signUp, confirmSignUp, etc.

  return (
    <AuthContext.Provider value={{ signIn, signOut /* , other exposed functions */ }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
