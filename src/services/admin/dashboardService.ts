import { api } from '@/services/api';

// Dashboard Types
export interface DashboardOverview {
    totalProjects: number;
    activeProjects: number;
    totalUsers: number;
    activeUsers: number;
    totalMessages: number;
    unreadMessages: number;
    totalSubscribers: number;
    activeSubscribers: number;
    totalRevenue: number;
    monthlyRevenue: number;
    projectProgress: {
        planning: number;
        construction: number;
        completed: number;
        soldOut: number;
    };
    recentActivity: Array<{
        _id: string;
        name: string;
        email: string;
        subject: string;
        status: string;
        createdAt: string;
    }>;
}

export interface RevenueChartData {
    month: string;
    revenue: number;
    projects: number;
}

export interface ProjectProgress {
    projectId: string;
    projectName: string;
    progress: number;
    status: string;
    completionDate: string;
}

export interface TopPerformer {
    id: string;
    name: string;
    type: 'project' | 'product' | 'news';
    performance: number;
    metric: string;
}

export interface RecentActivity {
    id: string;
    type: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    timeAgo: string;
}

// Dashboard Service
export const dashboardService = {
    // Get dashboard overview statistics
    getOverview: async (): Promise<DashboardOverview> => {
        const response = await api.get('/admin/dashboard/overview');
        return response.data.data || response.data;
    },

    // Get revenue chart data
    getRevenueChart: async (period: string = '12months'): Promise<RevenueChartData[]> => {
        const response = await api.get(`/admin/dashboard/revenue-chart?period=${period}`);
        const data = response.data.data || response.data;

        // Transform Chart.js format to our format
        if (data.labels && data.datasets && data.datasets[0]) {
            return data.labels.map((label: string, index: number) => ({
                month: label,
                revenue: data.datasets[0].data[index] || 0,
                projects: 1 // Default value since API doesn't provide this
            }));
        }

        return Array.isArray(data) ? data : [];
    },

    // Get project progress data
    getProjectProgress: async (): Promise<ProjectProgress[]> => {
        const response = await api.get('/admin/dashboard/project-progress');
        return response.data.data || response.data;
    },

    // Get top performers
    getTopPerformers: async (): Promise<TopPerformer[]> => {
        const response = await api.get('/admin/dashboard/top-performers');
        return response.data.data || response.data;
    },

    // Get recent activities
    getRecentActivity: async (limit: number = 10): Promise<RecentActivity[]> => {
        const response = await api.get(`/admin/dashboard/recent-activity?limit=${limit}`);
        return response.data.data || response.data;
    },

    // Get all dashboard data at once
    getAllDashboardData: async () => {
        const [overview, revenueChart, projectProgress, topPerformers, recentActivity] = await Promise.all([
            dashboardService.getOverview(),
            dashboardService.getRevenueChart(),
            dashboardService.getProjectProgress(),
            dashboardService.getTopPerformers(),
            dashboardService.getRecentActivity()
        ]);

        return {
            overview,
            revenueChart,
            projectProgress,
            topPerformers,
            recentActivity
        };
    }
};
