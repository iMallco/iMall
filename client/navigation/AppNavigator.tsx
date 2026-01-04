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
import CustomerTabNavigator from './CustomerTabNavigator';

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
        initialRouteName={!isAuthenticated ? 'Introduction' : !hasCompletedOnboarding ? 'UserTypeSelection' : 'MainApp'}
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
              options={{
                gestureEnabled: false, // Prevent swipe back from auth selection
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                gestureEnabled: true,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                gestureEnabled: true,
                headerShown: false,
              }}
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
          // Fully authenticated and onboarded - Show customer tab navigator
          <Stack.Screen
            name="MainApp"
            component={CustomerTabNavigator}
            options={{
              gestureEnabled: false, // Prevent going back once in main app
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

