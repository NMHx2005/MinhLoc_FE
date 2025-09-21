'use client'

import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Chip,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    Business as BusinessIcon,
    AttachMoney as MoneyIcon,
    People as PeopleIcon,
} from '@mui/icons-material';

const SimpleDashboardCharts: React.FC = () => {
    // Mock data for charts
    const revenueData = [
        { month: 'Tháng 1', revenue: 12.5, projects: 3 },
        { month: 'Tháng 2', revenue: 18.2, projects: 5 },
        { month: 'Tháng 3', revenue: 22.8, projects: 7 },
        { month: 'Tháng 4', revenue: 28.5, projects: 4 },
        { month: 'Tháng 5', revenue: 35.2, projects: 6 },
        { month: 'Tháng 6', revenue: 45.2, projects: 8 },
    ];

    const recentProjects = [
        {
            name: 'Chung cư Green Valley',
            status: 'Đang bán',
            progress: 75,
            revenue: '3.5 tỷ',
            color: '#4caf50',
        },
        {
            name: 'Biệt thự Royal Garden',
            status: 'Sắp mở bán',
            progress: 45,
            revenue: '15 tỷ',
            color: '#ff9800',
        },
        {
            name: 'Tòa nhà Sky Tower',
            status: 'Hoàn thành',
            progress: 100,
            revenue: '25 tỷ',
            color: '#2196f3',
        },
        {
            name: 'Đất nền Golden Land',
            status: 'Đang bán',
            progress: 60,
            revenue: '8 tỷ',
            color: '#9c27b0',
        },
    ];

    const topPerformers = [
        { name: 'Nguyễn Văn A', sales: 12, revenue: '8.5 tỷ' },
        { name: 'Trần Thị B', sales: 10, revenue: '6.2 tỷ' },
        { name: 'Lê Văn C', sales: 8, revenue: '5.8 tỷ' },
        { name: 'Phạm Thị D', sales: 7, revenue: '4.9 tỷ' },
    ];

    return (
        <Grid container spacing={3}>
            {/* Revenue Chart */}
            <Grid item xs={12} lg={8}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <MoneyIcon sx={{ mr: 1, color: '#E7C873' }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Biểu đồ Doanh thu
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#E7C873' }}>
                                45.2 Tỷ VNĐ
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tổng doanh thu 6 tháng đầu năm
                            </Typography>
                        </Box>

                        {/* Simple Bar Chart Representation */}
                        <Box sx={{ display: 'flex', alignItems: 'end', height: 200, gap: 1 }}>
                            {revenueData.map((data, index) => (
                                <Box key={index} sx={{ flex: 1, textAlign: 'center' }}>
                                    <Box
                                        sx={{
                                            height: `${(data.revenue / 50) * 100}%`,
                                            backgroundColor: '#E7C873',
                                            borderRadius: '4px 4px 0 0',
                                            mb: 1,
                                            minHeight: 20,
                                        }}
                                    />
                                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                                        {data.month}
                                    </Typography>
                                    <Typography variant="caption" display="block" sx={{ fontSize: '0.6rem' }}>
                                        {data.revenue}T
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* Project Progress */}
            <Grid item xs={12} lg={4}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <BusinessIcon sx={{ mr: 1, color: '#E7C873' }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Tiến độ Dự án
                            </Typography>
                        </Box>

                        <List>
                            {recentProjects.map((project, index) => (
                                <ListItem key={index} sx={{ px: 0, py: 1 }}>
                                    <ListItemText
                                        primary={project.name}
                                        secondary={`${project.progress}% - ${project.status} - ${project.revenue}`}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', ml: 1 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={project.progress}
                                            sx={{
                                                width: 80,
                                                height: 6,
                                                borderRadius: 3,
                                                backgroundColor: 'rgba(0,0,0,0.1)',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: project.color,
                                                },
                                            }}
                                        />
                                        <Chip
                                            label={project.status}
                                            size="small"
                                            sx={{
                                                backgroundColor: project.color,
                                                color: 'white',
                                                fontSize: '0.7rem',
                                                mt: 0.5,
                                            }}
                                        />
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>

            {/* Top Performers */}
            <Grid item xs={12} lg={6}>
                <Card>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <PeopleIcon sx={{ mr: 1, color: '#E7C873' }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Top Nhân viên
                            </Typography>
                        </Box>

                        <List>
                            {topPerformers.map((performer, index) => (
                                <ListItem key={index} sx={{ px: 0, py: 1 }}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: '#E7C873', width: 40, height: 40 }}>
                                            {performer.name.charAt(0)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={performer.name}
                                        secondary={`${performer.sales} dự án • ${performer.revenue}`}
                                    />
                                    <Chip
                                        label={`#${index + 1}`}
                                        size="small"
                                        sx={{
                                            backgroundColor: index === 0 ? '#ffd700' : '#f0f0f0',
                                            color: index === 0 ? '#000' : '#666',
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>

            {/* Quick Stats */}
            <Grid item xs={12} lg={6}>
                <Card>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <TrendingUpIcon sx={{ mr: 1, color: '#E7C873' }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Thống kê Nhanh
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#E7C873' }}>
                                    8
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Dự án mới
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                                    156
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Sản phẩm sâm
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2196f3' }}>
                                    1,234
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lượt truy cập
                                </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                                    45
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Tin tức mới
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default SimpleDashboardCharts;
