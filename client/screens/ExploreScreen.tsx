import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/globalStyles';
import { ExploreScreenProps } from '../types';

const { width } = Dimensions.get('window');

interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  itemCount: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  vendor: string;
  isOnSale?: boolean;
  isFavorite?: boolean;
}

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  color: string;
}

/**
 * Customer Explore Screen
 * Browse products, categories, and discover new items
 */
const ExploreScreen: React.FC<ExploreScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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

  // Mock data
  const banners: Banner[] = [
    {
      id: '1',
      title: 'Summer Sale',
      subtitle: 'Up to 50% off on selected items',
      image: 'https://via.placeholder.com/300x150/FF6B35/FFFFFF?text=Summer+Sale',
      color: colors.buttonAccent,
    },
    {
      id: '2',
      title: 'New Arrivals',
      subtitle: 'Fresh products just for you',
      image: 'https://via.placeholder.com/300x150/48BB78/FFFFFF?text=New+Arrivals',
      color: colors.success,
    },
  ];

  const categories: Category[] = [
    { id: 'electronics', name: 'Electronics', icon: 'phone-portrait-outline', color: colors.inputBorderFocus, itemCount: 1234 },
    { id: 'fashion', name: 'Fashion', icon: 'shirt-outline', color: colors.buttonAccent, itemCount: 856 },
    { id: 'home', name: 'Home & Garden', icon: 'home-outline', color: colors.success, itemCount: 642 },
    { id: 'beauty', name: 'Beauty', icon: 'flower-outline', color: colors.error, itemCount: 423 },
    { id: 'sports', name: 'Sports', icon: 'fitness-outline', color: colors.warning, itemCount: 789 },
    { id: 'books', name: 'Books', icon: 'book-outline', color: colors.textSecondary, itemCount: 567 },
    { id: 'food', name: 'Food & Drinks', icon: 'restaurant-outline', color: colors.buttonPrimary, itemCount: 345 },
    { id: 'toys', name: 'Toys & Games', icon: 'game-controller-outline', color: colors.inputBorderFocus, itemCount: 234 },
  ];

  const featuredProducts: Product[] = [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://via.placeholder.com/150x150/2D3748/FFFFFF?text=Headphones',
      rating: 4.5,
      reviews: 128,
      vendor: 'TechStore',
      isOnSale: true,
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://via.placeholder.com/150x150/4299E1/FFFFFF?text=Watch',
      rating: 4.8,
      reviews: 89,
      vendor: 'GadgetHub',
      isFavorite: true,
    },
    {
      id: '3',
      name: 'Bluetooth Speaker',
      price: 49.99,
      originalPrice: 79.99,
      image: 'https://via.placeholder.com/150x150/48BB78/FFFFFF?text=Speaker',
      rating: 4.3,
      reviews: 156,
      vendor: 'AudioWorld',
      isOnSale: true,
      isFavorite: false,
    },
    {
      id: '4',
      name: 'Laptop Stand',
      price: 29.99,
      image: 'https://via.placeholder.com/150x150/ED8936/FFFFFF?text=Stand',
      rating: 4.6,
      reviews: 67,
      vendor: 'OfficeSupply',
      isFavorite: false,
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
  };

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    // Navigate to category screen or filter products
  };

  const handleProductPress = (product: Product) => {
    // Navigate to product detail screen
    console.log('Product pressed:', product.name);
  };

  const toggleFavorite = (productId: string) => {
    // Toggle favorite status
    console.log('Toggle favorite for product:', productId);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderBanner = ({ item }: { item: Banner }) => (
    <TouchableOpacity style={styles.bannerContainer} activeOpacity={0.8}>
      <View style={[styles.banner, { backgroundColor: item.color }]}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>{item.title}</Text>
          <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
        </View>
        <View style={styles.bannerImageContainer}>
          <Ionicons name="gift-outline" size={40} color={colors.textLight} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.categoryItemSelected,
      ]}
      onPress={() => handleCategoryPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={[styles.categoryIcon, { backgroundColor: `${item.color}15` }]}>
        <Ionicons name={item.icon} size={24} color={item.color} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryCount}>{item.itemCount} items</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.productImageContainer}>
        <View style={styles.productImagePlaceholder}>
          <Ionicons name="image-outline" size={30} color={colors.textSecondary} />
        </View>
        {item.isOnSale && (
          <View style={styles.saleTag}>
            <Text style={styles.saleText}>SALE</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons
            name={item.isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={item.isFavorite ? colors.error : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productVendor}>{item.vendor}</Text>
        <View style={styles.productRating}>
          <Ionicons name="star" size={14} color={colors.warning} />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>
        <View style={styles.productPricing}>
          <Text style={styles.productPrice}>${item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>${item.originalPrice}</Text>
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
          <Text style={styles.headerTitle}>Explore</Text>
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="bag-outline" size={24} color={colors.textPrimary} />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View
          style={[
            styles.searchContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor={colors.textSecondary}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Banners */}
        <Animated.View
          style={[
            styles.bannersSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <FlatList
            data={banners}
            renderItem={renderBanner}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bannersList}
          />
        </Animated.View>

        {/* Categories */}
        <Animated.View
          style={[
            styles.categoriesSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </Animated.View>

        {/* Featured Products */}
        <Animated.View
          style={[
            styles.productsSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            scrollEnabled={false}
          />
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
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    fontSize: typography['3xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  cartButton: {
    position: 'relative',
    padding: spacing.sm,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    fontSize: typography.xs,
    color: colors.textLight,
    fontWeight: typography.bold,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.base,
    color: colors.textPrimary,
    paddingVertical: Platform.OS === 'ios' ? spacing.sm : 0,
  },
  filterButton: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannersSection: {
    marginBottom: spacing.lg,
  },
  bannersList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  bannerContainer: {
    width: width * 0.8,
  },
  banner: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.md,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  bannerSubtitle: {
    fontSize: typography.base,
    color: colors.textLight,
    opacity: 0.9,
  },
  bannerImageContainer: {
    marginLeft: spacing.md,
  },
  categoriesSection: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: typography.base,
    color: colors.buttonPrimary,
    fontWeight: typography.medium,
  },
  categoriesList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  categoryItem: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    minWidth: 100,
    ...shadows.sm,
  },
  categoryItemSelected: {
    backgroundColor: colors.buttonPrimary,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryName: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  categoryCount: {
    fontSize: typography.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  productsSection: {
    paddingHorizontal: spacing.lg,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  productCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    ...shadows.sm,
  },
  productImageContainer: {
    position: 'relative',
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  productImagePlaceholder: {
    height: 120,
    backgroundColor: colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saleTag: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.error,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  saleText: {
    fontSize: typography.xs,
    color: colors.textLight,
    fontWeight: typography.bold,
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.textLight,
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  productInfo: {
    padding: spacing.md,
  },
  productName: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    lineHeight: typography.base * 1.2,
  },
  productVendor: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  ratingText: {
    fontSize: typography.sm,
    color: colors.textPrimary,
    fontWeight: typography.medium,
  },
  reviewsText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  productPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  productPrice: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  originalPrice: {
    fontSize: typography.base,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
});

export default ExploreScreen;
