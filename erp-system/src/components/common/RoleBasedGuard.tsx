import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth.types';
import { AuthService } from '../../services/authService';

interface RoleBasedGuardProps {
  requiredRole: UserRole;
  children: React.ReactNode;
}

/**
 * RoleBasedGuard Component
 *
 * Use this to wrap BUTTONS or SECTIONS of a page.
 * If the user doesn't have the role, the content is hidden.
 */
export const RoleBasedGuard: React.FC<RoleBasedGuardProps> = ({ requiredRole, children }) => {
  const { user } = useAuth();

  if (!user) return null;

  const hasAccess = AuthService.hasPermission(user.role, requiredRole);

  if (!hasAccess) return null;

  return <>{children}</>;
};
