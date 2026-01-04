import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, SignUpData, SignInData, AuthResult, UserType } from '../types';
import * as authService from '../services/authService';

/**
 * Authentication Context
 * Manages user authentication state with real backend API calls
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize auth state on app launch
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = await authService.initializeAuth();
        if (storedUser) {
          setUser(storedUser as User);
          setIsAuthenticated(true);
          setHasCompletedOnboarding(storedUser.userType !== null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Sign up a new user
   */
  const signUp = async (userData: SignUpData): Promise<AuthResult> => {
    try {
      const result = await authService.signUp({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      if (result.success && result.user) {
        setUser(result.user as User);
        setIsAuthenticated(true);
        return { success: true };
      }

      return { success: false, error: result.error || 'Sign up failed' };
    } catch (error) {
      console.error('Sign up error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Sign in existing user
   */
  const signIn = async (credentials: SignInData): Promise<AuthResult> => {
    try {
      const result = await authService.signIn({
        email: credentials.email,
        password: credentials.password,
      });

      if (result.success && result.user) {
        setUser(result.user as User);
        setIsAuthenticated(true);
        setHasCompletedOnboarding(result.user.userType !== null);
        return { success: true };
      }

      return { success: false, error: result.error || 'Invalid email or password' };
    } catch (error) {
      console.error('Sign in error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Sign out user
   */
  const signOut = async (): Promise<void> => {
    await authService.signOut();
    setUser(null);
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
  };

  /**
   * Set user type after selection
   */
  const setUserType = async (userType: UserType): Promise<void> => {
    if (!user) return;

    try {
      const result = await authService.setUserType(user.id, userType as 'customer' | 'vendor');

      if (result.success && result.user) {
        setUser(result.user as User);
        setHasCompletedOnboarding(true);
      }
    } catch (error) {
      console.error('Set user type error:', error);
    }
  };

  /**
   * Reset password
   */
  const resetPassword = async (email: string): Promise<AuthResult> => {
    try {
      const result = await authService.resetPassword(email);
      return { success: result.success, error: result.error };
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

  // Show nothing while checking auth state (or you could render a loading spinner)
  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
