import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const jwt_token = localStorage.getItem("jwt_token");
  return jwt_token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
