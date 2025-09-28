import { api } from '@/services/api';

// Auth Types
export interface User {
  _id: string;
  id: string;
  name: string;
  fullName: string;
  email: string;
  phone: string;
  type: string;
  status: string;
  role: string;
  roles: string[];
  permissions: string[];
  interests: string[];
  totalorders: number;  // API returns lowercase
  totalspent: number;   // API returns lowercase
  lastActivity: string;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  agreeToTerms: boolean;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface ResetPasswordData {
  email: string;
}

export interface ConfirmResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyEmailData {
  token: string;
}

export interface VerifyPhoneData {
  phone: string;
  code: string;
}

export interface ResendVerificationData {
  email?: string;
  phone?: string;
}

// Auth Service
export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);


    // Store token in both localStorage and cookies (only on client side)
    if (typeof window !== 'undefined') {
      // Try different response structures
      const accessToken = response.data?.accessToken || response.data?.data?.accessToken;
      const refreshToken = response.data?.refreshToken || response.data?.data?.refreshToken;
      if (accessToken) {

        // Store in localStorage
        localStorage.setItem('accessToken', accessToken);
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }

        // Debug: Verify token storage
        const debugInfo = {
          accessToken: localStorage.getItem('accessToken') ? 'EXISTS' : 'NOT FOUND',
          refreshToken: localStorage.getItem('refreshToken') ? 'EXISTS' : 'NOT FOUND',
          timestamp: new Date().toISOString()
        };
        console.log('Token stored in localStorage:', debugInfo);

        // Store debug info in localStorage for persistence
        localStorage.setItem('auth_debug', JSON.stringify(debugInfo));

        // Store in cookies
        document.cookie = `accessToken=${accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
        if (refreshToken) {
          document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
        }

        // Debug: Decode token to check payload
        try {
          const payload = JSON.parse(atob(accessToken.split('.')[1]));
          console.log('Token payload:', payload);
        } catch (e) {
          console.error('Failed to decode token:', e);
        }
      } else {
        console.error('No access token found in response:', response);
      }
    }

    // Return the full response with success, message, data structure
    return response;
  },

  // Register
  register: async (registerData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', registerData);

    // Store token in both localStorage and cookies (only on client side)
    if (typeof window !== 'undefined' && response.data?.accessToken) {
      // Store in localStorage
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      // Store in cookies
      document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
      document.cookie = `refreshToken=${response.data.refreshToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
    }

    // Return the full response with success, message, data structure
    return response;
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tokens from both localStorage and cookies (only on client side)
      if (typeof window !== 'undefined') {
        // Clear localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Clear cookies
        document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    }
  },

  // Get current user with retry mechanism
  getCurrentUser: async (retries: number = 2): Promise<User> => {
    try {
      const response = await api.get('/auth/profile');

      // Handle different response formats
      if (response.data?.user) {
        return response.data?.user;
      } else if (response?.data?.user) {
        return response.data?.user;
      } else if (response && !response.success) {
        throw new Error(response.message || 'Failed to get user profile');
      } else {
        return response.data?.user;
      }
    } catch (error) {
      // Retry on network errors (no response or 5xx errors)
      const apiError = error as { response?: { status: number } };
      if (retries > 0 && (!apiError.response || apiError.response?.status >= 500)) {
        console.warn(`Get current user failed, retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        return authService.getCurrentUser(retries - 1);
      }
      throw error;
    }
  },

  // Refresh token
  refreshToken: async (): Promise<AuthResponse> => {
    if (typeof window === 'undefined') {
      throw new Error('Cannot refresh token on server side');
    }
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await api.post('/auth/refresh-token', { refreshToken });

    // Update tokens in both localStorage and cookies (only on client side)
    if (typeof window !== 'undefined' && response.data?.accessToken) {
      // Update localStorage
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      // Update cookies
      document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
      document.cookie = `refreshToken=${response.data.refreshToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
    }

    return response;
  },

  // Forgot password
  forgotPassword: async (data: ResetPasswordData): Promise<{ message: string }> => {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  },

  // Reset password
  resetPassword: async (data: ConfirmResetPasswordData): Promise<{ message: string }> => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },

  // Change password
  changePassword: async (data: ChangePasswordData): Promise<{ message: string }> => {
    const response = await api.post('/auth/change-password', data);
    return response.data;
  },

  // Verify email
  verifyEmail: async (data: VerifyEmailData): Promise<{ message: string }> => {
    const response = await api.post('/auth/verify-email', data);
    return response.data;
  },

  // Verify phone
  verifyPhone: async (data: VerifyPhoneData): Promise<{ message: string }> => {
    const response = await api.post('/auth/verify-phone', data);
    return response.data;
  },

  // Resend verification
  resendVerification: async (data: ResendVerificationData): Promise<{ message: string }> => {
    const response = await api.post('/auth/resend-verification', data);
    return response.data;
  },

  // Update profile
  updateProfile: async (profileData: Partial<User>): Promise<User> => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },

  // Upload avatar
  uploadAvatar: async (file: File): Promise<{ avatar: string }> => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post('/auth/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('accessToken');
    const debugInfo = {
      hasToken: !!token,
      tokenLength: token?.length,
      tokenPreview: token ? token.substring(0, 20) + '...' : 'none',
      timestamp: new Date().toISOString()
    };
    console.log('isAuthenticated check:', debugInfo);

    // Store debug info for persistence
    localStorage.setItem('isAuthenticated_debug', JSON.stringify(debugInfo));

    return !!token;
  },

  // Get stored token
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  },

  // Clear auth data
  clearAuth: (): void => {
    if (typeof window === 'undefined') return;
    // Clear localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Clear cookies
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  },

  // Check token expiration
  isTokenExpired: (): boolean => {
    if (typeof window === 'undefined') return true;
    const token = localStorage.getItem('accessToken');
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Token expiration check error:', error);
      return true;
    }
  },

  // Auto refresh token if needed
  ensureValidToken: async (): Promise<boolean> => {
    if (!authService.isAuthenticated()) {
      return false;
    }

    if (authService.isTokenExpired()) {
      try {
        await authService.refreshToken();
        return true;
      } catch (error) {
        console.error('Token refresh error:', error);
        authService.clearAuth();
        return false;
      }
    }

    return true;
  }
};

// Auth context types for React hooks
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}
