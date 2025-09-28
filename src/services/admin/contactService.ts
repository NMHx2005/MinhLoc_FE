import apiClient from '../api';

// Contact Message Types
export interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: 'new' | 'in_progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    assignedTo?: string;
    assignedUser?: {
        _id: string;
        name: string;
        email: string;
    };
    tags: string[];
    source: string;
    ipAddress: string;
    userAgent: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateContactMessageData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    tags?: string[];
}

export interface UpdateContactMessageData {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
    status?: 'new' | 'in_progress' | 'resolved' | 'closed';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    assignedTo?: string;
    tags?: string[];
}

// Newsletter Subscriber Types
export interface NewsletterSubscriber {
    _id: string;
    email: string;
    name?: string;
    status: 'active' | 'unsubscribed' | 'bounced';
    source: string;
    subscribedAt: string;
    unsubscribedAt?: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateNewsletterSubscriberData {
    email: string;
    name?: string;
    source?: string;
    tags?: string[];
}

// Newsletter Campaign Types
export interface NewsletterCampaign {
    _id: string;
    name: string;
    subject: string;
    content: string;
    status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
    scheduledAt?: string;
    sentAt?: string;
    recipientCount: number;
    openCount: number;
    clickCount: number;
    unsubscribeCount: number;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateNewsletterCampaignData {
    name: string;
    subject: string;
    content: string;
    scheduledAt?: string;
    tags?: string[];
}

// Consultation Request Types
export interface ConsultationRequest {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    projectType: string;
    budget?: string;
    timeline?: string;
    message: string;
    status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    assignedTo?: string;
    assignedUser?: {
        _id: string;
        name: string;
        email: string;
    };
    scheduledAt?: string;
    source: string;
    ipAddress: string;
    userAgent: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateConsultationRequestData {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    projectType: string;
    budget?: string;
    timeline?: string;
    message: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export interface UpdateConsultationRequestData {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    projectType?: string;
    budget?: string;
    timeline?: string;
    message?: string;
    status?: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    assignedTo?: string;
    scheduledAt?: string;
}

// Contact Service
export const contactService = {
    // Contact Messages
    getContactMessages: async (params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        priority?: string;
        assignedTo?: string;
    }): Promise<{ messages: ContactMessage[]; total: number; page: number; limit: number }> => {
        const response = await apiClient.get('/admin/contacts/messages', { params });
        const data = response.data;

        if (data.success && data.data) {
            return {
                messages: data.data || [],
                total: data.pagination?.total || 0,
                page: data.pagination?.page || 1,
                limit: data.pagination?.limit || 10
            };
        }

        return {
            messages: data?.messages || data?.data || [],
            total: data?.total || data?.pagination?.total || 0,
            page: data?.page || data?.pagination?.page || 1,
            limit: data?.limit || data?.pagination?.limit || 10
        };
    },

    getContactMessageById: async (id: string): Promise<ContactMessage> => {
        const response = await apiClient.get(`/admin/contacts/messages/${id}`);
        const data = response.data;

        if (data.success && data.data) {
            return data.data;
        }

        return data.data || data;
    },

    createContactMessage: async (messageData: CreateContactMessageData): Promise<ContactMessage> => {
        const response = await apiClient.post('/admin/contacts/messages', messageData);
        const data = response.data;

        if (data.success && data.data) {
            return data.data;
        }

        return data.data || data;
    },

    updateContactMessage: async (id: string, messageData: UpdateContactMessageData): Promise<ContactMessage> => {
        const response = await apiClient.put(`/admin/contacts/messages/${id}`, messageData);
        const data = response.data;

        if (data.success && data.data) {
            return data.data;
        }

        return data.data || data;
    },

    deleteContactMessage: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/contacts/messages/${id}`);
    },

    updateContactMessageStatus: async (id: string, status: string): Promise<ContactMessage> => {
        const response = await apiClient.put(`/admin/contacts/messages/${id}/status`, { status });
        const data = response.data;

        if (data.success && data.data) {
            return data.data;
        }

        return data.data || data;
    },

    // Newsletter Subscribers
    getNewsletterSubscribers: async (params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
    }): Promise<{ subscribers: NewsletterSubscriber[]; total: number; page: number; limit: number }> => {
        const response = await apiClient.get('/admin/contacts/newsletter-subscribers', { params });
        const data = response.data;

        if (data.success && data.data) {
            return {
                subscribers: data.data || [],
                total: data.pagination?.total || 0,
                page: data.pagination?.page || 1,
                limit: data.pagination?.limit || 10
            };
        }

        return {
            subscribers: data?.subscribers || data?.data || [],
            total: data?.total || data?.pagination?.total || 0,
            page: data?.page || data?.pagination?.page || 1,
            limit: data?.limit || data?.pagination?.limit || 10
        };
    },

    createNewsletterSubscriber: async (subscriberData: CreateNewsletterSubscriberData): Promise<NewsletterSubscriber> => {
        const response = await apiClient.post('/admin/contacts/newsletter-subscribers', subscriberData);
        const data = response.data;

        if (data.success && data.data) {
            return data.data;
        }

        return data.data || data;
    },

    deleteNewsletterSubscriber: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/contacts/newsletter-subscribers/${id}`);
    },

    // Newsletter Campaigns
    getNewsletterCampaigns: async (params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
    }): Promise<{ campaigns: NewsletterCampaign[]; total: number; page: number; limit: number }> => {
        const response = await apiClient.get('/admin/contacts/newsletter-campaigns', { params });
        const data = response.data;

        if (data.success && data.data) {
            return {
                campaigns: data.data || [],
                total: data.pagination?.total || 0,
                page: data.pagination?.page || 1,
                limit: data.pagination?.limit || 10
            };
        }

        return {
            campaigns: data?.campaigns || data?.data || [],
            total: data?.total || data?.pagination?.total || 0,
            page: data?.page || data?.pagination?.page || 1,
            limit: data?.limit || data?.pagination?.limit || 10
        };
    },

    createNewsletterCampaign: async (campaignData: CreateNewsletterCampaignData): Promise<NewsletterCampaign> => {
        const response = await apiClient.post('/admin/contacts/newsletter-campaigns', campaignData);
        const data = response.data;

        if (data.success && data.data) {
            return data.data;
        }

        return data.data || data;
    },

    sendNewsletterCampaign: async (id: string): Promise<void> => {
        await apiClient.post(`/admin/contacts/newsletter-campaigns/${id}/send`);
    },

    // Consultation Requests
    getConsultationRequests: async (params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        priority?: string;
        assignedTo?: string;
    }): Promise<{ requests: ConsultationRequest[]; total: number; page: number; limit: number }> => {
        const response = await apiClient.get('/admin/contacts/consultation-requests', { params });
        const data = response.data;

        if (data.success && data.data) {
            return {
                requests: data.data || [],
                total: data.pagination?.total || 0,
                page: data.pagination?.page || 1,
                limit: data.pagination?.limit || 10
            };
        }

        return {
            requests: data?.requests || data?.data || [],
            total: data?.total || data?.pagination?.total || 0,
            page: data?.page || data?.pagination?.page || 1,
            limit: data?.limit || data?.pagination?.limit || 10
        };
    },

    getConsultationRequestById: async (id: string): Promise<ConsultationRequest> => {
        const response = await apiClient.get(`/admin/contacts/consultation-requests/${id}`);
        const data = response.data;

        if (data.success && data.data) {
            return data.data;
        }

        return data.data || data;
    },

    createConsultationRequest: async (requestData: CreateConsultationRequestData): Promise<ConsultationRequest> => {
        const response = await apiClient.post('/admin/contacts/consultation-requests', requestData);
        const data = response.data;

        if (data.success && data.data) {
            return data.data;
        }

        return data.data || data;
    },

    updateConsultationRequest: async (id: string, requestData: UpdateConsultationRequestData): Promise<ConsultationRequest> => {
        const response = await apiClient.put(`/admin/contacts/consultation-requests/${id}`, requestData);
        const data = response.data;

        if (data.success && data.data) {
            return data.data;
        }

        return data.data || data;
    },

    assignConsultationRequest: async (id: string, assignedTo: string): Promise<ConsultationRequest> => {
        const response = await apiClient.patch(`/admin/contacts/consultation-requests/${id}/assign`, { assignedTo });
        const data = response.data;

        if (data.success && data.data) {
            return data.data;
        }

        return data.data || data;
    },

    updateConsultationRequestStatus: async (id: string, status: string): Promise<ConsultationRequest> => {
        const response = await apiClient.patch(`/admin/contacts/consultation-requests/${id}/status`, { status });
        const data = response.data;

        if (data.success && data.data) {
            return data.data;
        }

        return data.data || data;
    }
};
