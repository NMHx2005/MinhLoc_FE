/**
 * API Test Utilities
 * Dùng để test kết nối API và các endpoints
 */

import { dashboardApi as dashboardService } from '@/services/api';
import { api } from '@/services/api';

export const testApiConnection = async () => {
  console.log('🔍 Testing API connection...');

  try {
    // Test basic API connection
    const response = await api.get('/');
    console.log('✅ API Base connection:', response);
    return true;
  } catch (error: any) {
    console.error('❌ API Base connection failed:', error.message);
    return false;
  }
};

export const testDashboardEndpoints = async () => {
  console.log('🔍 Testing Dashboard endpoints...');

  const endpoints = [
    { name: 'Overview', fn: () => dashboardService.getOverview() },
    { name: 'Revenue Chart', fn: () => dashboardService.getRevenueChart() },
    { name: 'Project Progress', fn: () => dashboardService.getProjectProgress() },
    { name: 'Top Performers', fn: () => dashboardService.getTopPerformers() },
    { name: 'Recent Activity', fn: () => dashboardService.getRecentActivity() },
  ];

  const results = [];

  for (const endpoint of endpoints) {
    try {
      const result = await endpoint.fn();
      console.log(`✅ ${endpoint.name}:`, 'Success');
      results.push({ name: endpoint.name, success: true, data: result });
    } catch (error: any) {
      console.error(`❌ ${endpoint.name}:`, error.message);
      results.push({ name: endpoint.name, success: false, error: error.message });
    }
  }

  return results;
};

export const runAllTests = async () => {
  console.log('🚀 Running all API tests...');

  const connectionTest = await testApiConnection();

  if (!connectionTest) {
    console.log('❌ Basic connection failed, skipping dashboard tests');
    return { connection: false, dashboard: [] };
  }

  const dashboardTests = await testDashboardEndpoints();

  const summary = {
    connection: connectionTest,
    dashboard: dashboardTests,
    totalTests: dashboardTests.length,
    passedTests: dashboardTests.filter(t => t.success).length,
    failedTests: dashboardTests.filter(t => !t.success).length,
  };

  console.log('📊 Test Summary:', summary);
  return summary;
};

// Auto-run tests in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Uncomment the line below to auto-run tests on page load
  // runAllTests();
}
