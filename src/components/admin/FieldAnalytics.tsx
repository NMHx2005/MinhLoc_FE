'use client'

import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Avatar,
    LinearProgress,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    Assessment as AssessmentIcon,
    BarChart as BarChartIcon,
    PieChart as PieChartIcon,
} from '@mui/icons-material';

const FieldAnalytics: React.FC = () => {
    const analyticsData = {
        totalProjects: 15,
        activeProjects: 12,
        completedProjects: 3,
        totalInvestment: 2500000000000,
        constructionProjects: 8,
        financeProjects: 4,
        realEstateProjects: 3,
        monthlyGrowth: 15.5,
        quarterlyGrowth: 22.3,
        yearlyGrowth: 35.7,
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Phân tích Lĩnh vực Hoạt động
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Tổng quan hiệu suất các lĩnh vực kinh doanh
                </Typography>
            </Box>

            {/* Overview Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <AssessmentIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {analyticsData.totalProjects}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tổng dự án
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'success.main' }}>
                                    <TrendingUpIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {analyticsData.activeProjects}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Dự án hoạt động
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'info.main' }}>
                                    <BarChartIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {formatCurrency(analyticsData.totalInvestment)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tổng đầu tư
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'warning.main' }}>
                                    <PieChartIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {analyticsData.yearlyGrowth}%
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tăng trưởng năm
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Field Distribution */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                Phân bố dự án theo lĩnh vực
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Xây dựng</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {analyticsData.constructionProjects} dự án
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={(analyticsData.constructionProjects / analyticsData.totalProjects) * 100}
                                    sx={{ height: 8, borderRadius: 1 }}
                                />
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Đầu tư Tài chính</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {analyticsData.financeProjects} dự án
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={(analyticsData.financeProjects / analyticsData.totalProjects) * 100}
                                    sx={{ height: 8, borderRadius: 1 }}
                                />
                            </Box>

                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Bất động sản</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {analyticsData.realEstateProjects} dự án
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={(analyticsData.realEstateProjects / analyticsData.totalProjects) * 100}
                                    sx={{ height: 8, borderRadius: 1 }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                Tăng trưởng theo thời gian
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Tăng trưởng tháng</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                                        +{analyticsData.monthlyGrowth}%
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={analyticsData.monthlyGrowth}
                                    color="success"
                                    sx={{ height: 8, borderRadius: 1 }}
                                />
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Tăng trưởng quý</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'info.main' }}>
                                        +{analyticsData.quarterlyGrowth}%
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={analyticsData.quarterlyGrowth}
                                    color="info"
                                    sx={{ height: 8, borderRadius: 1 }}
                                />
                            </Box>

                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Tăng trưởng năm</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                        +{analyticsData.yearlyGrowth}%
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={analyticsData.yearlyGrowth}
                                    color="primary"
                                    sx={{ height: 8, borderRadius: 1 }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Performance Summary */}
            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        Tóm tắt hiệu suất
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                    {Math.round((analyticsData.activeProjects / analyticsData.totalProjects) * 100)}%
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tỷ lệ dự án hoạt động
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                                    {Math.round((analyticsData.completedProjects / analyticsData.totalProjects) * 100)}%
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tỷ lệ dự án hoàn thành
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                                    {analyticsData.yearlyGrowth}%
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tăng trưởng tổng thể
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default FieldAnalytics;
