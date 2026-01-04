import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { colors, typography, spacing } from '../styles/globalStyles';

// Import customer screens
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Placeholder screens for future implementation
import { View, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

// Placeholder components for future screens
const HomeScreen = () => (
  <View style={styles.placeholderContainer}>
    <Ionicons name="home-outline" size={48} color={colors.textSecondary} />
    <Text style={styles.placeholderText}>Home Screen</Text>
    <Text style={styles.placeholderSubtext}>Coming Soon</Text>
  </View>
);

const CategoriesScreen = () => (
  <View style={styles.placeholderContainer}>
    <Ionicons name="grid-outline" size={48} color={colors.textSecondary} />
    <Text style={styles.placeholderText}>Categories</Text>
    <Text style={styles.placeholderSubtext}>Coming Soon</Text>
  </View>
);

const CartScreen = () => (
  <View style={styles.placeholderContainer}>
    <Ionicons name="bag-outline" size={48} color={colors.textSecondary} />
    <Text style={styles.placeholderText}>Shopping Cart</Text>
    <Text style={styles.placeholderSubtext}>Coming Soon</Text>
  </View>
);

/**
 * Customer Tab Navigator
 * Bottom tab navigation for customer-specific screens
 */
const CustomerTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Explore':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Categories':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Cart':
              iconName = focused ? 'bag' : 'bag-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.buttonPrimary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopWidth: 1,
          borderTopColor: colors.inputBorder,
          paddingTop: spacing.xs,
          paddingBottom: Platform.OS === 'ios' ? spacing.lg : spacing.sm,
          height: Platform.OS === 'ios' ? 85 : 65,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: -2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            android: {
              elevation: 8,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: typography.xs,
          fontWeight: typography.medium,
          marginTop: spacing.xs,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarLabel: 'Categories',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarBadge: 3, // Example cart item count
          tabBarBadgeStyle: {
            backgroundColor: colors.error,
            color: colors.textLight,
            fontSize: typography.xs,
            fontWeight: typography.bold,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
  },
  placeholderText: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  placeholderSubtext: {
    fontSize: typography.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default CustomerTabNavigator;
