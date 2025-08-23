import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { colors, typography, spacing, borderRadius, globalStyles } from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');

/**
 * Introduction/Walkthrough Screen Component
 * Displays a series of onboarding slides explaining the app's features
 */
const IntroductionScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);

  // Hide status bar on all slides for full screen effect
  useEffect(() => {
    StatusBar.setHidden(true, 'fade');
    
    // Cleanup - restore status bar when component unmounts
    return () => {
      StatusBar.setHidden(false, 'fade');
    };
  }, []);

  // Onboarding slides data
  const slides = [
    {
      id: 1,
      title: 'Cook healthy.\nEat healthy.',
      subtitle: 'A complete meal plan\nthat meets your nutrition goals',
      icon: 'restaurant-outline',
      backgroundColor: ['#2D3748', '#4A5568'],
    },
    {
      id: 2,
      title: 'Smart Meal\nPlanning',
      subtitle: 'AI-powered recommendations\nbased on your preferences',
      icon: 'bulb-outline',
      backgroundColor: ['#4A5568', '#2D3748'],
    },
    {
      id: 3,
      title: 'Track Your\nProgress',
      subtitle: 'Monitor your nutrition goals\nand celebrate achievements',
      icon: 'trending-up-outline',
      backgroundColor: ['#2D3748', '#1A202C'],
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      scrollViewRef.current?.scrollTo({
        x: nextSlide * width,
        animated: true,
      });
    } else {
      // Navigate to sign-up/sign-in selection screen
      navigation.navigate('AuthSelection');
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      const prevSlide = currentSlide - 1;
      setCurrentSlide(prevSlide);
      scrollViewRef.current?.scrollTo({
        x: prevSlide * width,
        animated: true,
      });
    }
  };

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const renderSlide = (slide, index) => (
    <View key={slide.id} style={styles.slide}>
      {index === 0 ? (
        // First slide with food background image - matches reference screenshot
        <View style={styles.backgroundImageContainer}>
          <Image
            source={require('../assets/food-skewers.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          {/* Dark overlay for better text readability */}
          <View style={styles.overlay} />
          
          {/* Content positioned like in reference */}
          <View style={styles.referenceContentContainer}>
            {/* Black gradient behind text */}
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.95)']}
              style={styles.textGradientOverlay}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              locations={[0, 0.4, 1]}
            />
            <View style={styles.textContent}>
              <Text style={styles.referenceTitle}>Cook healthy.{'\n'}Eat healthy.</Text>
              <Text style={styles.referenceSubtitle}>A complete meal plan{'\n'}that meets your nutrition goals</Text>
            </View>
          </View>
        </View>
      ) : (
        // Other slides with background images
        <View style={styles.backgroundImageContainer}>
          <Image
            source={
              index === 1 
                ? require('../assets/jollof.png')
                : require('../assets/puff-puff.jpg')
            }
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          {/* Dark overlay for better text readability */}
          <View style={styles.overlay} />
          
          {/* Content positioned like in reference */}
          <View style={styles.referenceContentContainer}>
            {/* Black gradient behind text */}
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.95)']}
              style={styles.textGradientOverlay}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              locations={[0, 0.4, 1]}
            />
            <View style={styles.textContent}>
              <Text style={styles.referenceTitle}>{slide.title}</Text>
              <Text style={styles.referenceSubtitle}>{slide.subtitle}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  const renderPaginationDots = () => (
    <View style={styles.paginationContainer}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            currentSlide === index && styles.paginationDotActive,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => renderSlide(slide, index))}
      </ScrollView>

      {/* Pagination dots overlay for all screens except first */}
      {currentSlide > 0 && (
        <View style={styles.paginationOverlay}>
          {renderPaginationDots()}
        </View>
      )}
      
      {/* Get Started button overlay only on final slide */}
      {currentSlide === slides.length - 1 && (
        <View style={styles.buttonOverlay}>
          <TouchableOpacity 
            style={styles.referenceButton} 
            onPress={handleNext}
            activeOpacity={0.9}
          >
            <Text style={styles.referenceButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      )}
    </View>
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
  
  slide: {
    width,
    height: height, // Full screen height for first slide to match reference
  },
  
  slideGradient: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: spacing['2xl'],
  },
  
  backgroundImageContainer: {
    flex: 1,
    position: 'relative',
  },
  
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing['2xl'],
  },
  
  foodImagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  contentContainer: {
    position: 'absolute',
    bottom: spacing['3xl'],
    left: 0,
    right: 0,
    paddingHorizontal: spacing.xl,
    zIndex: 2,
  },
  
  // Reference screenshot specific styles
  referenceContentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 350 : 370,
    zIndex: 2,
  },
  
  textGradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  
  textContent: {
    paddingHorizontal: 32,
    zIndex: 2,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 60 : 80,
    left: 0,
    right: 0,
  },
  
  referenceTitle: {
    fontSize: 48,
    fontWeight: '300', // Light weight for elegant look
    color: colors.textLight,
    textAlign: 'left',
    marginBottom: 16,
    lineHeight: 52,
    fontStyle: 'italic', // Cursive/script style like in reference
  },
  
  referenceSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'left',
    lineHeight: 22,
    marginBottom: 40,
  },
  
  referenceButton: {
    backgroundColor: colors.textLight,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  
  referenceButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  
  slideTitle: {
    fontSize: typography['4xl'],
    fontWeight: typography.bold,
    color: colors.textLight,
    textAlign: 'left',
    marginBottom: spacing.md,
    lineHeight: typography['4xl'] * 1.2,
  },
  
  slideSubtitle: {
    fontSize: typography.lg,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'left',
    lineHeight: typography.lg * 1.4,
  },
  
  bottomSection: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  
  paginationOverlay: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 120 : 140,
    left: 0,
    right: 0,
    zIndex: 3,
  },
  
  buttonOverlay: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 60 : 80,
    left: 32,
    right: 32,
    zIndex: 3,
  },
  
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.inputBorder,
    marginHorizontal: 4,
  },
  
  paginationDotActive: {
    backgroundColor: colors.textPrimary,
    width: 24,
  },
  
  buttonContainer: {
    gap: spacing.md,
  },
  
  nextButton: {
    marginBottom: spacing.sm,
  },
  
  prevButton: {
    marginBottom: spacing.sm,
  },
});

export default IntroductionScreen;
