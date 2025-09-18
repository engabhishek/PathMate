import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import Loader from "../components/general/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/LoginPage" replace />;
  }

  return children;
};

export default ProtectedRoute;
