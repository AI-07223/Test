import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types/auth.types';
import { AuthService } from '../services/authService';

// Define the shape of the Context (what data/functions are available to components)
interface AuthContextType extends AuthState {
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the Context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
// This wraps our entire app and provides the 'user' state to everyone
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false, // In a real app, this starts as true while we check Firebase
  });

  const login = async (email: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const user = await AuthService.login(email);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      alert((error as Error).message); // Simple error handling
    }
  };

  const logout = async () => {
    await AuthService.logout();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use the AuthContext easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
