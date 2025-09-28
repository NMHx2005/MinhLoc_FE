import { api } from '../api';

// Types
export interface GeneralSettings {
    sitename: string;
    sitedescription: string;
    siteurl: string;
    site_logo?: string;
    favicon?: string;
    contactemail: string;
    contactphone: string;
    address: string;
    timezone: string;
    language: string;
    currency: string;
    dateformat: string;
    timeformat: string;
    maintenancemode: boolean;
    maintenancemessage?: string;
    allowregistration: boolean;
    requireemailverification: boolean;
    defaultlanguage: string;
}

export interface APISettings {
    enableApi: boolean;
    apiVersion: string;
    rateLimit: {
        requests: number;
        window: number;
    };
    cors: {
        enabled: boolean;
        origins: string[];
    };
    authentication: {
        jwtSecret: string;
        jwtExpiresIn: string;
        refreshTokenExpiresIn: string;
    };
}

export interface ApiKey {
    _id: string;
    name: string;
    key: string;
    permissions: string[];
    isActive: boolean;
    lastUsed?: string;
    createdAt: string;
    expiresAt?: string;
}

export interface EmailSettings {
    provider: 'smtp' | 'sendgrid' | 'mailgun' | 'ses';
    smtp?: {
        host: string;
        port: number;
        secure: boolean;
        username: string;
        password: string;
    };
    sendgrid?: {
        apiKey: string;
    };
    mailgun?: {
        apiKey: string;
        domain: string;
    };
    ses?: {
        accessKeyId: string;
        secretAccessKey: string;
        region: string;
    };
    fromEmail: string;
    fromName: string;
    replyToEmail: string;
    testEmail: string;
}

export interface EmailTemplate {
    _id: string;
    name: string;
    subject: string;
    content: string;
    variables: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface SocialSettings {
    enableSocialLogin: boolean;
    facebook?: {
        appId: string;
        appSecret: string;
    };
    google?: {
        clientId: string;
        clientSecret: string;
    };
    twitter?: {
        consumerKey: string;
        consumerSecret: string;
    };
    linkedin?: {
        clientId: string;
        clientSecret: string;
    };
}

export interface SocialLink {
    _id: string;
    platform: string;
    url: string;
    icon: string;
    isActive: boolean;
    order: number;
}

// Settings API calls
export const settingsService = {
    // General Settings
    getGeneralSettings: async (): Promise<GeneralSettings> => {
        try {
            const response = await api.get<GeneralSettings>('/admin/settings/general');
            return response.data || {} as GeneralSettings;
        } catch (error) {
            console.error('Error fetching general settings:', error);
            throw error;
        }
    },

    updateGeneralSettings: async (data: Partial<GeneralSettings>): Promise<GeneralSettings> => {
        try {
            const response = await api.put<GeneralSettings>('/admin/settings/general', data);
            return response.data || {} as GeneralSettings;
        } catch (error) {
            console.error('Error updating general settings:', error);
            throw error;
        }
    },

    uploadLogo: async (file: File): Promise<{ url: string }> => {
        try {
            const formData = new FormData();
            formData.append('logo', file);
            const response = await api.post<{ url: string }>('/admin/settings/upload-logo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data || { url: '' };
        } catch (error) {
            console.error('Error uploading logo:', error);
            throw error;
        }
    },

    uploadFavicon: async (file: File): Promise<{ url: string }> => {
        try {
            const formData = new FormData();
            formData.append('favicon', file);
            const response = await api.post<{ url: string }>('/admin/settings/upload-favicon', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data || { url: '' };
        } catch (error) {
            console.error('Error uploading favicon:', error);
            throw error;
        }
    },

    // API Settings
    getApiSettings: async (): Promise<APISettings> => {
        try {
            const response = await api.get<APISettings>('/admin/settings/api');
            return response.data || {} as APISettings;
        } catch (error) {
            console.error('Error fetching API settings:', error);
            throw error;
        }
    },

    updateApiSettings: async (data: Partial<APISettings>): Promise<APISettings> => {
        try {
            const response = await api.put<APISettings>('/admin/settings/api', data);
            return response.data || {} as APISettings;
        } catch (error) {
            console.error('Error updating API settings:', error);
            throw error;
        }
    },

    getApiKeys: async (): Promise<ApiKey[]> => {
        try {
            const response = await api.get<ApiKey[]>('/admin/settings/api-keys');
            return response.data || [];
        } catch (error) {
            console.error('Error fetching API keys:', error);
            throw error;
        }
    },

    createApiKey: async (data: { name: string; permissions: string[]; expiresAt?: string }): Promise<ApiKey> => {
        try {
            const response = await api.post<ApiKey>('/admin/settings/api-keys', data);
            return response.data || {} as ApiKey;
        } catch (error) {
            console.error('Error creating API key:', error);
            throw error;
        }
    },

    deleteApiKey: async (id: string): Promise<void> => {
        try {
            await api.delete(`/admin/settings/api-keys/${id}`);
        } catch (error) {
            console.error('Error deleting API key:', error);
            throw error;
        }
    },

    testApiConnection: async (): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await api.post<{ success: boolean; message: string }>('/admin/settings/api-keys/test');
            return response.data || { success: false, message: 'Unknown error' };
        } catch (error) {
            console.error('Error testing API connection:', error);
            throw error;
        }
    },

    // Email Settings
    getEmailSettings: async (): Promise<EmailSettings> => {
        try {
            const response = await api.get<EmailSettings>('/admin/settings/email');
            return response.data || {} as EmailSettings;
        } catch (error) {
            console.error('Error fetching email settings:', error);
            throw error;
        }
    },

    updateEmailSettings: async (data: Partial<EmailSettings>): Promise<EmailSettings> => {
        try {
            const response = await api.put<EmailSettings>('/admin/settings/email', data);
            return response.data || {} as EmailSettings;
        } catch (error) {
            console.error('Error updating email settings:', error);
            throw error;
        }
    },

    getEmailTemplates: async (): Promise<EmailTemplate[]> => {
        try {
            const response = await api.get<EmailTemplate[]>('/admin/settings/email-templates');
            return response.data || [];
        } catch (error) {
            console.error('Error fetching email templates:', error);
            throw error;
        }
    },

    createEmailTemplate: async (data: { name: string; subject: string; content: string; variables: string[] }): Promise<EmailTemplate> => {
        try {
            const response = await api.post<EmailTemplate>('/admin/settings/email-templates', data);
            return response.data || {} as EmailTemplate;
        } catch (error) {
            console.error('Error creating email template:', error);
            throw error;
        }
    },

    updateEmailTemplate: async (id: string, data: Partial<EmailTemplate>): Promise<EmailTemplate> => {
        try {
            const response = await api.put<EmailTemplate>(`/admin/settings/email-templates/${id}`, data);
            return response.data || {} as EmailTemplate;
        } catch (error) {
            console.error('Error updating email template:', error);
            throw error;
        }
    },

    deleteEmailTemplate: async (id: string): Promise<void> => {
        try {
            await api.delete(`/admin/settings/email-templates/${id}`);
        } catch (error) {
            console.error('Error deleting email template:', error);
            throw error;
        }
    },

    testEmailSending: async (): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await api.post<{ success: boolean; message: string }>('/admin/settings/email/test');
            return response.data || { success: false, message: 'Unknown error' };
        } catch (error) {
            console.error('Error testing email sending:', error);
            throw error;
        }
    },

    // Social Settings
    getSocialSettings: async (): Promise<SocialSettings> => {
        try {
            const response = await api.get<SocialSettings>('/admin/settings/social');
            return response.data || {} as SocialSettings;
        } catch (error) {
            console.error('Error fetching social settings:', error);
            throw error;
        }
    },

    updateSocialSettings: async (data: Partial<SocialSettings>): Promise<SocialSettings> => {
        try {
            const response = await api.put<SocialSettings>('/admin/settings/social', data);
            return response.data || {} as SocialSettings;
        } catch (error) {
            console.error('Error updating social settings:', error);
            throw error;
        }
    },

    getSocialLinks: async (): Promise<SocialLink[]> => {
        try {
            const response = await api.get<SocialLink[]>('/admin/settings/social-links');
            return response.data || [];
        } catch (error) {
            console.error('Error fetching social links:', error);
            throw error;
        }
    },

    createSocialLink: async (data: { platform: string; url: string; icon: string; order: number }): Promise<SocialLink> => {
        try {
            const response = await api.post<SocialLink>('/admin/settings/social-links', data);
            return response.data || {} as SocialLink;
        } catch (error) {
            console.error('Error creating social link:', error);
            throw error;
        }
    },

    updateSocialLink: async (id: string, data: Partial<SocialLink>): Promise<SocialLink> => {
        try {
            const response = await api.put<SocialLink>(`/admin/settings/social-links/${id}`, data);
            return response.data || {} as SocialLink;
        } catch (error) {
            console.error('Error updating social link:', error);
            throw error;
        }
    },

    deleteSocialLink: async (id: string): Promise<void> => {
        try {
            await api.delete(`/admin/settings/social-links/${id}`);
        } catch (error) {
            console.error('Error deleting social link:', error);
            throw error;
        }
    },
};

export default settingsService;