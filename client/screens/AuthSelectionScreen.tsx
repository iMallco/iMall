import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/globalStyles';
import { AuthSelectionScreenProps } from '../types';
import { useScreenReplacement } from '../hooks/useScreenReplacement';

const { width, height } = Dimensions.get('window');

/**
 * Authentication Selection Screen - Completely Redesigned
 * Modern, clean design with card-based layout and animations
 */
const AuthSelectionScreen: React.FC<AuthSelectionScreenProps> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const { replaceScreen } = useScreenReplacement();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSignUp = (): void => {
    // Replace current screen to prevent going back to auth selection
    replaceScreen('SignUp');
  };

  const handleSignIn = (): void => {
    // Replace current screen to prevent going back to auth selection
    replaceScreen('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <Animated.View 
          style={[
            styles.headerSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Ionicons name="storefront" size={40} color={colors.buttonPrimary} />
            </View>
            <Text style={styles.appName}>iMall</Text>
            <Text style={styles.tagline}>Your Digital Marketplace</Text>
          </View>
        </Animated.View>

        {/* Main Content Card */}
        <Animated.View 
          style={[
            styles.mainCard,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.iconGrid}>
              <View style={styles.iconItem}>
                <Ionicons name="bag-handle" size={24} color={colors.success} />
              </View>
              <View style={styles.iconItem}>
                <Ionicons name="card" size={24} color={colors.buttonAccent} />
              </View>
              <View style={styles.iconItem}>
                <Ionicons name="people" size={24} color={colors.inputBorderFocus} />
              </View>
              <View style={styles.iconItem}>
                <Ionicons name="star" size={24} color={colors.warning} />
              </View>
            </View>
            
            <Text style={styles.welcomeTitle}>Welcome to iMall</Text>
            <Text style={styles.welcomeSubtitle}>
              Join thousands of buyers and sellers in our thriving marketplace. 
              Discover unique products, connect with vendors, and grow your business.
            </Text>
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="shield-checkmark" size={20} color={colors.success} />
              </View>
              <Text style={styles.featureText}>Secure Transactions</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="flash" size={20} color={colors.buttonAccent} />
              </View>
              <Text style={styles.featureText}>Fast Delivery</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name="headset" size={20} color={colors.inputBorderFocus} />
              </View>
              <Text style={styles.featureText}>24/7 Support</Text>
            </View>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View 
          style={[
            styles.actionSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <CustomButton
            title={Platform.OS === 'ios' ? 'Sign Up' : 'Create Account'}
            onPress={handleSignUp}
            style={styles.primaryButton}
            textStyle={styles.primaryButtonText}
          />
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <Animated.View 
          style={[
            styles.footer,
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
  },
  
  headerSection: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  
  logoSection: {
    alignItems: 'center',
  },
  
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  
  appName: {
    fontSize: typography['4xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  
  tagline: {
    fontSize: typography.base,
    color: colors.textSecondary,
    fontWeight: typography.medium,
  },
  
  mainCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginVertical: spacing.lg,
    ...shadows.lg,
  },
  
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  
  iconGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  
  iconItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  
  welcomeTitle: {
    fontSize: typography['3xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  
  welcomeSubtitle: {
    fontSize: typography.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.base * 1.6,
    maxWidth: width * 0.8,
  },
  
  featuresSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.inputBorder,
  },
  
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  
  featureText: {
    fontSize: typography.xs,
    color: colors.textSecondary,
    fontWeight: typography.medium,
    textAlign: 'center',
  },
  
  actionSection: {
    paddingVertical: spacing.lg,
  },
  
  primaryButton: {
    backgroundColor: colors.buttonPrimary,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  
  primaryButtonText: {
    color: colors.textLight,
    fontSize: typography.lg,
    fontWeight: typography.bold,
  },
  
  secondaryButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  
  secondaryButtonText: {
    fontSize: typography.base,
    color: colors.textSecondary,
    fontWeight: typography.medium,
  },
  
  footer: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  
  termsText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.sm * 1.4,
  },
  
  linkText: {
    color: colors.buttonPrimary,
    fontWeight: typography.semibold,
  },
});

export default AuthSelectionScreen;