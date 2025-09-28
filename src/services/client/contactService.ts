import { api } from '../api';

// Type guard for API error
interface ApiError {
    response?: {
        data?: {
            error?: string;
            message?: string;
        };
    };
}

const isApiError = (error: unknown): error is ApiError => {
    return typeof error === 'object' && error !== null && 'response' in error;
};

// Types
export interface ContactMessage {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    ipAddress?: string;
    userAgent?: string;
    source?: string;
}

export interface ConsultationRequest {
    name: string;
    email: string;
    phone: string;
    projectType: string;
    budget: string;
    location: string;
    message?: string;
    ipAddress?: string;
    userAgent?: string;
    source?: string;
}

export interface NewsletterSubscriber {
    email: string;
    name?: string;
    ipAddress?: string;
    userAgent?: string;
    source?: string;
}

export interface ContactResponse {
    success: boolean;
    message: string;
    data?: unknown;
}

// Contact Service
export const contactService = {
    // Send contact message
    sendContactMessage: async (data: ContactMessage): Promise<ContactResponse> => {
        try {
            const response = await api.post('/client/contacts/messages', data);
            return response.data;
        } catch (error: unknown) {
            console.error('Error sending contact message:', error);
            // Extract detailed error message from server response
            const serverError = isApiError(error)
                ? (error.response?.data?.error || error.response?.data?.message || 'Lỗi khi gửi tin nhắn')
                : 'Lỗi khi gửi tin nhắn';
            throw new Error(serverError);
        }
    },

    // Send consultation request
    sendConsultationRequest: async (data: ConsultationRequest): Promise<ContactResponse> => {
        try {
            const response = await api.post('/client/contacts/consultation-requests', data);
            return response.data;
        } catch (error: unknown) {
            console.error('Error sending consultation request:', error);
            const serverError = isApiError(error)
                ? (error.response?.data?.error || error.response?.data?.message || 'Lỗi khi gửi yêu cầu tư vấn')
                : 'Lỗi khi gửi yêu cầu tư vấn';
            throw new Error(serverError);
        }
    },

    // Subscribe to newsletter
    subscribeNewsletter: async (data: NewsletterSubscriber): Promise<ContactResponse> => {
        try {
            const response = await api.post('/client/contacts/newsletter-subscribers', data);
            return response.data;
        } catch (error: unknown) {
            console.error('Error subscribing to newsletter:', error);
            const serverError = isApiError(error)
                ? (error.response?.data?.error || error.response?.data?.message || 'Lỗi khi đăng ký nhận tin')
                : 'Lỗi khi đăng ký nhận tin';
            throw new Error(serverError);
        }
    },

    // Unsubscribe from newsletter
    unsubscribeNewsletter: async (email: string): Promise<ContactResponse> => {
        try {
            const response = await api.delete(`/client/contacts/newsletter-subscribers/${email}`);
            return response.data;
        } catch (error: unknown) {
            console.error('Error unsubscribing from newsletter:', error);
            const serverError = isApiError(error)
                ? (error.response?.data?.error || error.response?.data?.message || 'Lỗi khi hủy đăng ký nhận tin')
                : 'Lỗi khi hủy đăng ký nhận tin';
            throw new Error(serverError);
        }
    },

    // Verify newsletter subscription
    verifyNewsletterSubscription: async (token: string): Promise<ContactResponse> => {
        try {
            const response = await api.get(`/client/contacts/newsletter-subscribers/verify/${token}`);
            return response.data;
        } catch (error: unknown) {
            console.error('Error verifying newsletter subscription:', error);
            const serverError = isApiError(error)
                ? (error.response?.data?.error || error.response?.data?.message || 'Lỗi khi xác thực đăng ký nhận tin')
                : 'Lỗi khi xác thực đăng ký nhận tin';
            throw new Error(serverError);
        }
    }
};

export default contactService;
