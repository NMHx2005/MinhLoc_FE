import apiClient from '../api';

// Types for Business Field data
export interface BusinessField {
    _id: string;
    name: string;
    slug: string;
    subtitle: string;
    description: string;
    image: string;
    icon: string;
    color: string;
    features: string[];
    projects: Array<{
        name: string;
        scale: string;
        status: 'completed' | 'in_progress' | 'planning' | 'sold_out' | 'coming_soon';
        description?: string;
        image?: string;
    }>;
    stats: {
        projects?: string;
        area?: string;
        experience?: string;
        return?: string;
        clients?: string;
        properties?: string;
    };
    sortOrder: number;
    isActive: boolean;
    isFeatured?: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBusinessFieldData {
    name: string;
    subtitle: string;
    description: string;
    image: string;
    icon: string;
    color: string;
    features: string[];
    projects: Array<{
        name: string;
        scale: string;
        status: 'completed' | 'in_progress' | 'planning' | 'sold_out' | 'coming_soon';
        description?: string;
        image?: string;
    }>;
    stats: {
        projects?: string;
        area?: string;
        experience?: string;
        return?: string;
        clients?: string;
        properties?: string;
    };
    sortOrder: number;
    isActive: boolean;
    isFeatured?: boolean;
}

export interface UpdateBusinessFieldData extends Partial<CreateBusinessFieldData> { }

export interface BusinessFieldFilters {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
    isFeatured?: boolean;
}

export interface BusinessFieldResponse {
    success: boolean;
    data: BusinessField[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface SingleBusinessFieldResponse {
    success: boolean;
    data: BusinessField;
}

export interface BusinessFieldSortData {
    fields: Array<{
        _id: string;
        sortOrder: number;
    }>;
}

class BusinessFieldService {
    private baseUrl = '/admin/business-fields';

    /**
     * Get all business fields with pagination and filters
     */
    async getBusinessFields(filters: BusinessFieldFilters = {}): Promise<BusinessFieldResponse> {
        try {
            const params = new URLSearchParams();

            if (filters.page) params.append('page', filters.page.toString());
            if (filters.limit) params.append('limit', filters.limit.toString());
            if (filters.search) params.append('search', filters.search);
            if (filters.isActive !== undefined) params.append('isActive', filters.isActive.toString());
            if (filters.isFeatured !== undefined) params.append('isFeatured', filters.isFeatured.toString());

            const response = await apiClient.get(`${this.baseUrl}?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching business fields:', error);
            throw error;
        }
    }

    /**
     * Get business field by ID
     */
    async getBusinessFieldById(id: string): Promise<SingleBusinessFieldResponse> {
        try {
            const response = await apiClient.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching business field:', error);
            throw error;
        }
    }

    /**
     * Create new business field
     */
    async createBusinessField(data: CreateBusinessFieldData): Promise<SingleBusinessFieldResponse> {
        try {
            const response = await apiClient.post(this.baseUrl, data);
            return response.data;
        } catch (error) {
            console.error('Error creating business field:', error);
            throw error;
        }
    }

    /**
     * Update business field
     */
    async updateBusinessField(id: string, data: UpdateBusinessFieldData): Promise<SingleBusinessFieldResponse> {
        try {
            const response = await apiClient.put(`${this.baseUrl}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating business field:', error);
            throw error;
        }
    }

    /**
     * Delete business field
     */
    async deleteBusinessField(id: string): Promise<{ success: boolean; message: string }> {
        try {
            const response = await apiClient.delete(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting business field:', error);
            throw error;
        }
    }

    /**
     * Update business field sort order
     */
    async updateSortOrder(sortData: BusinessFieldSortData): Promise<{ success: boolean; message: string }> {
        try {
            const response = await apiClient.put(`${this.baseUrl}/sort`, sortData);
            return response.data;
        } catch (error) {
            console.error('Error updating sort order:', error);
            throw error;
        }
    }

    /**
     * Toggle business field status
     */
    async toggleStatus(id: string): Promise<SingleBusinessFieldResponse> {
        try {
            const response = await apiClient.put(`${this.baseUrl}/${id}/toggle-status`);
            return response.data;
        } catch (error) {
            console.error('Error toggling business field status:', error);
            throw error;
        }
    }
}

export const businessFieldService = new BusinessFieldService();
