import React from "react";
import { userAuth } from "../../hooks/useAuth";
import Loader from "../common/Loader";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles = [] }) => {
  const { loading, isAuthenticated, hasRole } = userAuth();
  if (loading) {
    return <Loader fullScreen />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (roles.length > 0 && !hasRole(roles)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You don't have permission to access this page
          </p>
        </div>
      </div>
    );
  }
  return children
};

export default ProtectedRoute;
