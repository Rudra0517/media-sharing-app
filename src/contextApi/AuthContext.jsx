import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("jwt_token") ? true : false
  );
  const [activeUser, setActiveUser] = useState({});

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, activeUser, setActiveUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

