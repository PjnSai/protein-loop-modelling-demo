import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { LoadingSpinner } from "./ui";

const ProtectedRoute = ({
  children,
  redirectTo = "/login",
  showLoadingSpinner = true,
  requiredPermission = null,
}) => {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return showLoadingSpinner ? (
      <LoadingSpinner text="Checking authentication..." fullPage />
    ) : null;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          <h5>Access Denied</h5>
          <p>You don't have permission to access this page.</p>
          <a href="/dashboard" className="btn btn-primary">
            Return to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
