import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ProgressSpinner } from 'primereact/progressspinner';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, hasRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center min-h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-content-center align-items-center min-h-screen">
        <div className="text-center">
          <h2>Access Denied</h2>
          <p>Please login to access this page.</p>
        </div>
      </div>
    );
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="flex justify-content-center align-items-center min-h-screen">
        <div className="text-center">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
