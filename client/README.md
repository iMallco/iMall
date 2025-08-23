# HealthyEats - React Native Onboarding App

A complete, modern React Native application featuring a comprehensive onboarding flow with authentication and user type selection. The app is designed with a clean, minimalist UI inspired by modern design principles.

## 🚀 Features

### Complete Onboarding Flow
- **Introduction/Walkthrough Screens**: Interactive slides explaining the app's purpose and features
- **Authentication Selection**: Clean interface for choosing between sign-up and sign-in
- **User Registration**: Form validation with real-time error feedback
- **User Authentication**: Secure sign-in with forgot password functionality
- **User Type Selection**: Personalized experience based on user role

### Modern UI/UX Design
- Clean, minimalist design with rounded corners
- Soft color palette with excellent contrast
- Smooth animations and transitions
- Responsive layout for different screen sizes
- Accessibility-focused components

### Technical Features
- **React Navigation**: Smooth navigation between screens
- **Context API**: State management for authentication
- **Form Validation**: Real-time input validation
- **Custom Components**: Reusable UI components
- **TypeScript Ready**: Well-structured codebase

## 📱 Screen Flow

1. **Introduction Screens** → Explains app features with beautiful slides
2. **Auth Selection** → Choose between Sign Up or Sign In
3. **Sign Up/Sign In** → User authentication with validation
4. **User Type Selection** → Choose from 6 different user types:
   - Student
   - Professional
   - Educator
   - Parent
   - Athlete
   - Senior

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on iOS:**
   ```bash
   npm run ios
   ```

4. **Run on Android:**
   ```bash
   npm run android
   ```

5. **Run on Web:**
   ```bash
   npm run web
   ```

## 📁 Project Structure

```
client/
├── components/           # Reusable UI components
│   ├── CustomButton.js   # Customizable button component
│   └── CustomInput.js    # Input component with validation
├── contexts/             # React Context providers
│   └── AuthContext.js    # Authentication state management
├── navigation/           # Navigation configuration
│   └── AppNavigator.js   # Main navigation setup
├── screens/              # App screens
│   ├── IntroductionScreen.js
│   ├── AuthSelectionScreen.js
│   ├── SignUpScreen.js
│   ├── SignInScreen.js
│   └── UserTypeSelectionScreen.js
├── styles/               # Global styles and theme
│   └── globalStyles.js   # Colors, typography, spacing
├── App.js               # Main app component
└── package.json         # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: `#2D3748` (Dark blue-gray)
- **Secondary**: `#4A5568` (Medium gray)
- **Accent**: `#FF6B35` (Orange)
- **Background**: `#FFFFFF` (Pure white)
- **Success**: `#48BB78` (Green)
- **Error**: `#F56565` (Red)

### Typography
- **Font Sizes**: 12px to 48px scale
- **Font Weights**: Light (300) to Bold (700)
- **Line Heights**: Optimized for readability

### Spacing
- **System**: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- **Consistent**: Applied throughout the app

## 🔧 Components

### CustomButton
Flexible button component with multiple variants:
- **Primary**: Dark background, white text
- **Secondary**: Light background with border
- **Accent**: Orange background
- **Loading State**: Built-in activity indicator

### CustomInput
Feature-rich input component:
- **Validation**: Real-time error display
- **Password Toggle**: Show/hide password
- **Focus States**: Visual feedback
- **Accessibility**: Screen reader support

## 🔐 Authentication Flow

### Sign Up
- Name validation (minimum 2 characters)
- Email validation (proper format)
- Password validation (minimum 6 characters)
- Confirm password matching
- Real-time error feedback

### Sign In
- Email and password validation
- Forgot password functionality
- Error handling for invalid credentials

### State Management
- Context API for global auth state
- Persistent user session
- Automatic navigation based on auth status

## 🎯 User Types

The app supports 6 different user types, each with personalized features:

1. **Student**: Budget-friendly meals and quick recipes
2. **Professional**: Balanced nutrition with meal prep focus
3. **Educator**: Nutritious meals for teaching activities
4. **Parent**: Family-friendly recipes
5. **Athlete**: Performance-focused nutrition
6. **Senior**: Age-appropriate, easy-to-prepare meals

## 🚀 Next Steps

To extend this application, consider adding:

- **Main App Screens**: Dashboard, meal planning, recipes
- **User Profile**: Settings and preferences
- **Meal Planning**: Calendar and scheduling
- **Recipe Database**: Searchable recipe collection
- **Shopping Lists**: Automated grocery lists
- **Nutrition Tracking**: Calorie and macro tracking
- **Social Features**: Recipe sharing and community
- **Offline Support**: Local data storage
- **Push Notifications**: Meal reminders
- **Dark Mode**: Theme switching

## 📚 Dependencies

### Core Dependencies
- `react-native`: Core React Native framework
- `@react-navigation/native`: Navigation library
- `@react-navigation/stack`: Stack navigation
- `expo`: Expo SDK for development
- `expo-linear-gradient`: Gradient backgrounds
- `@expo/vector-icons`: Icon library

### Development Dependencies
- `@babel/core`: JavaScript compiler
- `babel-preset-expo`: Expo Babel preset

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from modern mobile app patterns
- React Navigation team for excellent navigation library
- Expo team for streamlined React Native development
- Icons provided by Expo Vector Icons (Ionicons)

---

**Built with ❤️ using React Native and Expo**
