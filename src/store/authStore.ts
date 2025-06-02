import { create } from 'zustand';
import { User, Student, Educator, Admin } from '../types';
import { findUserByEmail, allUsers } from '../mock/users';

interface AuthState {
  user: User | Student | Educator | Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user by email (in a real app, we would validate the password too)
      const user = findUserByEmail(email);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // In a real app, we would validate the password here
      // For demo purposes, we'll just log in with any password
      
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred', 
        isLoading: false,
        isAuthenticated: false,
        user: null
      });
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = findUserByEmail(email);
      
      if (existingUser) {
        throw new Error('Email already in use');
      }
      
      // Create new student user (in a real app, this would be done on the server)
      const newUser: Student = {
        id: `student-${allUsers.length + 1}`,
        name,
        email,
        role: 'student',
        createdAt: new Date().toISOString(),
        enrolledCourses: [],
        completedCourses: [],
        progress: {},
        cart: []
      };
      
      // In a real app, we would save this user to the database
      // and hash the password, etc.
      
      set({ user: newUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred', 
        isLoading: false 
      });
    }
  }
}));