import React from "react";
import { Navigate } from "react-router-dom";

const AuthRouting = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("jwt_token"));
  return token ? <Navigate to="/dashboard" /> : children;
};

export default AuthRouting;
