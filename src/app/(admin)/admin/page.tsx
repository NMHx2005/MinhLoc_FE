'use client'

import React from 'react';
import {
    Box,
    Typography,
    Container,
    Breadcrumbs,
    Link,
} from '@mui/material';
import {
    Home as HomeIcon,
    Dashboard as DashboardIcon,
} from '@mui/icons-material';
import AdminLayout from '../../../components/admin/AdminLayout';
import DashboardStats from '../../../components/admin/DashboardStats';
import SimpleDashboardCharts from '../../../components/admin/SimpleDashboardCharts';

const AdminDashboard: React.FC = () => {
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
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Dashboard Tổng quan
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Chào mừng trở lại! Đây là tổng quan về hoạt động của MinhLoc Group.
                    </Typography>
                </Box>

                {/* Stats Cards */}
                <Box sx={{ mb: 4 }}>
                    <DashboardStats />
                </Box>

                {/* Charts and Analytics */}
                <Box sx={{ mb: 4 }}>
                    <SimpleDashboardCharts />
                </Box>

                {/* Recent Activity */}
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Hoạt động Gần đây
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 2,
                            p: 3,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: '#4caf50',
                                    mr: 2,
                                }}
                            />
                            <Typography variant="body2">
                                Dự án "Chung cư Green Valley" đã được cập nhật thông tin
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                                2 phút trước
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: '#2196f3',
                                    mr: 2,
                                }}
                            />
                            <Typography variant="body2">
                                Tin tức mới "Xu hướng bất động sản 2024" đã được đăng
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                                1 giờ trước
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: '#ff9800',
                                    mr: 2,
                                }}
                            />
                            <Typography variant="body2">
                                Khách hàng mới đã đăng ký nhận thông tin
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                                3 giờ trước
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: '#9c27b0',
                                    mr: 2,
                                }}
                            />
                            <Typography variant="body2">
                                Sản phẩm sâm mới đã được thêm vào danh mục
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                                5 giờ trước
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </AdminLayout>
    );
};

export default AdminDashboard;