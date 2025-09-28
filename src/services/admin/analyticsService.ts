import apiClient from '../api';

// Types for Analytics data
export interface AnalyticsOverview {
    totalPageViews: number;
    uniqueVisitors: number;
    bounceRate: number;
    averageSessionDuration: number;
    conversionRate: number;
    topPages: Array<{
        page: string;
        views: number;
        uniqueVisitors: number;
        bounceRate: number;
    }>;
    trafficSources: Array<{
        source: string;
        visitors: number;
        percentage: number;
    }>;
    deviceBreakdown: Array<{
        device: string;
        visitors: number;
        percentage: number;
    }>;
    locationData: Array<{
        country: string;
        visitors: number;
        percentage: number;
    }>;
}

export interface PageViewsData {
    date: string;
    views: number;
    uniqueVisitors: number;
}

export interface UniqueVisitorsData {
    date: string;
    visitors: number;
    newVisitors: number;
    returningVisitors: number;
}

export interface BounceRateData {
    date: string;
    bounceRate: number;
    pageViews: number;
}

export interface SessionDurationData {
    date: string;
    averageDuration: number;
    totalSessions: number;
}

export interface TopPagesData {
    page: string;
    views: number;
    uniqueVisitors: number;
    bounceRate: number;
    averageTimeOnPage: number;
}

export interface TrafficSourcesData {
    source: string;
    visitors: number;
    percentage: number;
    conversionRate: number;
}

export interface DeviceData {
    device: string;
    visitors: number;
    percentage: number;
    bounceRate: number;
}

export interface LocationData {
    country: string;
    visitors: number;
    percentage: number;
    bounceRate: number;
}

export interface RealTimeData {
    activeUsers: number;
    currentPage: string;
    referrer: string;
    location: string;
    device: string;
    timestamp: string;
}

export interface CustomAnalyticsParams {
    startDate?: string;
    endDate?: string;
    timeRange?: string;
    device?: string;
    source?: string;
    page?: string;
}

export interface CustomAnalyticsData {
    overview: AnalyticsOverview;
    pageViews: PageViewsData[];
    uniqueVisitors: UniqueVisitorsData[];
    bounceRate: BounceRateData[];
    sessionDuration: SessionDurationData[];
    topPages: TopPagesData[];
    trafficSources: TrafficSourcesData[];
    devices: DeviceData[];
    locations: LocationData[];
    realTime: RealTimeData[];
}

export const analyticsService = {
    // Get analytics overview
    getOverview: async (params?: CustomAnalyticsParams): Promise<AnalyticsOverview> => {
        const response = await apiClient.get('/analytics/overview', { params });
        return response.data.data;
    },

    // Get page views analytics
    getPageViews: async (params?: CustomAnalyticsParams): Promise<PageViewsData[]> => {
        const response = await apiClient.get('/analytics/page-views', { params });
        return response.data.data;
    },

    // Get unique visitors analytics
    getUniqueVisitors: async (params?: CustomAnalyticsParams): Promise<UniqueVisitorsData[]> => {
        const response = await apiClient.get('/analytics/unique-visitors', { params });
        return response.data.data;
    },

    // Get bounce rate analytics
    getBounceRate: async (params?: CustomAnalyticsParams): Promise<BounceRateData[]> => {
        const response = await apiClient.get('/analytics/bounce-rate', { params });
        return response.data.data;
    },

    // Get session duration analytics
    getSessionDuration: async (params?: CustomAnalyticsParams): Promise<SessionDurationData[]> => {
        const response = await apiClient.get('/analytics/session-duration', { params });
        return response.data.data;
    },

    // Get top pages analytics
    getTopPages: async (params?: CustomAnalyticsParams): Promise<TopPagesData[]> => {
        const response = await apiClient.get('/analytics/top-pages', { params });
        return response.data.data;
    },

    // Get traffic sources analytics
    getTrafficSources: async (params?: CustomAnalyticsParams): Promise<TrafficSourcesData[]> => {
        const response = await apiClient.get('/analytics/traffic-sources', { params });
        return response.data.data;
    },

    // Get device analytics
    getDevices: async (params?: CustomAnalyticsParams): Promise<DeviceData[]> => {
        const response = await apiClient.get('/analytics/devices', { params });
        return response.data.data;
    },

    // Get location analytics
    getLocations: async (params?: CustomAnalyticsParams): Promise<LocationData[]> => {
        const response = await apiClient.get('/analytics/locations', { params });
        return response.data.data;
    },

    // Get real-time analytics
    getRealTime: async (): Promise<RealTimeData[]> => {
        const response = await apiClient.get('/analytics/real-time');
        return response.data.data;
    },

    // Get custom analytics with filters
    getCustomAnalytics: async (params: CustomAnalyticsParams): Promise<CustomAnalyticsData> => {
        const response = await apiClient.get('/analytics/custom', { params });
        return response.data.data;
    },

    // Track page view
    trackPageView: async (data: {
        page: string;
        referrer?: string;
        userAgent?: string;
        ip?: string;
    }): Promise<void> => {
        await apiClient.post('/analytics/track', data);
    }
};
