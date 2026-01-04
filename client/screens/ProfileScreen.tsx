import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/globalStyles';
import { ProfileScreenProps } from '../types';

const { width } = Dimensions.get('window');

interface ProfileOption {
  id: string;
  title: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
}

/**
 * Customer Profile Screen
 * Displays user information, settings, and account management options
 */
const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, signOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            signOut();
            // Navigation will be handled by AppNavigator based on auth state
          },
        },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Coming Soon', 'Profile editing feature will be available soon!');
  };

  const handleOrderHistory = () => {
    Alert.alert('Coming Soon', 'Order history feature will be available soon!');
  };

  const handleWishlist = () => {
    Alert.alert('Coming Soon', 'Wishlist feature will be available soon!');
  };

  const handlePaymentMethods = () => {
    Alert.alert('Coming Soon', 'Payment methods feature will be available soon!');
  };

  const handleAddresses = () => {
    Alert.alert('Coming Soon', 'Address management feature will be available soon!');
  };

  const handleNotifications = () => {
    Alert.alert('Coming Soon', 'Notification settings feature will be available soon!');
  };

  const handleSupport = () => {
    Alert.alert('Coming Soon', 'Customer support feature will be available soon!');
  };

  const handlePrivacy = () => {
    Alert.alert('Coming Soon', 'Privacy settings feature will be available soon!');
  };

  const profileOptions: ProfileOption[] = [
    {
      id: 'orders',
      title: 'Order History',
      subtitle: 'View your past orders and track current ones',
      icon: 'receipt-outline',
      color: colors.buttonPrimary,
      onPress: handleOrderHistory,
    },
    {
      id: 'wishlist',
      title: 'Wishlist',
      subtitle: 'Items you want to buy later',
      icon: 'heart-outline',
      color: colors.error,
      onPress: handleWishlist,
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      subtitle: 'Manage your cards and payment options',
      icon: 'card-outline',
      color: colors.success,
      onPress: handlePaymentMethods,
    },
    {
      id: 'addresses',
      title: 'Delivery Addresses',
      subtitle: 'Manage your shipping addresses',
      icon: 'location-outline',
      color: colors.buttonAccent,
      onPress: handleAddresses,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Manage your notification preferences',
      icon: 'notifications-outline',
      color: colors.inputBorderFocus,
      onPress: handleNotifications,
    },
    {
      id: 'support',
      title: 'Customer Support',
      subtitle: 'Get help with your orders and account',
      icon: 'help-circle-outline',
      color: colors.warning,
      onPress: handleSupport,
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      subtitle: 'Manage your privacy settings',
      icon: 'shield-checkmark-outline',
      color: colors.textSecondary,
      onPress: handlePrivacy,
    },
  ];

  const renderProfileOption = (option: ProfileOption, index: number) => (
    <Animated.View
      key={option.id}
      style={[
        styles.optionContainer,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, index * 5],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.optionButton}
        onPress={option.onPress}
        activeOpacity={0.7}
      >
        <View style={[styles.optionIcon, { backgroundColor: `${option.color}15` }]}>
          <Ionicons name={option.icon} size={24} color={option.color} />
        </View>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>{option.title}</Text>
          {option.subtitle && (
            <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </Animated.View>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
      >
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.headerTitle}>Profile</Text>
        </Animated.View>

        {/* User Info Card */}
        <Animated.View
          style={[
            styles.userCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color={colors.textLight} />
              </View>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={16} color={colors.textLight} />
              </TouchableOpacity>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.name || 'Customer'}</Text>
              <Text style={styles.userEmail}>{user?.email || 'customer@imall.com'}</Text>
              <View style={styles.userTypeContainer}>
                <Ionicons name="person-outline" size={14} color={colors.success} />
                <Text style={styles.userType}>Customer</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={handleEditProfile}
            >
              <Ionicons name="create-outline" size={20} color={colors.buttonPrimary} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Stats Card */}
        <Animated.View
          style={[
            styles.statsCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </Animated.View>

        {/* Profile Options */}
        <View style={styles.optionsSection}>
          {profileOptions.map(renderProfileOption)}
        </View>

        {/* Sign Out Button */}
        <Animated.View
          style={[
            styles.signOutContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.error} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>iMall v1.0.0</Text>
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
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    fontSize: typography['3xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.lg,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.buttonPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.buttonAccent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.cardBackground,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: typography.base,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  userTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.success}15`,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  userType: {
    fontSize: typography.sm,
    color: colors.success,
    fontWeight: typography.medium,
    marginLeft: spacing.xs,
  },
  editProfileButton: {
    padding: spacing.sm,
  },
  statsCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    ...shadows.sm,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: typography['2xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    fontWeight: typography.medium,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.inputBorder,
  },
  optionsSection: {
    marginBottom: spacing.xl,
  },
  optionContainer: {
    marginBottom: spacing.sm,
  },
  optionButton: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.sm,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  optionSubtitle: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    lineHeight: typography.sm * 1.3,
  },
  signOutContainer: {
    marginBottom: spacing.lg,
  },
  signOutButton: {
    backgroundColor: `${colors.error}10`,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: `${colors.error}20`,
  },
  signOutText: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.error,
    marginLeft: spacing.sm,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  versionText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
});

export default ProfileScreen;
