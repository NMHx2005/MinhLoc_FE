import { api } from '../api';

export interface BusinessField {
    _id: string;
    name: string;
    description: string;
    image?: string;
    icon?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface BusinessFieldListResponse {
    success: boolean;
    data: BusinessField[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export const getBusinessFields = async (
    page: number = 1,
    limit: number = 10
): Promise<BusinessFieldListResponse> => {
    try {
        const response = await api.get(`/client/business-fields?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching business fields:', error);
        throw error;
    }
};

export const getBusinessFieldsById = async (id: string): Promise<{ success: boolean; data: BusinessField }> => {
    try {
        const response = await api.get(`/client/business-fields/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching business field by id:', error);
        throw error;
    }
};