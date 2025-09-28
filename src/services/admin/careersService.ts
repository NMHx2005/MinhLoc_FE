import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

// Types
export interface JobPosition {
    _id: string;
    title: string;
    slug: string;
    department: 'sales' | 'marketing' | 'construction' | 'finance' | 'hr' | 'it' | 'admin' | 'operations';
    location: string;
    type: 'full-time' | 'part-time' | 'contract' | 'internship';
    salary: string;
    experience: string;
    deadline: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    skills: string[];
    isHot: boolean;
    isUrgent: boolean;
    isActive: boolean;
    status: 'draft' | 'published' | 'closed' | 'cancelled';
    priority: number;
    tags: string[];
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
    createdBy?: {
        _id: string;
        name: string;
        email: string;
    };
    updatedBy?: {
        _id: string;
        name: string;
        email: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

export interface JobApplication {
    _id: string;
    jobPositionId: string | JobPosition;
    applicantName: string;
    email: string;
    phone: string;
    resume: string;
    coverLetter?: string;
    status: 'pending' | 'reviewing' | 'interviewed' | 'accepted' | 'rejected';
    notes?: string;
    interviewDate?: string;
    interviewNotes?: string;
    rating?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateJobPositionData {
    title: string;
    slug?: string;
    department: 'sales' | 'marketing' | 'construction' | 'finance' | 'hr' | 'it' | 'admin' | 'operations';
    location: string;
    type: 'full-time' | 'part-time' | 'contract' | 'internship';
    salary: string;
    experience: string;
    deadline: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    skills: string[];
    isHot: boolean;
    isUrgent: boolean;
    isActive: boolean;
    status: 'draft' | 'published' | 'closed' | 'cancelled';
    priority: number;
    tags: string[];
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
}

export type UpdateJobPositionData = Partial<CreateJobPositionData>;

export interface UpdateJobApplicationData {
    status: 'pending' | 'reviewing' | 'interviewed' | 'accepted' | 'rejected';
    notes?: string;
    interviewDate?: string;
    interviewNotes?: string;
    rating?: number;
}

export interface CareersStatistics {
    totalPositions: number;
    activePositions: number;
    totalApplications: number;
    applicationsByStatus: Array<{
        _id: string;
        count: number;
    }>;
    positionsByDepartment: Array<{
        _id: string;
        count: number;
    }>;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

interface PaginatedResponse<T> {
    success: boolean;
    data: {
        positions: T[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    };
    message?: string;
    error?: string;
}

const api = axios.create({
    baseURL: `${API_BASE_URL}/admin/careers`,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
        console.warn('No accessToken found in localStorage');
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Authentication failed. Please login again.');
            // Optionally redirect to login page
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const careersService = {
    // Job Positions
    async getJobPositions(options: {
        page: number;
        limit: number;
        department?: string;
        status?: string;
        search?: string;
    }): Promise<PaginatedResponse<JobPosition>> {
        try {
            const params = new URLSearchParams();
            params.append('page', options.page.toString());
            params.append('limit', options.limit.toString());
            if (options.department) params.append('department', options.department);
            if (options.status) params.append('status', options.status);
            if (options.search) params.append('search', options.search);

            const response = await api.get<PaginatedResponse<JobPosition>>('/positions', { params });

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message || 'Lỗi khi lấy danh sách vị trí tuyển dụng');
            }
        } catch (error: unknown) {
            console.error('Error getting job positions:', error);
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { status?: number } };
                if (axiosError.response?.status === 401) {
                    throw new Error('Không có accessToken xác thực');
                }
            }
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } };
                if (axiosError.response?.data?.message) {
                    throw new Error(axiosError.response.data.message);
                }
            }
            throw new Error('Không thể lấy danh sách vị trí tuyển dụng');
        }
    },

    async getJobPositionById(id: string): Promise<JobPosition> {
        try {
            const response = await api.get<ApiResponse<JobPosition>>(`/positions/${id}`);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Lỗi khi lấy thông tin vị trí tuyển dụng');
            }
        } catch (error: unknown) {
            console.error('Error getting job position:', error);
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { status?: number } };
                if (axiosError.response?.status === 401) {
                    throw new Error('Không có accessToken xác thực');
                }
            }
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } };
                if (axiosError.response?.data?.message) {
                    throw new Error(axiosError.response.data.message);
                }
            }
            throw new Error('Không thể lấy thông tin vị trí tuyển dụng');
        }
    },

    async createJobPosition(data: CreateJobPositionData): Promise<JobPosition> {
        try {
            const response = await api.post<ApiResponse<JobPosition>>('/positions', data);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Lỗi khi tạo vị trí tuyển dụng');
            }
        } catch (error: unknown) {
            console.error('Error creating job position:', error);
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { status?: number } };
                if (axiosError.response?.status === 401) {
                    throw new Error('Không có accessToken xác thực');
                }
            }
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } };
                if (axiosError.response?.data?.message) {
                    throw new Error(axiosError.response.data.message);
                }
            }
            throw new Error('Không thể tạo vị trí tuyển dụng');
        }
    },

    async updateJobPosition(id: string, data: UpdateJobPositionData): Promise<JobPosition> {
        try {
            const response = await api.put<ApiResponse<JobPosition>>(`/positions/${id}`, data);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Lỗi khi cập nhật vị trí tuyển dụng');
            }
        } catch (error: unknown) {
            console.error('Error updating job position:', error);
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { status?: number } };
                if (axiosError.response?.status === 401) {
                    throw new Error('Không có accessToken xác thực');
                }
            }
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } };
                if (axiosError.response?.data?.message) {
                    throw new Error(axiosError.response.data.message);
                }
            }
            throw new Error('Không thể cập nhật vị trí tuyển dụng');
        }
    },

    async deleteJobPosition(id: string): Promise<void> {
        try {
            const response = await api.delete<ApiResponse<void>>(`/positions/${id}`);

            if (!response.data.success) {
                throw new Error(response.data.message || 'Lỗi khi xóa vị trí tuyển dụng');
            }
        } catch (error: unknown) {
            console.error('Error deleting job position:', error);
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { status?: number } };
                if (axiosError.response?.status === 401) {
                    throw new Error('Không có accessToken xác thực');
                }
            }
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } };
                if (axiosError.response?.data?.message) {
                    throw new Error(axiosError.response.data.message);
                }
            }
            throw new Error('Không thể xóa vị trí tuyển dụng');
        }
    },

    // Job Applications
    async getJobApplications(options: {
        page: number;
        limit: number;
        jobPositionId?: string;
        status?: string;
        search?: string;
    }): Promise<PaginatedResponse<JobApplication>> {
        try {
            const params = new URLSearchParams();
            params.append('page', options.page.toString());
            params.append('limit', options.limit.toString());
            if (options.jobPositionId) params.append('jobPositionId', options.jobPositionId);
            if (options.status) params.append('status', options.status);
            if (options.search) params.append('search', options.search);

            const response = await api.get<PaginatedResponse<JobApplication>>('/applications', { params });

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message || 'Lỗi khi lấy danh sách hồ sơ ứng tuyển');
            }
        } catch (error: unknown) {
            console.error('Error getting job applications:', error);
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { status?: number } };
                if (axiosError.response?.status === 401) {
                    throw new Error('Không có accessToken xác thực');
                }
            }
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } };
                if (axiosError.response?.data?.message) {
                    throw new Error(axiosError.response.data.message);
                }
            }
            throw new Error('Không thể lấy danh sách hồ sơ ứng tuyển');
        }
    },

    async getJobApplicationById(id: string): Promise<JobApplication> {
        try {
            const response = await api.get<ApiResponse<JobApplication>>(`/applications/${id}`);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Lỗi khi lấy thông tin hồ sơ ứng tuyển');
            }
        } catch (error: unknown) {
            console.error('Error getting job application:', error);
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { status?: number } };
                if (axiosError.response?.status === 401) {
                    throw new Error('Không có accessToken xác thực');
                }
            }
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } };
                if (axiosError.response?.data?.message) {
                    throw new Error(axiosError.response.data.message);
                }
            }
            throw new Error('Không thể lấy thông tin hồ sơ ứng tuyển');
        }
    },

    async updateJobApplicationStatus(id: string, data: UpdateJobApplicationData): Promise<JobApplication> {
        try {
            const response = await api.put<ApiResponse<JobApplication>>(`/applications/${id}/status`, data);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Lỗi khi cập nhật trạng thái hồ sơ');
            }
        } catch (error: unknown) {
            console.error('Error updating job application status:', error);
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { status?: number } };
                if (axiosError.response?.status === 401) {
                    throw new Error('Không có accessToken xác thực');
                }
            }
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } };
                if (axiosError.response?.data?.message) {
                    throw new Error(axiosError.response.data.message);
                }
            }
            throw new Error('Không thể cập nhật trạng thái hồ sơ');
        }
    },

    // Statistics
    async getCareersStatistics(): Promise<CareersStatistics> {
        try {
            const response = await api.get<ApiResponse<CareersStatistics>>('/statistics');

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Lỗi khi lấy thống kê tuyển dụng');
            }
        } catch (error: unknown) {
            console.error('Error getting careers statistics:', error);
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { status?: number } };
                if (axiosError.response?.status === 401) {
                    throw new Error('Không có accessToken xác thực');
                }
            }
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } };
                if (axiosError.response?.data?.message) {
                    throw new Error(axiosError.response.data.message);
                }
            }
            throw new Error('Không thể lấy thống kê tuyển dụng');
        }
    }
};

export default careersService;
