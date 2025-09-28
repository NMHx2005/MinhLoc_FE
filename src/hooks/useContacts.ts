import { useState, useEffect, useCallback } from 'react';
import {
    contactService,
    type ContactMessage,
    type NewsletterSubscriber,
    type NewsletterCampaign,
    type ConsultationRequest,
    type CreateContactMessageData,
    type UpdateContactMessageData,
    type CreateNewsletterSubscriberData,
    type CreateNewsletterCampaignData,
    type CreateConsultationRequestData,
    type UpdateConsultationRequestData
} from '../services/admin/contactService';

// Hook for managing contact messages
export const useContactMessages = (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    priority?: string;
    assignedTo?: string;
}) => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(params?.page || 1);
    const [limit, setLimit] = useState(params?.limit || 10);

    const fetchMessages = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await contactService.getContactMessages({
                page,
                limit,
                search: params?.search,
                status: params?.status,
                priority: params?.priority,
                assignedTo: params?.assignedTo
            });
            setMessages(response.messages);
            setTotal(response.total);
            setPage(response.page);
            setLimit(response.limit);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải danh sách tin nhắn';
            setError(errorMessage);
            console.error('Contact messages fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [page, limit, params?.search, params?.status, params?.priority, params?.assignedTo]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    const createMessage = async (messageData: CreateContactMessageData) => {
        try {
            const newMessage = await contactService.createContactMessage(messageData);
            await fetchMessages();
            return newMessage;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo tin nhắn';
            setError(errorMessage);
            throw err;
        }
    };

    const updateMessage = async (id: string, messageData: UpdateContactMessageData) => {
        try {
            const updatedMessage = await contactService.updateContactMessage(id, messageData);
            await fetchMessages();
            return updatedMessage;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật tin nhắn';
            setError(errorMessage);
            throw err;
        }
    };

    const deleteMessage = async (id: string) => {
        try {
            await contactService.deleteContactMessage(id);
            await fetchMessages();
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa tin nhắn';
            setError(errorMessage);
            throw err;
        }
    };

    const updateMessageStatus = async (id: string, status: string) => {
        try {
            const updatedMessage = await contactService.updateContactMessageStatus(id, status);
            await fetchMessages();
            return updatedMessage;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật trạng thái';
            setError(errorMessage);
            throw err;
        }
    };

    return {
        messages,
        loading,
        error,
        total,
        page,
        limit,
        setPage,
        setLimit,
        fetchMessages,
        createMessage,
        updateMessage,
        deleteMessage,
        updateMessageStatus
    };
};

// Hook for managing newsletter subscribers
export const useNewsletterSubscribers = (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}) => {
    const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(params?.page || 1);
    const [limit, setLimit] = useState(params?.limit || 10);

    const fetchSubscribers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await contactService.getNewsletterSubscribers({
                page,
                limit,
                search: params?.search,
                status: params?.status
            });
            setSubscribers(response.subscribers);
            setTotal(response.total);
            setPage(response.page);
            setLimit(response.limit);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải danh sách đăng ký';
            setError(errorMessage);
            console.error('Newsletter subscribers fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [page, limit, params?.search, params?.status]);

    useEffect(() => {
        fetchSubscribers();
    }, [fetchSubscribers]);

    const createSubscriber = async (subscriberData: CreateNewsletterSubscriberData) => {
        try {
            const newSubscriber = await contactService.createNewsletterSubscriber(subscriberData);
            await fetchSubscribers();
            return newSubscriber;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo đăng ký';
            setError(errorMessage);
            throw err;
        }
    };

    const deleteSubscriber = async (id: string) => {
        try {
            await contactService.deleteNewsletterSubscriber(id);
            await fetchSubscribers();
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa đăng ký';
            setError(errorMessage);
            throw err;
        }
    };

    return {
        subscribers,
        loading,
        error,
        total,
        page,
        limit,
        setPage,
        setLimit,
        fetchSubscribers,
        createSubscriber,
        deleteSubscriber
    };
};

// Hook for managing newsletter campaigns
export const useNewsletterCampaigns = (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}) => {
    const [campaigns, setCampaigns] = useState<NewsletterCampaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(params?.page || 1);
    const [limit, setLimit] = useState(params?.limit || 10);

    const fetchCampaigns = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await contactService.getNewsletterCampaigns({
                page,
                limit,
                search: params?.search,
                status: params?.status
            });
            setCampaigns(response.campaigns);
            setTotal(response.total);
            setPage(response.page);
            setLimit(response.limit);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải danh sách chiến dịch';
            setError(errorMessage);
            console.error('Newsletter campaigns fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [page, limit, params?.search, params?.status]);

    useEffect(() => {
        fetchCampaigns();
    }, [fetchCampaigns]);

    const createCampaign = async (campaignData: CreateNewsletterCampaignData) => {
        try {
            const newCampaign = await contactService.createNewsletterCampaign(campaignData);
            await fetchCampaigns();
            return newCampaign;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo chiến dịch';
            setError(errorMessage);
            throw err;
        }
    };

    const sendCampaign = async (id: string) => {
        try {
            await contactService.sendNewsletterCampaign(id);
            await fetchCampaigns();
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi gửi chiến dịch';
            setError(errorMessage);
            throw err;
        }
    };

    return {
        campaigns,
        loading,
        error,
        total,
        page,
        limit,
        setPage,
        setLimit,
        fetchCampaigns,
        createCampaign,
        sendCampaign
    };
};

// Hook for managing consultation requests
export const useConsultationRequests = (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    priority?: string;
    assignedTo?: string;
}) => {
    const [requests, setRequests] = useState<ConsultationRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(params?.page || 1);
    const [limit, setLimit] = useState(params?.limit || 10);

    const fetchRequests = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await contactService.getConsultationRequests({
                page,
                limit,
                search: params?.search,
                status: params?.status,
                priority: params?.priority,
                assignedTo: params?.assignedTo
            });
            setRequests(response.requests);
            setTotal(response.total);
            setPage(response.page);
            setLimit(response.limit);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải danh sách yêu cầu tư vấn';
            setError(errorMessage);
            console.error('Consultation requests fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [page, limit, params?.search, params?.status, params?.priority, params?.assignedTo]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const createRequest = async (requestData: CreateConsultationRequestData) => {
        try {
            const newRequest = await contactService.createConsultationRequest(requestData);
            await fetchRequests();
            return newRequest;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo yêu cầu tư vấn';
            setError(errorMessage);
            throw err;
        }
    };

    const updateRequest = async (id: string, requestData: UpdateConsultationRequestData) => {
        try {
            const updatedRequest = await contactService.updateConsultationRequest(id, requestData);
            await fetchRequests();
            return updatedRequest;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật yêu cầu tư vấn';
            setError(errorMessage);
            throw err;
        }
    };

    const assignRequest = async (id: string, assignedTo: string) => {
        try {
            const updatedRequest = await contactService.assignConsultationRequest(id, assignedTo);
            await fetchRequests();
            return updatedRequest;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi phân công yêu cầu';
            setError(errorMessage);
            throw err;
        }
    };

    const updateRequestStatus = async (id: string, status: string) => {
        try {
            const updatedRequest = await contactService.updateConsultationRequestStatus(id, status);
            await fetchRequests();
            return updatedRequest;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật trạng thái';
            setError(errorMessage);
            throw err;
        }
    };

    return {
        requests,
        loading,
        error,
        total,
        page,
        limit,
        setPage,
        setLimit,
        fetchRequests,
        createRequest,
        updateRequest,
        assignRequest,
        updateRequestStatus
    };
};