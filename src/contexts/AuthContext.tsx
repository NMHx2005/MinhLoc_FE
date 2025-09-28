'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService, type User, type LoginCredentials, type RegisterData } from '../services/authService';
import { useRouter } from 'next/navigation';

// Error type for better type safety
interface ApiError {
    response?: {
        status: number;
        data?: {
            message?: string;
            error?: string;
            success?: boolean;
        };
    };
    message?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const isAuthenticated = !!user;

    // Check if user is authenticated on app load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log('AuthContext: Starting auth check...');

                // Show all previous debug info
                const allDebugKeys = ['auth_debug', 'login_debug', 'isAuthenticated_debug', 'api_request_debug', 'api_error_debug'];
                allDebugKeys.forEach(key => {
                    const debug = localStorage.getItem(key);
                    if (debug) {
                        console.log(`Previous ${key}:`, JSON.parse(debug));
                    }
                });

                // Add small delay to ensure localStorage is updated
                await new Promise(resolve => setTimeout(resolve, 100));

                // Only check auth if we're on client side and have a token
                if (typeof window !== 'undefined' && authService.isAuthenticated()) {
                    console.log('AuthContext: User has token, checking validity...');

                    // Show previous debug info
                    const authDebug = localStorage.getItem('auth_debug');
                    const loginDebug = localStorage.getItem('login_debug');
                    const isAuthDebug = localStorage.getItem('isAuthenticated_debug');

                    if (authDebug) console.log('Previous auth_debug:', JSON.parse(authDebug));
                    if (loginDebug) console.log('Previous login_debug:', JSON.parse(loginDebug));
                    if (isAuthDebug) console.log('Previous isAuthenticated_debug:', JSON.parse(isAuthDebug));
                    // Just check if token is valid, don't call profile API
                    const hasValidToken = await authService.ensureValidToken();

                    if (hasValidToken) {
                        console.log('AuthContext: Token is valid, user authenticated');
                        // Token is valid, user is authenticated but we don't have user data
                        // This will be set when user logs in successfully
                    } else {
                        console.log('AuthContext: Token invalid, but keeping token for now');
                        // Don't clear auth immediately, let user try to login
                        setUser(null);
                    }
                } else {
                    console.log('AuthContext: No token found, user not authenticated');

                    // Show previous debug info
                    const authDebug = localStorage.getItem('auth_debug');
                    const loginDebug = localStorage.getItem('login_debug');
                    const isAuthDebug = localStorage.getItem('isAuthenticated_debug');

                    if (authDebug) console.log('Previous auth_debug:', JSON.parse(authDebug));
                    if (loginDebug) console.log('Previous login_debug:', JSON.parse(loginDebug));
                    if (isAuthDebug) console.log('Previous isAuthenticated_debug:', JSON.parse(isAuthDebug));

                    // No token or server side, user is not authenticated
                    setUser(null);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                // Don't clear auth on general errors
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            setLoading(true);
            const response = await authService.login(credentials);

            // Check if login was successful
            const isSuccess = response.success === true;
            const user = response.data?.user;
            const accessToken = response.data?.accessToken;

            if (isSuccess && user && accessToken) {
                console.log('Login successful, setting user and redirecting...');

                // Debug: Check token storage after login
                const loginDebugInfo = {
                    localStorage: localStorage.getItem('accessToken') ? 'EXISTS' : 'NOT FOUND',
                    authService: authService.isAuthenticated(),
                    timestamp: new Date().toISOString()
                };
                console.log('Token after login:', loginDebugInfo);

                // Store debug info for persistence
                localStorage.setItem('login_debug', JSON.stringify(loginDebugInfo));

                setUser(user);

                // Redirect based on user role
                if (user.role === 'admin' || user.role === 'super_admin') {
                    console.log('Redirecting to /admin...');
                    router.push('/admin');
                } else {
                    console.log('Redirecting to /...');
                    router.push('/');
                }
            } else {
                console.error('Login failed - response not successful:', {
                    success: response.success,
                    hasData: !!response.data,
                    hasUser: !!user,
                    hasAccessToken: !!accessToken,
                    message: response.message
                });
                throw new Error(response.message || 'Đăng nhập thất bại');
            }
        } catch (error) {
            console.error('Login failed:', error);

            // Re-throw the error with better formatting for UI
            const axiosError = error as ApiError;
            if (axiosError.response?.data?.error) {
                const customError = new Error(axiosError.response.data.error) as Error & { response?: ApiError['response'] };
                customError.response = axiosError.response;
                throw customError;
            }

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: RegisterData) => {
        try {
            setLoading(true);
            const response = await authService.register(data);

            // Check if registration was successful
            const isSuccess = response.success === true;
            const user = response.data?.user;
            const accessToken = response.data?.accessToken;

            if (isSuccess && user && accessToken) {
                setUser(user);
                router.push('/admin');
            } else {
                throw new Error(response.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await authService.logout();
            setUser(null);
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // Clear local state even if logout request fails
            setUser(null);
            router.push('/admin/login');
        } finally {
            setLoading(false);
        }
    };

    const refreshUser = async () => {
        try {
            if (authService.isAuthenticated()) {
                // Just check if token is valid, don't call profile API
                const hasValidToken = await authService.ensureValidToken();

                if (!hasValidToken) {
                    // No valid token, clear auth
                    authService.clearAuth();
                    setUser(null);
                }
                // If token is valid, keep current user state
            }
        } catch (error) {
            console.error('Refresh user failed:', error);

            // Only clear auth if it's an authentication error (401, 403)
            // Don't clear on network errors or server errors
            if ((error as ApiError)?.response?.status === 401 || (error as ApiError)?.response?.status === 403) {
                authService.clearAuth();
                setUser(null);
            }
            // For other errors, just set user to null but keep token
            // This allows retry on network issues
        }
    };

    const updateProfile = async (data: Partial<User>) => {
        try {
            setLoading(true);
            const updatedUser = await authService.updateProfile(data);
            setUser(updatedUser);
        } catch (error) {
            console.error('Update profile failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        refreshUser,
        updateProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Debug function to check token status
export const debugTokenStatus = () => {
    if (typeof window === 'undefined') return null;

    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const debug = {
        hasAccessToken: !!token,
        hasRefreshToken: !!refreshToken,
        accessTokenLength: token?.length || 0,
        refreshTokenLength: refreshToken?.length || 0,
        cookies: document.cookie
    };

    console.log('Token Debug Status:', debug);
    return debug;
};

// Make it available globally
if (typeof window !== 'undefined') {
    (window as any).debugTokenStatus = debugTokenStatus;
}
