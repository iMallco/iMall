import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { colors, typography, spacing, borderRadius, globalStyles } from '../styles/globalStyles';
import { AuthSelectionScreenProps } from '../types';

/**
 * Authentication Selection Screen
 * Allows users to choose between signing up or signing in
 */
const AuthSelectionScreen: React.FC<AuthSelectionScreenProps> = ({ navigation }) => {
  const handleSignUp = (): void => {
    navigation.navigate('SignUp');
  };

  const handleSignIn = (): void => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2D3748', '#4A5568']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Header section with logo/icon */}
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <Ionicons 
              name="restaurant" 
              size={60} 
              color={colors.textLight} 
            />
          </View>
          
          <Text style={styles.appName}>HealthyEats</Text>
          <Text style={styles.tagline}>Your personal nutrition companion</Text>
        </View>

        {/* Main content */}
        <View style={styles.contentSection}>
          <View style={styles.illustrationContainer}>
            {/* Placeholder for food illustration */}
            <View style={styles.foodIllustration}>
              <Ionicons 
                name="nutrition-outline" 
                size={120} 
                color="rgba(255, 255, 255, 0.3)" 
              />
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.welcomeTitle}>Welcome!</Text>
            <Text style={styles.welcomeSubtitle}>
              Join thousands of users who have transformed their eating habits with our personalized meal plans.
            </Text>
          </View>
        </View>

        {/* Bottom section with auth buttons */}
        <View style={styles.bottomSection}>
          <CustomButton
            title="Create Account"
            onPress={handleSignUp}
            style={styles.signUpButton}
          />
          
          <CustomButton
            title="Sign In"
            onPress={handleSignIn}
            variant="secondary"
            style={styles.signInButton}
            textStyle={styles.signInButtonText}
          />
          
          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
  headerSection: {
    alignItems: 'center',
    paddingTop: spacing['2xl'],
    paddingHorizontal: spacing.xl,
  },
  
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  appName: {
    fontSize: typography['3xl'],
    fontWeight: typography.bold,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  
  tagline: {
    fontSize: typography.base,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  
  contentSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  
  illustrationContainer: {
    marginBottom: spacing.xl,
  },
  
  foodIllustration: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  textContainer: {
    alignItems: 'center',
  },
  
  welcomeTitle: {
    fontSize: typography['2xl'],
    fontWeight: typography.bold,
    color: colors.textLight,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  
  welcomeSubtitle: {
    fontSize: typography.base,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: typography.base * 1.5,
    maxWidth: 300,
  },
  
  bottomSection: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  
  signUpButton: {
    backgroundColor: colors.textLight,
    marginBottom: spacing.md,
  },
  
  signInButton: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    marginBottom: spacing.lg,
  },
  
  signInButtonText: {
    color: colors.textLight,
  },
  
  termsText: {
    fontSize: typography.xs,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: typography.xs * 1.4,
    paddingHorizontal: spacing.md,
  },
});

export default AuthSelectionScreen;

