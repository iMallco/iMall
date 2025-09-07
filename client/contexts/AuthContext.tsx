import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType, SignUpData, SignInData, AuthResult, UserType } from '../types';

/**
 * Authentication Context
 * Manages user authentication state and provides methods for sign-in/sign-up
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);

  /**
   * Sign up a new user
   * @param userData - User data containing name, email, password
   */
  const signUp = async (userData: SignUpData): Promise<AuthResult> => {
    try {
      // Simulate API call
      console.log('Signing up user:', userData);
      
      // Create user object
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        userType: null, // Will be set after user type selection
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Sign in existing user
   * @param credentials - User credentials containing email and password
   */
  const signIn = async (credentials: SignInData): Promise<AuthResult> => {
    try {
      // Simulate API call
      console.log('Signing in user:', credentials.email);
      
      // Mock user data
      const existingUser: User = {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        userType: null,
      };
      
      setUser(existingUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Sign out user
   */
  const signOut = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
  };

  /**
   * Set user type after selection
   * @param userType - Selected user type
   */
  const setUserType = (userType: UserType): void => {
    if (user) {
      setUser(prev => prev ? { ...prev, userType } : null);
      setHasCompletedOnboarding(true);
    }
  };

  /**
   * Reset password (mock implementation)
   * @param email - User's email
   */
  const resetPassword = async (email: string): Promise<AuthResult> => {
    try {
      console.log('Password reset requested for:', email);
      // Simulate API call
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, error: errorMessage };
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    hasCompletedOnboarding,
    signUp,
    signIn,
    signOut,
    setUserType,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

