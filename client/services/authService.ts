/**
 * Authentication Service
 * Handles all auth-related API calls
 */

import { api } from './api';
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

    // The API returns the response directly, not wrapped in data
    const authResult = response as unknown as AuthResponse;

    if (authResult.success && authResult.token && authResult.user) {
        await saveToken(authResult.token);
        await saveUserData(authResult.user);
        api.setAuthToken(authResult.token);
    }

    return authResult;
}

/**
 * Sign in existing user
 */
export async function signIn(data: SignInData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signin', data);

    const authResult = response as unknown as AuthResponse;

    if (authResult.success && authResult.token && authResult.user) {
        await saveToken(authResult.token);
        await saveUserData(authResult.user);
        api.setAuthToken(authResult.token);
    }

    return authResult;
}

/**
 * Sign out user
 */
export async function signOut(): Promise<void> {
    try {
        await api.post('/auth/logout');
    } catch {
        // Ignore errors - we're logging out anyway
    } finally {
        await clearAuthData();
        api.setAuthToken(null);
    }
}

/**
 * Get current user from server
 */
export async function getCurrentUser(): Promise<UserResponse | null> {
    const response = await api.get<{ success: boolean; user: UserResponse }>('/auth/me');

    const result = response as unknown as { success: boolean; user?: UserResponse };

    if (result.success && result.user) {
        await saveUserData(result.user);
        return result.user;
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

    const authResult = response as unknown as AuthResponse;

    if (authResult.success && authResult.user) {
        await saveUserData(authResult.user);
    }

    return authResult;
}

/**
 * Request password reset
 */
export async function resetPassword(email: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/reset-password', { email });
    return response as unknown as AuthResponse;
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
        const user = await getCurrentUser();
        if (!user) {
            await clearAuthData();
            api.setAuthToken(null);
        }
        return user;
    } catch {
        await clearAuthData();
        api.setAuthToken(null);
        return null;
    }
}
