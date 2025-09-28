import { useState, useEffect } from 'react';
import { dashboardService, type DashboardOverview, type RevenueChartData, type ProjectProgress, type TopPerformer, type RecentActivity } from '@/services/admin/dashboardService';
import { authService } from '@/services/authService';

// Custom hook for dashboard data
export const useDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dashboard data states
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [revenueChart, setRevenueChart] = useState<RevenueChartData[]>([]);
  const [projectProgress, setProjectProgress] = useState<ProjectProgress[]>([]);
  const [topPerformers, setTopPerformers] = useState<TopPerformer[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Double check authentication before making API calls
      if (!authService.isAuthenticated()) {
        console.log('useDashboard: User not authenticated during fetch, aborting...');
        setLoading(false);
        return;
      }

      // Fetch all dashboard data in parallel
      const [
        overviewResponse,
        revenueResponse,
        progressResponse,
        performersResponse,
        activityResponse
      ] = await Promise.all([
        dashboardService.getOverview(),
        dashboardService.getRevenueChart(),
        dashboardService.getProjectProgress(),
        dashboardService.getTopPerformers(),
        dashboardService.getRecentActivity()
      ]);

      // Update states
      setOverview(overviewResponse);
      setRevenueChart(revenueResponse);
      setProjectProgress(progressResponse);
      setTopPerformers(performersResponse);
      setRecentActivity(activityResponse);

    } catch (err: any) {
      // Don't clear token on API errors, just show error
      console.error('Dashboard fetch error:', err);

      // Check if it's a 401 error
      if (err.response?.status === 401) {
        console.log('useDashboard: 401 error - user not authenticated, but not clearing token');
        setError('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
      } else {
        setError(err.response?.data?.message || 'Có lỗi xảy ra khi tải dữ liệu dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  // Refresh specific data
  const refreshOverview = async () => {
    try {
      const response = await dashboardService.getOverview();
      setOverview(response);
    } catch (err) {
      console.error('Error refreshing overview:', err);
    }
  };

  const refreshRevenueChart = async (period: string = '12months') => {
    try {
      const response = await dashboardService.getRevenueChart(period);
      setRevenueChart(response);
    } catch (err) {
      console.error('Error refreshing revenue chart:', err);
    }
  };

  const refreshProjectProgress = async () => {
    try {
      const response = await dashboardService.getProjectProgress();
      setProjectProgress(response);
    } catch (err) {
      console.error('Error refreshing project progress:', err);
    }
  };

  const refreshTopPerformers = async () => {
    try {
      const response = await dashboardService.getTopPerformers();
      setTopPerformers(response);
    } catch (err) {
      console.error('Error refreshing top performers:', err);
    }
  };

  const refreshRecentActivity = async (limit: number = 10) => {
    try {
      const response = await dashboardService.getRecentActivity(limit);
      setRecentActivity(response);
    } catch (err) {
      console.error('Error refreshing recent activity:', err);
    }
  };

  // Load data on mount - only if authenticated
  useEffect(() => {
    const loadDashboardData = async () => {
      // Add small delay to ensure token is properly set
      await new Promise(resolve => setTimeout(resolve, 200));

      // Check if user is authenticated before making API calls
      if (authService.isAuthenticated()) {
        console.log('useDashboard: User authenticated, fetching dashboard data...');
        fetchDashboardData();
      } else {
        console.log('useDashboard: User not authenticated, skipping dashboard data fetch');
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return {
    // Data
    overview,
    revenueChart,
    projectProgress,
    topPerformers,
    recentActivity,

    // State
    loading,
    error,

    // Actions
    fetchDashboardData,
    refreshOverview,
    refreshRevenueChart,
    refreshProjectProgress,
    refreshTopPerformers,
    refreshRecentActivity,
  };
};

// Custom hook for individual dashboard components
export const useOverview = () => {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardService.getOverview();
      setData(response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching overview data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

export const useRevenueChart = (period: string = '12months') => {
  const [data, setData] = useState<RevenueChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardService.getRevenueChart(period);
      setData(response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching revenue chart data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [period]);

  return { data, loading, error, refetch: fetchData };
};

export const useProjectProgress = () => {
  const [data, setData] = useState<ProjectProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardService.getProjectProgress();
      setData(response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching project progress data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

export const useTopPerformers = () => {
  const [data, setData] = useState<TopPerformer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardService.getTopPerformers();
      setData(response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching top performers data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

export const useRecentActivity = (limit: number = 10) => {
  const [data, setData] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardService.getRecentActivity(limit);
      setData(response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching recent activity data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

  return { data, loading, error, refetch: fetchData };
};
