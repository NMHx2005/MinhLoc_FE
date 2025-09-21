'use client'

import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    Divider,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Visibility as ViewIcon,
    Mouse as ClickIcon,
} from '@mui/icons-material';

const ConversionMetrics: React.FC = () => {
    const conversionData = [
        {
            metric: 'Conversion Rate',
            value: '3.2%',
            change: '+0.8%',
            trend: 'up',
            color: '#4caf50',
            icon: <TrendingUpIcon />,
        },
        {
            metric: 'Lead Generation',
            value: '156',
            change: '+12%',
            trend: 'up',
            color: '#2196f3',
            icon: <EmailIcon />,
        },
        {
            metric: 'Contact Forms',
            value: '89',
            change: '+5.2%',
            trend: 'up',
            color: '#ff9800',
            icon: <PhoneIcon />,
        },
        {
            metric: 'Page Views/Visit',
            value: '2.8',
            change: '+0.3',
            trend: 'up',
            color: '#9c27b0',
            icon: <ViewIcon />,
        },
        {
            metric: 'CTR (Click Rate)',
            value: '1.8%',
            change: '-0.2%',
            trend: 'down',
            color: '#f44336',
            icon: <ClickIcon />,
        },
        {
            metric: 'Bounce Rate',
            value: '28.5%',
            change: '-2.1%',
            trend: 'up',
            color: '#607d8b',
            icon: <TrendingUpIcon />,
        },
    ];

    const topPages = [
        { page: '/', views: 1240, conversion: '4.2%', color: '#4caf50' },
        { page: '/projects', views: 890, conversion: '3.8%', color: '#2196f3' },
        { page: '/about', views: 650, conversion: '2.1%', color: '#ff9800' },
        { page: '/contact', views: 420, conversion: '5.5%', color: '#9c27b0' },
        { page: '/news', views: 380, conversion: '1.8%', color: '#607d8b' },
    ];

    const conversionFunnel = [
        { stage: 'Visitors', count: 1240, percentage: 100, color: '#1976d2' },
        { stage: 'Page Views', count: 3420, percentage: 100, color: '#388e3c' },
        { stage: 'Interest', count: 890, percentage: 72, color: '#f57c00' },
        { stage: 'Consideration', count: 420, percentage: 34, color: '#7b1fa2' },
        { stage: 'Intent', count: 156, percentage: 13, color: '#d32f2f' },
        { stage: 'Conversion', count: 45, percentage: 4, color: '#4caf50' },
    ];

    return (
        <Grid container spacing={3}>
            {/* Conversion Metrics Cards */}
            <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Chỉ số Conversion
                </Typography>
                <Grid container spacing={2}>
                    {conversionData.map((metric, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    background: `linear-gradient(135deg, ${metric.color} 0%, ${metric.color}dd 100%)`,
                                    color: 'white',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        transition: 'transform 0.3s ease-in-out',
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                                    <Avatar
                                        sx={{
                                            backgroundColor: 'rgba(255,255,255,0.2)',
                                            mb: 1,
                                            mx: 'auto',
                                            width: 40,
                                            height: 40,
                                        }}
                                    >
                                        {metric.icon}
                                    </Avatar>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                        {metric.value}
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                                        {metric.metric}
                                    </Typography>
                                    <Chip
                                        label={metric.change}
                                        size="small"
                                        sx={{
                                            backgroundColor: metric.trend === 'up' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                                            color: metric.trend === 'up' ? '#4caf50' : '#f44336',
                                            fontWeight: 600,
                                            fontSize: '0.7rem',
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            {/* Conversion Funnel */}
            <Grid item xs={12} lg={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                            Conversion Funnel
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            {conversionFunnel.map((stage, index) => (
                                <Box key={index} sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {stage.stage}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {stage.count.toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            height: 20,
                                            backgroundColor: stage.color,
                                            borderRadius: 2,
                                            width: `${stage.percentage}%`,
                                            position: 'relative',
                                            transition: 'width 0.3s ease-in-out',
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                position: 'absolute',
                                                right: 8,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: 'white',
                                                fontWeight: 600,
                                                fontSize: '0.7rem',
                                            }}
                                        >
                                            {stage.percentage}%
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Insight:</strong> Tỷ lệ chuyển đổi từ Interest sang Consideration là 47%,
                                cho thấy nội dung website đang thu hút người dùng quan tâm.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* Top Converting Pages */}
            <Grid item xs={12} lg={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                            Trang có Conversion cao nhất
                        </Typography>

                        <List>
                            {topPages.map((page, index) => (
                                <React.Fragment key={index}>
                                    <ListItem sx={{ px: 0, py: 1.5 }}>
                                        <ListItemIcon>
                                            <Avatar
                                                sx={{
                                                    backgroundColor: page.color,
                                                    width: 32,
                                                    height: 32,
                                                    fontSize: '0.8rem',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {index + 1}
                                            </Avatar>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography variant="body2" sx={{ fontWeight: 500, flex: 1 }}>
                                                        {page.page}
                                                    </Typography>
                                                    <Chip
                                                        label={page.conversion}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: page.color,
                                                            color: 'white',
                                                            fontSize: '0.7rem',
                                                            fontWeight: 600,
                                                        }}
                                                    />
                                                </Box>
                                            }
                                            secondary={`${page.views.toLocaleString()} lượt xem`}
                                        />
                                    </ListItem>
                                    {index < topPages.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>

                        <Box sx={{ mt: 2, p: 2, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Gợi ý:</strong> Trang Contact có conversion rate cao nhất (5.5%).
                                Nên tối ưu hóa các trang khác để tăng tỷ lệ chuyển đổi.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ConversionMetrics;
