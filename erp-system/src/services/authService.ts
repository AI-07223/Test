import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { User, UserRole } from '../types/auth.types';

export const AuthService = {
  // Login with Firebase Auth and fetch Role from Firestore
  login: async (email: string, password: string): Promise<User> => {
    try {
      // 1. Authenticate with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // 2. Fetch extra user data (Role) from Firestore
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        return userData;
      } else {
        // Fallback if user exists in Auth but not in Firestore (shouldn't happen in strict ERP)
        // We create a basic entry for them
        const newUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || 'Unknown User',
          role: UserRole.EMPLOYEE, // Default role
        };
        await setDoc(userDocRef, newUser);
        return newUser;
      }
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  },

  // Logout
  logout: async (): Promise<void> => {
    await signOut(auth);
  },

  // Helper for creating users (e.g., for a 'Sign Up' page or Admin 'Create User' modal)
  register: async (email: string, password: string, name: string): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const newUser: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: name,
      role: UserRole.EMPLOYEE, // Everyone starts as Employee by default
    };

    // Save to Firestore
    await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
    return newUser;
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
