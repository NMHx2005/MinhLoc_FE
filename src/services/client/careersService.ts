import { api } from '../api';

export interface JobPosition {
    _id: string;
    title: string;
    slug: string;
    department: string;
    location: string;
    type: 'full-time' | 'part-time' | 'contract' | 'internship';
    salary: string;
    experience: string;
    deadline: string;
    description: string;
    requirements: string[];
    benefits: string[];
    isHot: boolean;
    isUrgent: boolean;
    isActive: boolean;
    status: 'draft' | 'published' | 'archived';
    priority: number;
    createdAt: string;
    updatedAt: string;
}

export interface JobApplication {
    _id: string;
    jobPositionId: string;
    fullName: string;
    email: string;
    phone: string;
    cvUrl?: string;
    coverLetter?: string;
    experience: string;
    education: string;
    skills: string[];
    source: string;
    status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
    createdAt: string;
    updatedAt: string;
}

export interface Department {
    value: string;
    label: string;
}

export interface JobPositionsResponse {
    positions: JobPosition[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export const careersService = {
    /**
     * Get job positions with pagination and filters
     */
    getJobPositions: async (page: number = 1, limit: number = 10, filters: {
        department?: string;
        type?: string;
        search?: string;
    } = {}): Promise<JobPositionsResponse> => {
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString()
            });

            // Only add filters if they have values
            if (filters.department) params.append('department', filters.department);
            if (filters.type) params.append('type', filters.type);
            if (filters.search) params.append('search', filters.search);

            const response = await api.get(`/client/careers?${params}`);

            // Ensure we return the correct structure
            if (response.data) {
                return response.data;
            }

            // Fallback if structure is different
            return {
                positions: [],
                pagination: {
                    page: 1,
                    limit: 10,
                    total: 0,
                    pages: 0
                }
            };
        } catch (error: any) {
            console.error('Error fetching job positions:', error);
            throw new Error(error.response?.data?.message || 'Không thể tải danh sách việc làm');
        }
    },

    /**
     * Get job position by ID
     */
    getJobPositionById: async (id: string): Promise<JobPosition> => {
        try {
            const response = await api.get(`/client/careers/id/${id}`);

            if (response.data && response.data.data) {
                return response.data.data;
            }

            throw new Error('Không tìm thấy thông tin việc làm');
        } catch (error: any) {
            console.error('Error fetching job position:', error);
            throw new Error(error.response?.data?.message || 'Không thể tải thông tin việc làm');
        }
    },

    /**
     * Get job position by slug
     */
    getJobPositionBySlug: async (slug: string): Promise<JobPosition> => {
        try {
            const response = await api.get(`/client/careers/${slug}`);

            if (response.data && response.data.data) {
                return response.data.data;
            }

            throw new Error('Không tìm thấy thông tin việc làm');
        } catch (error: any) {
            console.error('Error fetching job position:', error);
            throw new Error(error.response?.data?.message || 'Không thể tải thông tin việc làm');
        }
    },

    /**
     * Submit job application
     */
    submitJobApplication: async (data: {
        jobPositionId: string;
        fullName: string;
        email: string;
        phone: string;
        cvUrl?: string;
        coverLetter?: string;
        experience: string;
        education: string;
        skills: string[];
    }): Promise<JobApplication> => {
        try {
            const response = await api.post('/client/careers/apply', data);

            if (response.data && response.data.data) {
                return response.data.data;
            }

            throw new Error('Không thể nộp hồ sơ ứng tuyển');
        } catch (error: any) {
            console.error('Error submitting job application:', error);
            throw new Error(error.response?.data?.message || 'Không thể nộp hồ sơ ứng tuyển');
        }
    },

    /**
     * Get departments list
     */
    getDepartments: async (): Promise<Department[]> => {
        try {
            const response = await api.get('/client/careers/departments');

            if (response.data && response.data.data) {
                return response.data.data;
            }

            // Fallback for departments (hardcoded data)
            return [];
        } catch (error: any) {
            console.error('Error fetching departments:', error);
            throw new Error(error.response?.data?.message || 'Không thể tải danh sách phòng ban');
        }
    }
};
