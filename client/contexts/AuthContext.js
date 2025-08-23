import React, { createContext, useContext, useState } from 'react';

/**
 * Authentication Context
 * Manages user authentication state and provides methods for sign-in/sign-up
 */
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  /**
   * Sign up a new user
   * @param {Object} userData - User data containing name, email, password
   */
  const signUp = async (userData) => {
    try {
      // Simulate API call
      console.log('Signing up user:', userData);
      
      // Create user object
      const newUser = {
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
      return { success: false, error: error.message };
    }
  };

  /**
   * Sign in existing user
   * @param {Object} credentials - User credentials containing email and password
   */
  const signIn = async (credentials) => {
    try {
      // Simulate API call
      console.log('Signing in user:', credentials.email);
      
      // Mock user data
      const existingUser = {
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
      return { success: false, error: error.message };
    }
  };

  /**
   * Sign out user
   */
  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
  };

  /**
   * Set user type after selection
   * @param {string} userType - Selected user type
   */
  const setUserType = (userType) => {
    if (user) {
      setUser(prev => ({ ...prev, userType }));
      setHasCompletedOnboarding(true);
    }
  };

  /**
   * Reset password (mock implementation)
   * @param {string} email - User's email
   */
  const resetPassword = async (email) => {
    try {
      console.log('Password reset requested for:', email);
      // Simulate API call
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
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
