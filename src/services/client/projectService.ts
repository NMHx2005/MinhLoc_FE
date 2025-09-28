import { api } from '../api';

// Types
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
    createdAt: string;
    updatedAt: string;
}

export interface ProjectFilters {
    search?: string;
    type?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
}

export interface ProjectListResponse {
    success: boolean;
    data: Project[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface ProjectResponse {
    success: boolean;
    data: Project;
}

export interface ProjectTypesResponse {
    success: boolean;
    data: string[];
}

// Service functions
export const getProjects = async (
    page: number = 1,
    limit: number = 10,
    filters: ProjectFilters = {}
): Promise<ProjectListResponse> => {
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(filters.search && { search: filters.search }),
            ...(filters.type && { type: filters.type }),
            ...(filters.location && { location: filters.location }),
            ...(filters.minPrice && { minPrice: filters.minPrice.toString() }),
            ...(filters.maxPrice && { maxPrice: filters.maxPrice.toString() }),
        });

        const response = await api.get(`/client/projects?${params}`);

        // Check if response is an array directly
        if (Array.isArray(response.data)) {
            return {
                success: true,
                data: response.data,
                pagination: {
                    page,
                    limit,
                    total: response.data.length,
                    pages: Math.ceil(response.data.length / limit)
                }
            };
        }

        // If response has success/data structure
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const getProjectById = async (id: string): Promise<ProjectResponse> => {
    try {
        const response = await api.get(`/client/projects/${id}`);

        // Check if response is an object directly
        if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
            return {
                success: true,
                data: response.data
            };
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching project by ID:', error);
        throw error;
    }
};

export const getProjectBySlug = async (slug: string): Promise<ProjectResponse> => {
    try {
        const response = await api.get(`/client/projects/slug/${slug}`);

        // Check if response is an object directly
        if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
            return {
                success: true,
                data: response.data
            };
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching project by slug:', error);
        throw error;
    }
};

export const getFeaturedProjects = async (limit: number = 6): Promise<{ success: boolean; data: Project[] }> => {
    try {
        const response = await api.get(`/client/projects/featured?limit=${limit}`);

        // Check if response is an array directly
        if (Array.isArray(response.data)) {
            return {
                success: true,
                data: response.data
            };
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching featured projects:', error);
        throw error;
    }
};

export const searchProjects = async (searchParams: {
    q?: string;
    type?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    minArea?: number;
    maxArea?: number;
}): Promise<{ success: boolean; data: Project[] }> => {
    try {
        const params = new URLSearchParams();
        Object.entries(searchParams).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, value.toString());
            }
        });

        const response = await api.get(`/client/projects/search?${params}`);

        // Check if response is an array directly
        if (Array.isArray(response.data)) {
            return {
                success: true,
                data: response.data
            };
        }

        return response.data;
    } catch (error) {
        console.error('Error searching projects:', error);
        throw error;
    }
};

export const getProjectTypes = async (): Promise<ProjectTypesResponse> => {
    try {
        const response = await api.get('/client/projects/types');

        // Check if response is an array directly
        if (Array.isArray(response.data)) {
            return {
                success: true,
                data: response.data
            };
        }

        // If response has success/data structure
        return response.data;
    } catch (error) {
        console.error('Error fetching project types:', error);
        throw error;
    }
};

export const getProjectFloorPlans = async (projectId: string): Promise<ProjectResponse> => {
    try {
        const response = await api.get(`/client/projects/${projectId}/floor-plans`);
        return response.data;
    } catch (error) {
        console.error('Error fetching project floor plans:', error);
        throw error;
    }
};
