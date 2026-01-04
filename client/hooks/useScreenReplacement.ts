import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

/**
 * Custom hook for enhanced screen replacement functionality
 * Provides utilities for managing navigation flow with screen replacement
 */
export const useScreenReplacement = () => {
  const navigation = useNavigation<NavigationProp>();

  /**
   * Replace current screen with a new one
   * Prevents users from going back to the replaced screen
   */
  const replaceScreen = useCallback(
    <T extends keyof RootStackParamList>(
      screenName: T,
      params?: RootStackParamList[T]
    ) => {
      navigation.replace(screenName, params);
    },
    [navigation]
  );

  /**
   * Reset navigation stack and navigate to a specific screen
   * Useful for authentication flows where you want to clear the entire stack
   */
  const resetToScreen = useCallback(
    <T extends keyof RootStackParamList>(
      screenName: T,
      params?: RootStackParamList[T]
    ) => {
      navigation.reset({
        index: 0,
        routes: [{ name: screenName, params }],
      });
    },
    [navigation]
  );

  /**
   * Navigate with conditional replacement
   * Replace if shouldReplace is true, otherwise navigate normally
   */
  const conditionalReplace = useCallback(
    <T extends keyof RootStackParamList>(
      screenName: T,
      shouldReplace: boolean,
      params?: RootStackParamList[T]
    ) => {
      if (shouldReplace) {
        navigation.replace(screenName, params);
      } else {
        navigation.navigate(screenName, params);
      }
    },
    [navigation]
  );

  /**
   * Go back with fallback replacement
   * If can't go back, replace with fallback screen
   */
  const goBackOrReplace = useCallback(
    <T extends keyof RootStackParamList>(
      fallbackScreen: T,
      params?: RootStackParamList[T]
    ) => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.replace(fallbackScreen, params);
      }
    },
    [navigation]
  );

  /**
   * Check if navigation can go back
   */
  const canGoBack = useCallback(() => {
    return navigation.canGoBack();
  }, [navigation]);

  return {
    replaceScreen,
    resetToScreen,
    conditionalReplace,
    goBackOrReplace,
    canGoBack,
    navigation,
  };
};

export default useScreenReplacement;
