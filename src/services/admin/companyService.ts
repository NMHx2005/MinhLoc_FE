import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

// Types
export interface CompanyInfo {
    _id?: string;
    section: 'general' | 'history' | 'competitiveness' | 'system' | 'partners' | 'social_activities';
    title: string;
    content: string;
    images?: string[];
    data?: {
        // For general section
        companyName?: string;
        foundedYear?: number;
        headquarters?: string;
        contactInfo?: {
            email?: string;
            phone?: string;
            address?: string;
            website?: string;
        };
        socialMedia?: {
            facebook?: string;
            linkedin?: string;
            youtube?: string;
        };
        mission?: string;
        vision?: string;
        values?: string[];
        // For history section
        milestones?: Array<{
            year: string;
            event: string;
            description?: string;
        }>;
        // For competitiveness section
        strengths?: Array<{
            title: string;
            description: string;
            icon: string;
            color: string;
        }>;
        // For system section
        businessAreas?: Array<{
            name: string;
            description: string;
            items: string[];
            color: string;
        }>;
        network?: Array<{
            city: string;
            projects: number;
            staff: number;
        }>;
        // For partners section
        partners?: Array<{
            name: string;
            type: string;
            logo?: string;
        }>;
        // For social activities section
        activities?: Array<{
            title: string;
            description: string;
            image?: string;
        }>;
        achievements?: Array<{
            number: string;
            label: string;
        }>;
    };
    isActive: boolean;
    sortOrder: number;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateOrUpdateCompanyInfoData {
    section: string;
    title: string;
    content: string;
    images?: string[];
    data?: any;
    sortOrder?: number;
}

export interface UpdateSortOrderData {
    sections: Array<{
        id: string;
        sortOrder: number;
    }>;
}

// API Response types
interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

// Create axios instance with default config
const api = axios.create({
    baseURL: `${API_BASE_URL}/admin/company`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
        console.warn('No accessToken found in localStorage');
    }
    return config;
});

export const companyService = {
    /**
     * Get company info by section or all sections
     */
    async getCompanyInfo(section?: string): Promise<CompanyInfo[]> {
        try {
            const params = section ? { section } : {};
            const response = await api.get<ApiResponse<CompanyInfo[]>>('/info', { params });

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Lỗi khi lấy thông tin công ty');
            }
        } catch (error: any) {
            console.error('Error getting company info:', error);
            if (error.response?.status === 401) {
                throw new Error('Không có accessToken xác thực');
            }
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Không thể lấy thông tin công ty');
        }
    },

    /**
     * Get company info by specific section
     */
    async getCompanyInfoBySection(section: string): Promise<CompanyInfo | null> {
        try {
            const response = await api.get<ApiResponse<CompanyInfo>>('/info', {
                params: { section }
            });

            if (response.data.success) {
                return response.data.data || null;
            } else {
                throw new Error(response.data.message || 'Lỗi khi lấy thông tin công ty');
            }
        } catch (error: any) {
            console.error('Error getting company info by section:', error);
            if (error.response?.status === 401) {
                throw new Error('Không có accessToken xác thực');
            }
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Không thể lấy thông tin công ty');
        }
    },

    /**
     * Create or update company info section
     */
    async createOrUpdateCompanyInfo(data: CreateOrUpdateCompanyInfoData): Promise<CompanyInfo> {
        try {
            const response = await api.post<ApiResponse<CompanyInfo>>('/info', data);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Lỗi khi cập nhật thông tin công ty');
            }
        } catch (error: any) {
            console.error('Error creating/updating company info:', error);
            if (error.response?.status === 401) {
                throw new Error('Không có accessToken xác thực');
            }
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Không thể cập nhật thông tin công ty');
        }
    },

    /**
     * Delete company info section
     */
    async deleteCompanyInfo(id: string): Promise<void> {
        try {
            const response = await api.delete<ApiResponse<void>>(`/info/${id}`);

            if (!response.data.success) {
                throw new Error(response.data.message || 'Lỗi khi xóa thông tin công ty');
            }
        } catch (error: any) {
            console.error('Error deleting company info:', error);
            if (error.response?.status === 401) {
                throw new Error('Không có accessToken xác thực');
            }
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Không thể xóa thông tin công ty');
        }
    },

    /**
     * Update company info sort order
     */
    async updateCompanyInfoSortOrder(data: UpdateSortOrderData): Promise<void> {
        try {
            const response = await api.put<ApiResponse<void>>('/info/sort', data);

            if (!response.data.success) {
                throw new Error(response.data.message || 'Lỗi khi cập nhật thứ tự');
            }
        } catch (error: any) {
            console.error('Error updating sort order:', error);
            if (error.response?.status === 401) {
                throw new Error('Không có accessToken xác thực');
            }
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Không thể cập nhật thứ tự');
        }
    }
};

export default companyService;
