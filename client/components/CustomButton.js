import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/globalStyles';

/**
 * Reusable Custom Button Component
 * Supports primary, secondary, and accent variants with loading states
 */
const CustomButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false, 
  loading = false,
  style,
  textStyle,
  ...props 
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return [
          styles.button,
          styles.secondaryButton,
          disabled && styles.disabledButton,
          style,
        ];
      case 'accent':
        return [
          styles.button,
          styles.accentButton,
          disabled && styles.disabledButton,
          style,
        ];
      default:
        return [
          styles.button,
          styles.primaryButton,
          disabled && styles.disabledButton,
          style,
        ];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return [
          styles.buttonText,
          styles.secondaryButtonText,
          disabled && styles.disabledButtonText,
          textStyle,
        ];
      case 'accent':
        return [
          styles.buttonText,
          styles.primaryButtonText,
          disabled && styles.disabledButtonText,
          textStyle,
        ];
      default:
        return [
          styles.buttonText,
          styles.primaryButtonText,
          disabled && styles.disabledButtonText,
          textStyle,
        ];
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'secondary' ? colors.textPrimary : colors.textLight} 
          size="small" 
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    ...shadows.sm,
  },
  
  primaryButton: {
    backgroundColor: colors.buttonPrimary,
  },
  
  secondaryButton: {
    backgroundColor: colors.buttonSecondary,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  
  accentButton: {
    backgroundColor: colors.buttonAccent,
  },
  
  disabledButton: {
    opacity: 0.6,
  },
  
  buttonText: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
  },
  
  primaryButtonText: {
    color: colors.textLight,
  },
  
  secondaryButtonText: {
    color: colors.textPrimary,
  },
  
  disabledButtonText: {
    opacity: 0.7,
  },
});

export default CustomButton;
