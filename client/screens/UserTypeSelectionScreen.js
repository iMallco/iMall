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

/**
 * User Type Selection Screen Component
 * Allows users to select their role/user type after authentication
 */
const UserTypeSelectionScreen = ({ navigation }) => {
  const { setUserType, user } = useAuth();
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(false);

  // User type options with icons and descriptions
  const userTypes = [
    {
      id: 'student',
      title: 'Student',
      description: 'Budget-friendly meals and quick recipes for busy student life',
      icon: 'school-outline',
      color: '#4299E1',
    },
    {
      id: 'professional',
      title: 'Professional',
      description: 'Balanced nutrition for working professionals with meal prep focus',
      icon: 'briefcase-outline',
      color: '#48BB78',
    },
    {
      id: 'educator',
      title: 'Educator',
      description: 'Nutritious meals that fuel teaching and learning activities',
      icon: 'library-outline',
      color: '#ED8936',
    },
    {
      id: 'parent',
      title: 'Parent',
      description: 'Family-friendly recipes and nutrition for the whole household',
      icon: 'people-outline',
      color: '#9F7AEA',
    },
    {
      id: 'athlete',
      title: 'Athlete',
      description: 'Performance-focused nutrition and meal timing strategies',
      icon: 'fitness-outline',
      color: '#F56565',
    },
    {
      id: 'senior',
      title: 'Senior',
      description: 'Age-appropriate nutrition with easy-to-prepare healthy meals',
      icon: 'heart-outline',
      color: '#38B2AC',
    },
  ];

  /**
   * Handle user type selection
   * @param {string} typeId - Selected user type ID
   */
  const handleTypeSelection = (typeId) => {
    setSelectedType(typeId);
  };

  /**
   * Handle continue button press
   */
  const handleContinue = async () => {
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
        `Great choice! Your ${selectedTypeData.title.toLowerCase()} profile has been set up successfully. You can now start exploring personalized meal plans.`,
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
   * @param {Object} userType - User type data
   */
  const renderUserTypeOption = (userType) => (
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
