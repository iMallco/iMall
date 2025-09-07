import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Navigation Types
export type RootStackParamList = {
  Introduction: undefined;
  AuthSelection: undefined;
  SignUp: undefined;
  SignIn: undefined;
  UserTypeSelection: undefined;
  MainApp: undefined;
};

export type NavigationProp<T extends keyof RootStackParamList> = StackNavigationProp<
  RootStackParamList,
  T
>;

export type RoutePropType<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

// Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType | null;
}

export type UserType = 'customer' | 'vendor' | 'admin';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  signUp: (userData: SignUpData) => Promise<AuthResult>;
  signIn: (credentials: SignInData) => Promise<AuthResult>;
  signOut: () => void;
  setUserType: (userType: UserType) => void;
  resetPassword: (email: string) => Promise<AuthResult>;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
}

// Component Props Types
export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  textStyle?: any;
  [key: string]: any;
}

export interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: 
    | 'additional-name'
    | 'address-line1'
    | 'address-line2'
    | 'birthdate-day'
    | 'birthdate-full'
    | 'birthdate-month'
    | 'birthdate-year'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-day'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-middle-name'
    | 'cc-family-name'
    | 'cc-type'
    | 'country'
    | 'current-password'
    | 'email'
    | 'family-name'
    | 'given-name'
    | 'honorific-prefix'
    | 'honorific-suffix'
    | 'name'
    | 'new-password'
    | 'off'
    | 'organization'
    | 'organization-title'
    | 'postal-code'
    | 'street-address'
    | 'tel'
    | 'username';
  error?: string;
  label?: string;
  style?: any;
  inputStyle?: any;
  [key: string]: any;
}

// Screen Props Types
export interface IntroductionScreenProps {
  navigation: NavigationProp<'Introduction'>;
}

export interface AuthSelectionScreenProps {
  navigation: NavigationProp<'AuthSelection'>;
}

export interface SignUpScreenProps {
  navigation: NavigationProp<'SignUp'>;
}

export interface SignInScreenProps {
  navigation: NavigationProp<'SignIn'>;
}

export interface UserTypeSelectionScreenProps {
  navigation: NavigationProp<'UserTypeSelection'>;
}

// Onboarding Slide Type
export interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  backgroundColor: string[];
}

// Style Types
export interface Colors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  cardBackground: string;
  overlay: string;
  textPrimary: string;
  textSecondary: string;
  textLight: string;
  inputBackground: string;
  inputBorder: string;
  inputBorderFocus: string;
  buttonPrimary: string;
  buttonSecondary: string;
  buttonAccent: string;
  success: string;
  error: string;
  warning: string;
}

export interface Typography {
  xs: number;
  sm: number;
  base: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
  '5xl': number;
  light: '300';
  normal: '400';
  medium: '500';
  semibold: '600';
  bold: '700';
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
}

export interface BorderRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface Shadow {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface Shadows {
  sm: Shadow;
  md: Shadow;
  lg: Shadow;
}

export interface Dimensions {
  width: number;
  height: number;
  isSmallScreen: boolean;
  isLargeScreen: boolean;
}
