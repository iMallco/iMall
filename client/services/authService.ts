/**
 * Authentication Service
 * Handles all auth-related API calls
 */

import { api, ApiResponse } from './api';
import { saveToken, removeToken, saveUserData, clearAuthData, getToken } from './tokenStorage';

// Types matching server responses
interface UserResponse {
    id: string;
    name: string;
    email: string;
    userType: 'customer' | 'vendor' | 'admin' | null;
}

interface AuthResponse {
    success: boolean;
    user?: UserResponse;
    token?: string;
    error?: string;
    message?: string;
}

export interface SignUpData {
    name: string;
    email: string;
    password: string;
}

export interface SignInData {
    email: string;
    password: string;
}

/**
 * Sign up a new user
 */
export async function signUp(data: SignUpData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signup', data);

    if (response.success && response.token && response.user) {
        // Store token and user data
        await saveToken(response.token);
        await saveUserData(response.user);
        api.setAuthToken(response.token);
    }

    return response as AuthResponse;
}

/**
 * Sign in existing user
 */
export async function signIn(data: SignInData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signin', data);

    if (response.success && response.token && response.user) {
        // Store token and user data
        await saveToken(response.token);
        await saveUserData(response.user);
        api.setAuthToken(response.token);
    }

    return response as AuthResponse;
}

/**
 * Sign out user
 */
export async function signOut(): Promise<void> {
    try {
        // Call logout endpoint (optional, clears server-side session if any)
        await api.post('/auth/logout');
    } catch {
        // Ignore errors - we're logging out anyway
    } finally {
        // Clear local storage and token
        await clearAuthData();
        api.setAuthToken(null);
    }
}

/**
 * Get current user from server
 */
export async function getCurrentUser(): Promise<UserResponse | null> {
    const response = await api.get<{ user: UserResponse }>('/auth/me');

    if (response.success && response.data?.user) {
        await saveUserData(response.data.user);
        return response.data.user;
    }

    return null;
}

/**
 * Set user type
 */
export async function setUserType(
    userId: string,
    userType: 'customer' | 'vendor'
): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/set-user-type', {
        userId,
        userType,
    });

    if (response.success && response.user) {
        await saveUserData(response.user);
    }

    return response as AuthResponse;
}

/**
 * Request password reset
 */
export async function resetPassword(email: string): Promise<AuthResponse> {
    return api.post<AuthResponse>('/auth/reset-password', { email }) as Promise<AuthResponse>;
}

/**
 * Initialize auth state from stored token
 * Call this on app launch
 */
export async function initializeAuth(): Promise<UserResponse | null> {
    const token = await getToken();

    if (!token) {
        return null;
    }

    api.setAuthToken(token);

    try {
        // Verify token is still valid
        const user = await getCurrentUser();
        if (!user) {
            // Token expired or invalid
            await clearAuthData();
            api.setAuthToken(null);
        }
        return user;
    } catch {
        // Token verification failed
        await clearAuthData();
        api.setAuthToken(null);
        return null;
    }
}
