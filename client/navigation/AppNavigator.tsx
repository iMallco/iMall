import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList } from '../types';

// Import screens
import IntroductionScreen from '../screens/IntroductionScreen';
import AuthSelectionScreen from '../screens/AuthSelectionScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import UserTypeSelectionScreen from '../screens/UserTypeSelectionScreen';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * Main App Navigator
 * Handles navigation flow based on authentication state
 */
const AppNavigator: React.FC = () => {
  const { isAuthenticated, hasCompletedOnboarding } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        {!isAuthenticated ? (
          // Unauthenticated stack - Onboarding flow
          <>
            <Stack.Screen
              name="Introduction"
              component={IntroductionScreen}
              options={{
                animationEnabled: false,
              }}
            />
            <Stack.Screen
              name="AuthSelection"
              component={AuthSelectionScreen}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
            />
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
            />
          </>
        ) : !hasCompletedOnboarding ? (
          // Authenticated but onboarding not complete
          <Stack.Screen
            name="UserTypeSelection"
            component={UserTypeSelectionScreen}
            options={{
              gestureEnabled: false, // Prevent going back
            }}
          />
        ) : (
          // Fully authenticated and onboarded - Main app screens would go here
          <Stack.Screen
            name="MainApp"
            component={() => {
              // Placeholder for main app content
              // In a real app, this would be your main tab navigator or home screen
              return null;
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

