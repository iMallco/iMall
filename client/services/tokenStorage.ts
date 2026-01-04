/**
 * Secure Token Storage
 * Uses expo-secure-store for native platforms, AsyncStorage fallback for web
 */

import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'imall_auth_token';
const USER_KEY = 'imall_user_data';

// Check if SecureStore is available (not on web)
const isSecureStoreAvailable = Platform.OS !== 'web';

/**
 * Store the authentication token securely
 */
export async function saveToken(token: string): Promise<void> {
    try {
        if (isSecureStoreAvailable) {
            await SecureStore.setItemAsync(TOKEN_KEY, token);
        } else {
            // Web fallback - less secure, consider alternatives for production
            localStorage.setItem(TOKEN_KEY, token);
        }
    } catch (error) {
        console.error('Error saving token:', error);
        throw error;
    }
}

/**
 * Retrieve the stored authentication token
 */
export async function getToken(): Promise<string | null> {
    try {
        if (isSecureStoreAvailable) {
            return await SecureStore.getItemAsync(TOKEN_KEY);
        } else {
            return localStorage.getItem(TOKEN_KEY);
        }
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
}

/**
 * Remove the stored authentication token (logout)
 */
export async function removeToken(): Promise<void> {
    try {
        if (isSecureStoreAvailable) {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
        } else {
            localStorage.removeItem(TOKEN_KEY);
        }
    } catch (error) {
        console.error('Error removing token:', error);
    }
}

/**
 * Store user data
 */
export async function saveUserData(user: object): Promise<void> {
    try {
        const userData = JSON.stringify(user);
        if (isSecureStoreAvailable) {
            await SecureStore.setItemAsync(USER_KEY, userData);
        } else {
            localStorage.setItem(USER_KEY, userData);
        }
    } catch (error) {
        console.error('Error saving user data:', error);
    }
}

/**
 * Retrieve stored user data
 */
export async function getUserData<T>(): Promise<T | null> {
    try {
        let userData: string | null;
        if (isSecureStoreAvailable) {
            userData = await SecureStore.getItemAsync(USER_KEY);
        } else {
            userData = localStorage.getItem(USER_KEY);
        }
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
}

/**
 * Clear all stored auth data (full logout)
 */
export async function clearAuthData(): Promise<void> {
    await removeToken();
    try {
        if (isSecureStoreAvailable) {
            await SecureStore.deleteItemAsync(USER_KEY);
        } else {
            localStorage.removeItem(USER_KEY);
        }
    } catch (error) {
        console.error('Error clearing auth data:', error);
    }
}
