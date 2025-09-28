'use client'

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Breadcrumbs,
    Link,
    Grid,
    Card,
    CardContent,
    Fab,
    Tooltip,
    Button,
    Alert,
} from '@mui/material';
import {
    Home as HomeIcon,
    Dashboard as DashboardIcon,
    Refresh as RefreshIcon,
    TrendingUp as TrendingUpIcon,
    Assessment as AssessmentIcon,
    BugReport as TestIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../components/admin/AdminLayout';
import DashboardOverview from '../../../components/admin/DashboardOverview';
import RevenueChart from '../../../components/admin/RevenueChart';
import ProjectProgress from '../../../components/admin/ProjectProgress';
import RecentActivity from '../../../components/admin/RecentActivity';
import { useDashboard } from '../../../hooks/useDashboard';
import { runAllTests } from '../../../utils/apiTest';

const AdminDashboard: React.FC = () => {
    const { loading, error, fetchDashboardData } = useDashboard();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [testResults, setTestResults] = useState<any>(null);
    const [testing, setTesting] = useState(false);

    const handleRefreshAll = () => {
        fetchDashboardData();
    };

    const handleRunTests = async () => {
        setTesting(true);
        try {
            const results = await runAllTests();
            setTestResults(results);
        } catch (error) {
            console.error('Test failed:', error);
        } finally {
            setTesting(false);
        }
    };

    return (
        <AdminLayout>
            <Container maxWidth="xl">
                {/* Breadcrumbs */}
                <Breadcrumbs sx={{ mb: 3 }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Trang chủ
                    </Link>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Dashboard
                    </Box>
                </Breadcrumbs>

                {/* Page Header */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            🏠 Dashboard Admin
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<TestIcon />}
                            onClick={handleRunTests}
                            disabled={testing}
                            size="small"
                        >
                            {testing ? 'Testing...' : 'Test API'}
                        </Button>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        Tổng quan về hoạt động và hiệu suất của MinhLoc Group
                    </Typography>
                </Box>

                {/* Error State */}
                {error && (
                    <Card sx={{ mb: 3, bgcolor: 'error.50' }}>
                        <CardContent>
                            <Typography color="error" variant="body1">
                                ⚠️ {error}
                            </Typography>
                        </CardContent>
                    </Card>
                )}

                {/* Test Results */}
                {testResults && (
                    <Alert
                        severity={testResults.connection && testResults.passedTests === testResults.totalTests ? 'success' : 'warning'}
                        sx={{ mb: 3 }}
                    >
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            API Test Results: {testResults.passedTests}/{testResults.totalTests} passed
                        </Typography>
                        <Typography variant="body2">
                            Connection: {testResults.connection ? '✅' : '❌'} |
                            Dashboard APIs: {testResults.passedTests}/{testResults.totalTests} working
                        </Typography>
                    </Alert>
                )}

                {/* Dashboard Overview */}
                <DashboardOverview />

                {/* Main Dashboard Grid */}
                <Grid container spacing={3}>
                    {/* Revenue Chart - Takes 2/3 of the width */}
                    <Grid item xs={12} lg={8}>
                        <RevenueChart height={350} />
                    </Grid>

                    {/* Recent Activity - Takes 1/3 of the width */}
                    <Grid item xs={12} lg={4}>
                        <RecentActivity />
                    </Grid>

                    {/* Project Progress - Full width */}
                    <Grid item xs={12}>
                        <ProjectProgress />
                    </Grid>
                </Grid>

                {/* Quick Stats Cards */}
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ textAlign: 'center', py: 2 }}>
                            <CardContent>
                                <AssessmentIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                <Typography variant="h6" color="primary">
                                    Tổng quan
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Dữ liệu tổng hợp
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ textAlign: 'center', py: 2 }}>
                            <CardContent>
                                <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                                <Typography variant="h6" color="success.main">
                                    Tăng trưởng
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Xu hướng phát triển
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ textAlign: 'center', py: 2 }}>
                            <CardContent>
                                <DashboardIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                                <Typography variant="h6" color="warning.main">
                                    Hiệu suất
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Chỉ số hiệu quả
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ textAlign: 'center', py: 2 }}>
                            <CardContent>
                                <RefreshIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                                <Typography variant="h6" color="info.main">
                                    Cập nhật
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Dữ liệu realtime
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Floating Action Button for Refresh */}
                <Tooltip title={loading ? "Đang tải..." : "Làm mới tất cả dữ liệu"}>
                    <span>
                        <Fab
                            color="primary"
                            aria-label="refresh"
                            sx={{
                                position: 'fixed',
                                bottom: 16,
                                right: 16,
                                zIndex: 1000,
                            }}
                            onClick={handleRefreshAll}
                            disabled={loading}
                        >
                            <RefreshIcon />
                        </Fab>
                    </span>
                </Tooltip>
            </Container>
        </AdminLayout>
    );
};

export default AdminDashboard;