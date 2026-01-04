/**
 * API Configuration and Base Client
 * Handles all HTTP requests to the backend server
 */

// API Base URL - change this for different environments
const API_BASE_URL = __DEV__
    ? 'http://localhost:5000/api'  // Development
    : 'https://api.imall.com/api'; // Production (update when deployed)

// For iOS simulator, use localhost
// For Android emulator, use 10.0.2.2 instead of localhost
// For physical devices, use your computer's IP address

interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

interface RequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: any;
}

class ApiClient {
    private baseUrl: string;
    private authToken: string | null = null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    setAuthToken(token: string | null) {
        this.authToken = token;
    }

    getAuthToken(): string | null {
        return this.authToken;
    }

    private async request<T>(
        endpoint: string,
        options: RequestOptions
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseUrl}${endpoint}`;

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (this.authToken) {
            headers['Authorization'] = `Bearer ${this.authToken}`;
        }

        try {
            const response = await fetch(url, {
                method: options.method,
                headers,
                body: options.body ? JSON.stringify(options.body) : undefined,
            });

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: data.error || data.message || `HTTP ${response.status}`,
                };
            }

            return data;
        } catch (error) {
            console.error('API Request Error:', error);

            // Network error handling
            if (error instanceof TypeError && error.message.includes('Network')) {
                return {
                    success: false,
                    error: 'Unable to connect to server. Please check your internet connection.',
                };
            }

            return {
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
            };
        }
    }

    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'POST', body });
    }

    async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'PUT', body });
    }

    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }

    async patch<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'PATCH', body });
    }
}

// Export singleton instance
export const api = new ApiClient(API_BASE_URL);
export type { ApiResponse };
