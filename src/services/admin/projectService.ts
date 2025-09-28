import apiClient from '../api';

// Project Types
export interface Project {
    _id: string;
    name: string;
    slug: string;
    description: string;
    content: string;
    location: string;
    type: 'apartment' | 'villa' | 'office' | 'commercial';
    status: 'planning' | 'construction' | 'completed' | 'sold_out';
    price: {
        min: number;
        max: number;
        currency: string;
    };
    area: {
        min: number;
        max: number;
        unit: string;
    };
    images: string[];
    features: string[];
    amenities: string[];
    developer: string;
    phone?: string;
    completionDate?: string;
    totalUnits: number;
    soldUnits: number;
    salesRate: number;
    revenue: number;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
    isFeatured: boolean;
    isActive: boolean;
    tags: string[];
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectFilters {
    search?: string;
    type?: string;
    status?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    minArea?: number;
    maxArea?: number;
}

export interface CreateProjectData {
    name: string;
    slug: string;
    description: string;
    content: string;
    location: string;
    type: 'apartment' | 'villa' | 'office' | 'commercial';
    status: 'planning' | 'construction' | 'completed' | 'sold_out';
    price: {
        min: number;
        max: number;
        currency: string;
    };
    area: {
        min: number;
        max: number;
        unit: string;
    };
    images: string[];
    features: string[];
    amenities: string[];
    developer: string;
    phone?: string;
    completionDate?: string;
    totalUnits: number;
    soldUnits: number;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
    isFeatured: boolean;
    isActive: boolean;
    tags: string[];
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
}

export interface UpdateProjectData extends Partial<CreateProjectData> { }

export type ProjectType = string;

export interface ProjectStats {
    total: number;
    planning: number;
    construction: number;
    completed: number;
    soldOut: number;
}

export const projectService = {
    // Get all projects with pagination and filters
    getProjects: async (params?: {
        page?: number;
        limit?: number;
        search?: string;
        type?: string;
        status?: string;
        location?: string;
        minPrice?: number;
        maxPrice?: number;
        minArea?: number;
        maxArea?: number;
    }): Promise<{ projects: Project[]; total: number; page: number; limit: number }> => {
        const response = await apiClient.get('/admin/projects', { params });
        const data = response.data;

        if (data.success && Array.isArray(data.data)) {
            return {
                projects: data.data || [],
                total: data.pagination?.total || 0,
                page: data.pagination?.page || 1,
                limit: data.pagination?.limit || 10
            };
        }

        return {
            projects: data?.projects || data?.data || [],
            total: data?.total || data?.pagination?.total || 0,
            page: data?.page || data?.pagination?.page || 1,
            limit: data?.limit || data?.pagination?.limit || 10
        };
    },

    // Get project by ID
    getProjectById: async (id: string): Promise<Project> => {
        const response = await apiClient.get(`/admin/projects/${id}`);
        const data = response.data;

        if (data.success && data.data) {
            return data.data;
        }

        throw new Error(data.message || 'Không thể lấy thông tin dự án');
    },

    // Create new project
    createProject: async (projectData: CreateProjectData): Promise<Project> => {
        const response = await apiClient.post('/admin/projects', projectData);
        const data = response.data;

        if (data.success && data.data) {
            return data.data;
        }

        throw new Error(data.message || 'Không thể tạo dự án');
    },

    // Update project
    updateProject: async (id: string, projectData: UpdateProjectData): Promise<Project> => {
        const response = await apiClient.put(`/admin/projects/${id}`, projectData);
        const data = response.data;

        if (data.success && data.data) {
            return data.data;
        }

        throw new Error(data.message || 'Không thể cập nhật dự án');
    },

    // Delete project
    deleteProject: async (id: string): Promise<void> => {
        const response = await apiClient.delete(`/admin/projects/${id}`);
        const data = response.data;

        if (!data.success) {
            throw new Error(data.message || 'Không thể xóa dự án');
        }
    },

    // Get project types
    getProjectTypes: async (): Promise<ProjectType[]> => {
        const response = await apiClient.get('/admin/projects/types');
        const data = response.data;

        if (data.success && Array.isArray(data.data)) {
            return data.data as string[];
        }

        return [];
    },

    // Upload gallery images
    uploadGalleryImages: async (projectId: string, formData: FormData): Promise<{ data: { images: string[] } }> => {
        const response = await apiClient.post(`/admin/projects/${projectId}/gallery`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const data = response.data;

        if (data.success && data.data?.images) {
            return { data: { images: data.data.images } };
        }

        throw new Error(data.message || 'Không thể upload hình ảnh');
    },

    // Delete gallery image
    deleteGalleryImage: async (projectId: string, imageId: string): Promise<void> => {
        const response = await apiClient.delete(`/admin/projects/${projectId}/gallery/${imageId}`);
        const data = response.data;

        if (!data.success) {
            throw new Error(data.message || 'Không thể xóa hình ảnh');
        }
    },

    // Add image URL directly
    addImageUrl: async (projectId: string, imageUrl: string): Promise<{ data: { images: string[] } }> => {
        const response = await apiClient.post(`/admin/projects/${projectId}/gallery/url`, {
            imageUrl
        });

        const data = response.data;

        if (data.success && data.data?.images) {
            return { data: { images: data.data.images } };
        }

        throw new Error(data.message || 'Không thể thêm URL hình ảnh');
    },

    // Get project statistics
    getProjectStats: async (): Promise<ProjectStats> => {
        const response = await apiClient.get('/admin/projects');
        const data = response.data;

        if (data.success && Array.isArray(data.data)) {
            const projects = data.data;
            return {
                total: projects.length,
                planning: projects.filter((p: Project) => p.status === 'planning').length,
                construction: projects.filter((p: Project) => p.status === 'construction').length,
                completed: projects.filter((p: Project) => p.status === 'completed').length,
                soldOut: projects.filter((p: Project) => p.status === 'sold_out').length,
            };
        }

        return {
            total: 0,
            planning: 0,
            construction: 0,
            completed: 0,
            soldOut: 0,
        };
    },
};