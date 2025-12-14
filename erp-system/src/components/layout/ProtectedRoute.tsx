import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth.types';
import { AuthService } from '../../services/authService';

interface ProtectedRouteProps {
  requiredRole?: UserRole; // Optional: If not provided, just checks if logged in
}

/**
 * ProtectedRoute Component
 *
 * This component wraps pages that need security.
 * 1. Checks if the user is logged in.
 * 2. If `requiredRole` is passed, checks if the user has permission.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { user, isAuthenticated } = useAuth();

  // 1. Not logged in? Redirect to Login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Logged in, but checks role hierarchy
  if (requiredRole) {
    const hasAccess = AuthService.hasPermission(user.role, requiredRole);
    if (!hasAccess) {
      // User is logged in but doesn't have enough permission
      // We could redirect to a "403 Unauthorized" page, or just Dashboard
      return <div style={{ padding: 20, color: 'red' }}>Access Denied: You need to be a {requiredRole} to view this page.</div>;
    }
  }

  // 3. All good? Render the child routes
  return <Outlet />;
};
