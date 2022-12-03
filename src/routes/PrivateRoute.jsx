import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { user } = useUserContext();
  return user != null || user != undefined ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
