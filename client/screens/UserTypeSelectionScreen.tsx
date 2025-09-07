import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../contexts/AuthContext';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/globalStyles';
import { UserTypeSelectionScreenProps, UserType } from '../types';

interface UserTypeOption {
  id: UserType;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

/**
 * User Type Selection Screen Component
 * Allows users to select their role/user type after authentication
 */
const UserTypeSelectionScreen: React.FC<UserTypeSelectionScreenProps> = ({ navigation }) => {
  const { setUserType, user } = useAuth();
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // User type options with icons and descriptions
  const userTypes: UserTypeOption[] = [
    {
      id: 'customer',
      title: 'Customer',
      description: 'Browse and purchase products from various vendors',
      icon: 'person-outline',
      color: '#4299E1',
    },
    {
      id: 'vendor',
      title: 'Vendor',
      description: 'Sell your products and manage your store',
      icon: 'storefront-outline',
      color: '#48BB78',
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manage the platform and oversee operations',
      icon: 'shield-checkmark-outline',
      color: '#ED8936',
    },
  ];

  /**
   * Handle user type selection
   * @param typeId - Selected user type ID
   */
  const handleTypeSelection = (typeId: UserType): void => {
    setSelectedType(typeId);
  };

  /**
   * Handle continue button press
   */
  const handleContinue = async (): Promise<void> => {
    if (!selectedType) {
      Alert.alert('Selection Required', 'Please select your user type to continue');
      return;
    }

    setLoading(true);
    try {
      setUserType(selectedType);
      
      // Show success message
      const selectedTypeData = userTypes.find(type => type.id === selectedType);
      Alert.alert(
        'Welcome!',
        `Great choice! Your ${selectedTypeData?.title.toLowerCase()} profile has been set up successfully. You can now start exploring the platform.`,
        [
          {
            text: 'Get Started',
            onPress: () => {
              // In a real app, this would navigate to the main app screens
              console.log('User onboarding completed:', {
                user: user?.name,
                email: user?.email,
                userType: selectedType,
              });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Render user type option
   * @param userType - User type data
   */
  const renderUserTypeOption = (userType: UserTypeOption): React.ReactElement => (
    <TouchableOpacity
      key={userType.id}
      style={[
        styles.typeOption,
        selectedType === userType.id && styles.typeOptionSelected,
      ]}
      onPress={() => handleTypeSelection(userType.id)}
      activeOpacity={0.8}
    >
      <View style={styles.typeOptionContent}>
        <View style={[styles.iconContainer, { backgroundColor: `${userType.color}20` }]}>
          <Ionicons 
            name={userType.icon} 
            size={32} 
            color={userType.color} 
          />
        </View>
        
        <View style={styles.typeTextContainer}>
          <Text style={styles.typeTitle}>{userType.title}</Text>
          <Text style={styles.typeDescription}>{userType.description}</Text>
        </View>
        
        <View style={styles.selectionIndicator}>
          {selectedType === userType.id ? (
            <Ionicons 
              name="checkmark-circle" 
              size={24} 
              color={colors.success} 
            />
          ) : (
            <View style={styles.unselectedIndicator} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Profile</Text>
          <Text style={styles.subtitle}>
            Help us personalize your experience by selecting the option that best describes you
          </Text>
        </View>

        {/* User type options */}
        <View style={styles.optionsContainer}>
          {userTypes.map(renderUserTypeOption)}
        </View>

        {/* Continue button */}
        <View style={styles.bottomSection}>
          <CustomButton
            title="Continue"
            onPress={handleContinue}
            loading={loading}
            disabled={!selectedType}
            style={[
              styles.continueButton,
              !selectedType && styles.disabledButton,
            ]}
          />
          
          <Text style={styles.noteText}>
            You can always change your profile type later in settings
          </Text>
        </View>
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
    paddingHorizontal: spacing.xl,
  },
  
  header: {
    paddingTop: spacing.xl,
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  
  title: {
    fontSize: typography['3xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: typography.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.base * 1.4,
    maxWidth: 300,
  },
  
  optionsContainer: {
    flex: 1,
    gap: spacing.md,
  },
  
  typeOption: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadows.sm,
  },
  
  typeOptionSelected: {
    borderColor: colors.success,
    backgroundColor: colors.background,
  },
  
  typeOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  
  typeTextContainer: {
    flex: 1,
  },
  
  typeTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  
  typeDescription: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    lineHeight: typography.sm * 1.4,
  },
  
  selectionIndicator: {
    marginLeft: spacing.sm,
  },
  
  unselectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.inputBorder,
  },
  
  bottomSection: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  
  continueButton: {
    marginBottom: spacing.md,
  },
  
  disabledButton: {
    opacity: 0.6,
  },
  
  noteText: {
    fontSize: typography.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.xs * 1.4,
  },
});

export default UserTypeSelectionScreen;

