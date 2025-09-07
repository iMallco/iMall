import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';

// Import providers and navigation
import { AuthProvider } from './contexts/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import { colors } from './styles/globalStyles';

/**
 * Main App Component
 * Sets up authentication context and navigation
 */
const App: React.FC = () => {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <StatusBar 
          style="light" 
          backgroundColor="transparent"
          translucent={true}
        />
        <AppNavigator />
      </View>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;

