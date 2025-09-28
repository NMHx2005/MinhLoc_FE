import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // Increased timeout to 30 seconds for file uploads
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Get token from localStorage or cookies (only on client side)
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');

            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
            // Unauthorized - but don't clear token immediately for dashboard APIs
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                console.log('401 Unauthorized error:', {
                    url: error.config?.url,
                    method: error.config?.method,
                    timestamp: new Date().toISOString()
                });

                // Store debug info
                const debugInfo = {
                    error: '401 Unauthorized',
                    url: error.config?.url,
                    method: error.config?.method,
                    timestamp: new Date().toISOString(),
                    message: '401 Unauthorized - but not clearing token immediately'
                };
                localStorage.setItem('api_error_debug', JSON.stringify(debugInfo));

                // Only clear token and redirect if it's not a dashboard API call
                const isDashboardApi = error.config?.url?.includes('/admin/dashboard/');
                if (!isDashboardApi) {
                    console.log('Non-dashboard API 401 - clearing token and redirecting');
                    // Clear all storage
                    localStorage.clear();
                    sessionStorage.clear();

                    // Clear cookies
                    document.cookie.split(";").forEach(function (c) {
                        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                    });

                    window.location.href = '/admin/login';
                } else {
                    console.log('Dashboard API 401 - not clearing token, just showing error');
                }
            }
        } else if (error.response?.status === 403) {
            // Forbidden - show access denied message
            console.error('Access denied');
        } else if (error.response?.status >= 500) {
            // Server error
            console.error('Server error:', error.response?.data?.message || 'Internal server error');
        } else if (!error.response) {
            // Network error
            console.error('Network error - please check your connection');
        }
        return Promise.reject(error);
    }
);

// API Response Types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface DashboardOverview {
    totalProjects: number;
    totalProducts: number;
    totalNews: number;
    totalUsers: number;
    totalRevenue: number;
    monthlyRevenue: number;
    projectsCompleted: number;
    projectsInProgress: number;
}

export interface RevenueChartData {
    month: string;
    revenue: number;
    projects: number;
}

export interface ProjectProgress {
    projectId: string;
    projectName: string;
    progress: number;
    status: string;
    completionDate: string;
}

export interface TopPerformer {
    id: string;
    name: string;
    type: 'project' | 'product' | 'news';
    performance: number;
    metric: string;
}

export interface RecentActivity {
    id: string;
    type: string;
    description: string;
    timestamp: string;
    user: string;
}

// Dashboard API functions
export const dashboardApi = {
    // Get dashboard overview statistics
    getOverview: async (): Promise<ApiResponse<DashboardOverview>> => {
        const response = await apiClient.get('/admin/dashboard/overview');
        return response.data;
    },

    // Get revenue chart data
    getRevenueChart: async (period: string = '12months'): Promise<ApiResponse<RevenueChartData[]>> => {
        const response = await apiClient.get(`/admin/dashboard/revenue-chart?period=${period}`);
        return response.data;
    },

    // Get project progress data
    getProjectProgress: async (): Promise<ApiResponse<ProjectProgress[]>> => {
        const response = await apiClient.get('/admin/dashboard/project-progress');
        return response.data;
    },

    // Get top performers
    getTopPerformers: async (): Promise<ApiResponse<TopPerformer[]>> => {
        const response = await apiClient.get('/admin/dashboard/top-performers');
        return response.data;
    },

    // Get recent activities
    getRecentActivity: async (limit: number = 10): Promise<ApiResponse<RecentActivity[]>> => {
        const response = await apiClient.get(`/admin/dashboard/recent-activity?limit=${limit}`);
        return response.data;
    },
};

// Generic API functions
export const api = {
    // GET request
    get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        const response = await apiClient.get(url, config);
        return response.data;
    },

    // POST request
    post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        const response = await apiClient.post(url, data, config);
        return response.data;
    },

    // PUT request
    put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        const response = await apiClient.put(url, data, config);
        return response.data;
    },

    // DELETE request
    delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        const response = await apiClient.delete(url, config);
        return response.data;
    },

    // PATCH request
    patch: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
        const response = await apiClient.patch(url, data, config);
        return response.data;
    },
};

// Auth helper functions
export const authApi = {
    // Login
    login: async (email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> => {
        const response = await apiClient.post('/auth/login', { email, password });
        return response.data;
    },

    // Logout
    logout: async (): Promise<void> => {
        localStorage.removeItem('admin_token');
    },

    // Get current user
    getCurrentUser: async (): Promise<ApiResponse<any>> => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    },
};

// Create a separate axios instance for file uploads with longer timeout
const uploadClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000, // 60 seconds for file uploads
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

// Apply same interceptors to upload client
uploadClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

uploadClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        console.error('Upload error:', error);
        return Promise.reject(error);
    }
);

export { uploadClient };
export default apiClient;