import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows, Dimensions as DimensionsType } from '../types';

const { width, height } = Dimensions.get('window');

/**
 * Global styles and theme configuration
 * Based on the modern, clean design shown in the reference screenshot
 */
export const colors: Colors = {
  // Primary colors from the reference design
  primary: '#2D3748',      // Dark blue-gray for text
  secondary: '#4A5568',    // Medium gray for secondary text
  accent: '#FF6B35',       // Orange accent color
  
  // Background colors
  background: '#FFFFFF',   // Pure white background
  cardBackground: '#F7FAFC', // Light gray for cards
  overlay: 'rgba(0, 0, 0, 0.6)', // Dark overlay
  
  // Text colors
  textPrimary: '#2D3748',
  textSecondary: '#718096',
  textLight: '#FFFFFF',
  
  // Input colors
  inputBackground: '#F7FAFC',
  inputBorder: '#E2E8F0',
  inputBorderFocus: '#4299E1',
  
  // Button colors
  buttonPrimary: '#2D3748',
  buttonSecondary: '#F7FAFC',
  buttonAccent: '#FF6B35',
  
  // Status colors
  success: '#48BB78',
  error: '#F56565',
  warning: '#ED8936',
};

export const typography: Typography = {
  // Font sizes
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  
  // Font weights
  light: '300' as const,
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const spacing: Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const borderRadius: BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const shadows: Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Common layout styles
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
  },
  
  // Typography styles
  title: {
    fontSize: typography['4xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: typography['4xl'] * 1.2,
  },
  
  subtitle: {
    fontSize: typography.lg,
    fontWeight: typography.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: typography.lg * 1.4,
  },
  
  body: {
    fontSize: typography.base,
    color: colors.textSecondary,
    lineHeight: typography.base * 1.5,
    textAlign: 'center',
  },
  
  // Button styles
  primaryButton: {
    backgroundColor: colors.buttonPrimary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    ...shadows.sm,
  },
  
  primaryButtonText: {
    color: colors.textLight,
    fontSize: typography.lg,
    fontWeight: typography.semibold,
  },
  
  secondaryButton: {
    backgroundColor: colors.buttonSecondary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  
  secondaryButtonText: {
    color: colors.textPrimary,
    fontSize: typography.lg,
    fontWeight: typography.semibold,
  },
  
  // Input styles
  input: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.base,
    color: colors.textPrimary,
    minHeight: 52,
  },
  
  inputFocused: {
    borderColor: colors.inputBorderFocus,
    backgroundColor: colors.background,
  },
  
  // Card styles
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
  
  // Utility styles
  spacingBottom: {
    marginBottom: spacing.lg,
  },
  
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Screen dimensions
export const dimensions: DimensionsType = {
  width,
  height,
  isSmallScreen: width < 375,
  isLargeScreen: width > 414,
};
