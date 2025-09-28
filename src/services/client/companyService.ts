import { api } from '../api';

// Types - Updated to include all social media platforms
export interface CompanyContactInfo {
    email: string;
    phone: string;
    address: string;
    website: string;
}

export interface CompanySocialMedia {
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
    instagram?: string;
}

export interface CompanyInfo {
    _id: string;
    section: 'general' | 'history' | 'competitiveness' | 'system' | 'partners' | 'social_activities';
    title: string;
    content: string;
    images?: string[];
    data?: {
        companyName?: string;
        foundedYear?: number;
        headquarters?: string;
        contactInfo?: CompanyContactInfo;
        socialMedia?: CompanySocialMedia;
        mission?: string;
        vision?: string;
        values?: string[];
        milestones?: Array<{
            year: string;
            event: string;
            description?: string;
        }>;
        strengths?: Array<{
            title: string;
            description: string;
            icon: string;
            color: string;
        }>;
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
        partners?: Array<{
            name: string;
            type: string;
            logo?: string;
        }>;
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
    createdAt: string;
    updatedAt: string;
}

export interface CompanyResponse {
    success: boolean;
    data: CompanyInfo | CompanyInfo[];
}

// Company Service
export const companyService = {
    // Get company info by section
    getCompanyInfo: async (section?: string): Promise<CompanyInfo | CompanyInfo[]> => {
        try {
            const params = section ? `?section=${section}` : '';
            const response = await api.get(`/client/company/info${params}`);
            return response.data;
        } catch (error: unknown) {
            console.error('Error fetching company info:', error);
            const errorMessage = error instanceof Error && 'response' in error
                ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
                : 'Lỗi khi tải thông tin công ty';
            throw new Error(errorMessage || 'Lỗi khi tải thông tin công ty');
        }
    },

    // Get general company info (contact information)
    getGeneralInfo: async (): Promise<CompanyInfo> => {
        try {
            const response = await api.get('/client/company/info?section=general');
            const data = response.data;

            // Handle both single object and array responses
            if (Array.isArray(data)) {
                return data.find(item => item.section === 'general') || data[0];
            }

            return data;
        } catch (error: unknown) {
            console.error('Error fetching general company info:', error);
            const errorMessage = error instanceof Error && 'response' in error
                ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
                : 'Lỗi khi tải thông tin chung của công ty';
            throw new Error(errorMessage || 'Lỗi khi tải thông tin chung của công ty');
        }
    }
};

export default companyService;