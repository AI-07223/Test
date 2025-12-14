// Defines the Role Hierarchy
// We use 'as const' to make these values read-only and type-safe
export const UserRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE',
} as const;

// This derives the type 'UserRole' from the values of the object
export type UserRole = typeof UserRole[keyof typeof UserRole];

// Defines the structure of a User in our system
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

// Defines the structure of the AuthContext state
export interface AuthState {
  user: User | null;         // The currently logged-in user object, or null if logged out
  isAuthenticated: boolean;   // Quick check if user is logged in
  isLoading: boolean;         // Are we still checking if the user is logged in?
}
