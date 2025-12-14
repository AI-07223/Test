import { User, UserRole } from '../types/auth.types';

// MOCK SERVICE
// In a real app, this would talk to Firebase Auth and Firestore.
// For learning purposes, we simulate the backend logic here.

// Mock database of users
const MOCK_USERS: Record<string, User> = {
  'super@admin.com': {
    id: '1',
    email: 'super@admin.com',
    name: 'Super Administrator',
    role: UserRole.SUPER_ADMIN,
  },
  'admin@company.com': {
    id: '2',
    email: 'admin@company.com',
    name: 'System Admin',
    role: UserRole.ADMIN,
  },
  'manager@company.com': {
    id: '3',
    email: 'manager@company.com',
    name: 'Operations Manager',
    role: UserRole.MANAGER,
  },
  'employee@company.com': {
    id: '4',
    email: 'employee@company.com',
    name: 'John Doe',
    role: UserRole.EMPLOYEE,
  }
};

export const AuthService = {
  // Simulates logging in
  login: async (email: string): Promise<User> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = MOCK_USERS[email];
    if (user) {
      return user;
    } else {
      throw new Error("User not found. Try 'super@admin.com' or 'employee@company.com'");
    }
  },

  // Simulates logging out
  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
  },

  // Helper to check if a role is "above" another in hierarchy
  hasPermission: (userRole: UserRole, requiredRole: UserRole): boolean => {
    const hierarchy = {
      [UserRole.SUPER_ADMIN]: 4,
      [UserRole.ADMIN]: 3,
      [UserRole.MANAGER]: 2,
      [UserRole.EMPLOYEE]: 1,
    };

    return hierarchy[userRole] >= hierarchy[requiredRole];
  }
};
