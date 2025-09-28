'use client'

import React, { useState, useEffect } from 'react';
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
    CircularProgress,
    Alert,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    Visibility as ViewIcon,
} from '@mui/icons-material';
import { analyticsService } from '../../services/admin/analyticsService';
import type { AnalyticsOverview, TopPagesData } from '../../services/admin/analyticsService';

interface ConversionMetricsProps {
    filters?: {
        timeRange?: string;
        device?: string;
        source?: string;
        page?: string;
    };
}

const ConversionMetrics: React.FC<ConversionMetricsProps> = ({ filters }) => {
    const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
    const [topPages, setTopPages] = useState<TopPagesData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                const params = {
                    timeRange: filters?.timeRange || '7d',
                    device: filters?.device || 'all',
                    source: filters?.source || 'all',
                    page: filters?.page || 'all',
                };

                const [overviewData, topPagesData] = await Promise.all([
                    analyticsService.getOverview(params),
                    analyticsService.getTopPages(params),
                ]);

                setOverview(overviewData);
                setTopPages(topPagesData);
            } catch (err) {
                console.error('Error loading conversion data:', err);
                setError('Không thể tải dữ liệu conversion');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [filters]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mb: 3 }}>
                {error}
            </Alert>
        );
    }

    if (!overview) {
        return (
            <Alert severity="info" sx={{ mb: 3 }}>
                Không có dữ liệu conversion
            </Alert>
        );
    }
    const conversionData = [
        {
            metric: 'Conversion Rate',
            value: `${overview.conversionRate.toFixed(1)}%`,
            change: 'Dữ liệu thực',
            trend: 'up',
            color: '#4caf50',
            icon: <TrendingUpIcon />,
        },
        {
            metric: 'Bounce Rate',
            value: `${overview.bounceRate.toFixed(1)}%`,
            change: 'Tỷ lệ thoát',
            trend: 'down',
            color: '#f44336',
            icon: <TrendingUpIcon />,
        },
        {
            metric: 'Avg Session Duration',
            value: `${overview.averageSessionDuration.toFixed(0)}s`,
            change: 'Thời gian trung bình',
            trend: 'up',
            color: '#2196f3',
            icon: <ViewIcon />,
        },
        {
            metric: 'Total Page Views',
            value: overview.totalPageViews.toLocaleString(),
            change: 'Tổng lượt xem',
            trend: 'up',
            color: '#9c27b0',
            icon: <ViewIcon />,
        },
        {
            metric: 'Unique Visitors',
            value: overview.uniqueVisitors.toLocaleString(),
            change: 'Người dùng duy nhất',
            trend: 'up',
            color: '#ff9800',
            icon: <TrendingUpIcon />,
        },
    ];

    const topPagesData = topPages.slice(0, 5).map((page, index) => ({
        page: page.page,
        views: page.views,
        conversion: `${page.bounceRate.toFixed(1)}%`,
        color: ['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#607d8b'][index % 5]
    }));

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
                            {topPagesData.map((page, index) => (
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
