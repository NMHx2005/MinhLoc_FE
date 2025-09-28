import { useState, useCallback, useEffect } from 'react';
import { settingsService } from '../services/admin/settingsService';
import type {
    GeneralSettings,
    UpdateGeneralSettingsData,
    APISettings,
    UpdateAPISettingsData,
    APIKey,
    CreateAPIKeyData,
    EmailSettings,
    UpdateEmailSettingsData,
    EmailTemplate,
    CreateEmailTemplateData,
    UpdateEmailTemplateData,
    SocialSettings,
    UpdateSocialSettingsData,
    SocialLink,
    CreateSocialLinkData,
    UpdateSocialLinkData,
} from '../services/admin/settingsService';

// General Settings Hook
export const useGeneralSettings = () => {
    const [settings, setSettings] = useState<GeneralSettings | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSettings = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.getGeneralSettings();
            setSettings(data);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải cài đặt chung';
            setError(errorMessage);
            console.error('General settings fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateSettings = useCallback(async (settingsData: UpdateGeneralSettingsData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.updateGeneralSettings(settingsData);
            setSettings(data);
            return data;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật cài đặt';
            setError(errorMessage);
            console.error('General settings update error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadLogo = useCallback(async (file: File) => {
        try {
            setLoading(true);
            setError(null);
            const result = await settingsService.uploadLogo(file);
            if (settings) {
                setSettings({ ...settings, logo: result.logo });
            }
            return result;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải lên logo';
            setError(errorMessage);
            console.error('Logo upload error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [settings]);

    const uploadFavicon = useCallback(async (file: File) => {
        try {
            setLoading(true);
            setError(null);
            const result = await settingsService.uploadFavicon(file);
            if (settings) {
                setSettings({ ...settings, favicon: result.favicon });
            }
            return result;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải lên favicon';
            setError(errorMessage);
            console.error('Favicon upload error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [settings]);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    return {
        settings,
        loading,
        error,
        fetchSettings,
        updateSettings,
        uploadLogo,
        uploadFavicon,
    };
};

// API Settings Hook
export const useAPISettings = () => {
    const [settings, setSettings] = useState<APISettings | null>(null);
    const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSettings = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.getAPISettings();
            setSettings(data);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải cài đặt API';
            setError(errorMessage);
            console.error('API settings fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAPIKeys = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.getAPIKeys();
            setApiKeys(data);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải danh sách API keys';
            setError(errorMessage);
            console.error('API keys fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateSettings = useCallback(async (settingsData: UpdateAPISettingsData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.updateAPISettings(settingsData);
            setSettings(data);
            return data;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật cài đặt API';
            setError(errorMessage);
            console.error('API settings update error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const createAPIKey = useCallback(async (keyData: CreateAPIKeyData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.createAPIKey(keyData);
            setApiKeys(prev => [...prev, data]);
            return data;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo API key';
            setError(errorMessage);
            console.error('API key creation error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteAPIKey = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            await settingsService.deleteAPIKey(id);
            setApiKeys(prev => prev.filter(key => key._id !== id));
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa API key';
            setError(errorMessage);
            console.error('API key deletion error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const testAPIConnection = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await settingsService.testAPIConnection();
            return result;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi test kết nối API';
            setError(errorMessage);
            console.error('API connection test error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
        fetchAPIKeys();
    }, [fetchSettings, fetchAPIKeys]);

    return {
        settings,
        apiKeys,
        loading,
        error,
        fetchSettings,
        fetchAPIKeys,
        updateSettings,
        createAPIKey,
        deleteAPIKey,
        testAPIConnection,
    };
};

// Email Settings Hook
export const useEmailSettings = () => {
    const [settings, setSettings] = useState<EmailSettings | null>(null);
    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSettings = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.getEmailSettings();
            setSettings(data);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải cài đặt email';
            setError(errorMessage);
            console.error('Email settings fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchTemplates = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.getEmailTemplates();
            setTemplates(data);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải danh sách template';
            setError(errorMessage);
            console.error('Email templates fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateSettings = useCallback(async (settingsData: UpdateEmailSettingsData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.updateEmailSettings(settingsData);
            setSettings(data);
            return data;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật cài đặt email';
            setError(errorMessage);
            console.error('Email settings update error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const createTemplate = useCallback(async (templateData: CreateEmailTemplateData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.createEmailTemplate(templateData);
            setTemplates(prev => [...prev, data]);
            return data;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo template';
            setError(errorMessage);
            console.error('Email template creation error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateTemplate = useCallback(async (id: string, templateData: UpdateEmailTemplateData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.updateEmailTemplate(id, templateData);
            setTemplates(prev => prev.map(template => template._id === id ? data : template));
            return data;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật template';
            setError(errorMessage);
            console.error('Email template update error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteTemplate = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            await settingsService.deleteEmailTemplate(id);
            setTemplates(prev => prev.filter(template => template._id !== id));
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa template';
            setError(errorMessage);
            console.error('Email template deletion error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const testEmailSending = useCallback(async (toEmail: string) => {
        try {
            setLoading(true);
            setError(null);
            const result = await settingsService.testEmailSending(toEmail);
            return result;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi test gửi email';
            setError(errorMessage);
            console.error('Email sending test error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
        fetchTemplates();
    }, [fetchSettings, fetchTemplates]);

    return {
        settings,
        templates,
        loading,
        error,
        fetchSettings,
        fetchTemplates,
        updateSettings,
        createTemplate,
        updateTemplate,
        deleteTemplate,
        testEmailSending,
    };
};

// Social Settings Hook
export const useSocialSettings = () => {
    const [settings, setSettings] = useState<SocialSettings | null>(null);
    const [links, setLinks] = useState<SocialLink[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSettings = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.getSocialSettings();
            setSettings(data);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải cài đặt mạng xã hội';
            setError(errorMessage);
            console.error('Social settings fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchLinks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.getSocialLinks();
            setLinks(data);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải danh sách liên kết';
            setError(errorMessage);
            console.error('Social links fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateSettings = useCallback(async (settingsData: UpdateSocialSettingsData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.updateSocialSettings(settingsData);
            setSettings(data);
            return data;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật cài đặt mạng xã hội';
            setError(errorMessage);
            console.error('Social settings update error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const createLink = useCallback(async (linkData: CreateSocialLinkData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.createSocialLink(linkData);
            setLinks(prev => [...prev, data]);
            return data;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo liên kết';
            setError(errorMessage);
            console.error('Social link creation error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateLink = useCallback(async (id: string, linkData: UpdateSocialLinkData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await settingsService.updateSocialLink(id, linkData);
            setLinks(prev => prev.map(link => link._id === id ? data : link));
            return data;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật liên kết';
            setError(errorMessage);
            console.error('Social link update error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteLink = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            await settingsService.deleteSocialLink(id);
            setLinks(prev => prev.filter(link => link._id !== id));
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa liên kết';
            setError(errorMessage);
            console.error('Social link deletion error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
        fetchLinks();
    }, [fetchSettings, fetchLinks]);

    return {
        settings,
        links,
        loading,
        error,
        fetchSettings,
        fetchLinks,
        updateSettings,
        createLink,
        updateLink,
        deleteLink,
    };
};
