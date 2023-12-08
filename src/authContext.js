import React, { createContext, useContext, useState } from 'react';
import { Auth } from 'aws-amplify';

// Create a context for the auth state
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (username, password, cb) => {
    try {
      const user = await Auth.signIn(username, password);
      setUser(user);
      if (cb) cb(); // callback function after signing in
    } catch (error) {
      console.error('Error signing in', error);
      // Handle errors such as user not confirmed, wrong credentials etc.
    }
  };

  const signOut = async (cb) => {
    try {
      await Auth.signOut();
      setUser(null);
      if (cb) cb(); // callback function after signing out
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
