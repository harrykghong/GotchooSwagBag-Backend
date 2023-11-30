import React, { createContext, useContext, useState } from 'react';

// Create a context for the auth state
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = (newUser, cb) => {
    // ... sign-in logic
    setUser(newUser);
    cb(); // callback function after signing in
  };

  const signOut = (cb) => {
    // ... sign-out logic
    setUser(null);
    cb(); // callback function after signing out
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
