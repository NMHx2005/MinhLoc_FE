'use client'

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Breadcrumbs,
    Link,
    Alert,
    Snackbar,
} from '@mui/material';
import {
    Home as HomeIcon,
    Dashboard as DashboardIcon,
    Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../../components/admin/AdminLayout';
import AnalyticsFilters from '../../../../components/admin/AnalyticsFilters';
import TrafficChart from '../../../../components/admin/TrafficChart';
import ConversionMetrics from '../../../../components/admin/ConversionMetrics';
import UserBehavior from '../../../../components/admin/UserBehavior';

interface FilterState {
    timeRange: string;
    device: string;
    source: string;
    page: string;
}

const AnalyticsPage: React.FC = () => {
    const [filters, setFilters] = useState<FilterState>({
        timeRange: '7d',
        device: 'all',
        source: 'all',
        page: 'all',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
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
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/admin"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Dashboard
                    </Link>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AnalyticsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Analytics
                    </Box>
                </Breadcrumbs>

                {/* Page Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Phân tích Analytics
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Phân tích chi tiết traffic, conversion rate và hành vi người dùng trên website.
                    </Typography>
                </Box>

                {/* Filters */}
                <Box sx={{ mb: 4 }}>
                    <AnalyticsFilters onFilterChange={handleFilterChange} />
                </Box>

                {/* Info Alert */}
                <Alert
                    severity="info"
                    sx={{ mb: 4 }}
                    action={
                        <Typography variant="caption" color="text.secondary">
                            Dữ liệu được cập nhật mỗi 15 phút
                        </Typography>
                    }
                >
                    Đang hiển thị dữ liệu cho {filters.timeRange === '7d' ? '7 ngày qua' :
                        filters.timeRange === '30d' ? '30 ngày qua' :
                            filters.timeRange === '90d' ? '3 tháng qua' :
                                filters.timeRange === '1y' ? '1 năm qua' : 'hôm qua'}
                    {filters.device !== 'all' && ` • ${filters.device === 'desktop' ? 'Desktop' :
                        filters.device === 'mobile' ? 'Mobile' : 'Tablet'}`}
                    {filters.source !== 'all' && ` • ${filters.source === 'google' ? 'Google Search' :
                        filters.source === 'facebook' ? 'Facebook' :
                            filters.source === 'direct' ? 'Direct' :
                                filters.source === 'youtube' ? 'YouTube' : 'Khác'}`}
                </Alert>

                {/* Traffic Analysis */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        📊 Phân tích Traffic
                    </Typography>
                    <TrafficChart filters={filters} />
                </Box>

                {/* Conversion Metrics */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        🎯 Chỉ số Conversion
                    </Typography>
                    <ConversionMetrics filters={filters} />
                </Box>

                {/* User Behavior */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        👥 Hành vi Người dùng
                    </Typography>
                    <UserBehavior />
                </Box>

                {/* Key Insights */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        💡 Insights Quan trọng
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                        <Box sx={{ p: 3, backgroundColor: '#e8f5e8', borderRadius: 2, border: '1px solid #4caf50' }}>
                            <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 600, mb: 1 }}>
                                ✅ Điểm mạnh
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                • Conversion rate tăng 0.8% so với kỳ trước
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                • Trang Contact có tỷ lệ chuyển đổi cao nhất (5.5%)
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • 72% người dùng tiếp tục browse sau khi vào trang chủ
                            </Typography>
                        </Box>

                        <Box sx={{ p: 3, backgroundColor: '#fff3e0', borderRadius: 2, border: '1px solid #ff9800' }}>
                            <Typography variant="h6" sx={{ color: '#f57c00', fontWeight: 600, mb: 1 }}>
                                ⚠️ Cần cải thiện
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                • CTR giảm 0.2% - cần tối ưu CTA buttons
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                • 25% người dùng rời khỏi site trong 30 giây đầu
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • Mobile traffic chỉ chiếm 30% - cần tối ưu mobile UX
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Recommendations */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        🚀 Khuyến nghị Hành động
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                        <Box sx={{ p: 3, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                                Tối ưu Mobile
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                • Cải thiện tốc độ tải trang mobile
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                • Tối ưu form liên hệ cho mobile
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • Thêm mobile-specific CTAs
                            </Typography>
                        </Box>

                        <Box sx={{ p: 3, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#388e3c' }}>
                                Tăng Engagement
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                • Thêm interactive elements
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                • Cải thiện nội dung trang chủ
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • A/B test các CTA buttons
                            </Typography>
                        </Box>

                        <Box sx={{ p: 3, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#7b1fa2' }}>
                                Content Strategy
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                • Tạo thêm case studies
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                • Tối ưu SEO cho từ khóa chính
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • Thêm video testimonials
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Snackbar for filter changes */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    message="Bộ lọc đã được cập nhật"
                />
            </Container>
        </AdminLayout>
    );
};

export default AnalyticsPage;
