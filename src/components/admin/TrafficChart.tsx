'use client'

import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    LinearProgress,
    CircularProgress,
    Alert,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    Visibility as VisibilityIcon,
    People as PeopleIcon,
    Mouse as ClickIcon,
} from '@mui/icons-material';
import { analyticsService } from '../../services/admin/analyticsService';
import type { AnalyticsOverview, PageViewsData, TrafficSourcesData } from '../../services/admin/analyticsService';

interface TrafficChartProps {
    filters?: {
        timeRange?: string;
        device?: string;
        source?: string;
        page?: string;
    };
}

const TrafficChart: React.FC<TrafficChartProps> = ({ filters }) => {
    const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
    const [pageViews, setPageViews] = useState<PageViewsData[]>([]);
    const [trafficSources, setTrafficSources] = useState<TrafficSourcesData[]>([]);
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

                const [overviewData, pageViewsData, trafficSourcesData] = await Promise.all([
                    analyticsService.getOverview(params),
                    analyticsService.getPageViews(params),
                    analyticsService.getTrafficSources(params),
                ]);

                setOverview(overviewData);
                setPageViews(pageViewsData);
                setTrafficSources(trafficSourcesData);
            } catch (err) {
                console.error('Error loading traffic data:', err);
                setError('Không thể tải dữ liệu traffic');
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
                Không có dữ liệu traffic
            </Alert>
        );
    }

    const maxVisitors = pageViews && Array.isArray(pageViews) && pageViews.length > 0
        ? Math.max(...pageViews.map(d => d.uniqueVisitors), 1)
        : 1;
    const totalVisitors = overview.uniqueVisitors;
    const totalPageViews = overview.totalPageViews;
    const avgBounceRate = overview.bounceRate;

    return (
        <Grid container spacing={3}>
            {/* Traffic Overview Cards */}
            <Grid item xs={12} md={3}>
                <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #1976d2 0%, #1976d2dd 100%)', color: 'white' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <PeopleIcon sx={{ mr: 1 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Tổng Visitors
                            </Typography>
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {totalVisitors.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            Dữ liệu thời gian thực
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={3}>
                <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #388e3c 0%, #388e3cdd 100%)', color: 'white' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <VisibilityIcon sx={{ mr: 1 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Page Views
                            </Typography>
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {totalPageViews.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            Dữ liệu thời gian thực
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={3}>
                <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #f57c00 0%, #f57c00dd 100%)', color: 'white' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <ClickIcon sx={{ mr: 1 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Sessions
                            </Typography>
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {overview.averageSessionDuration.toFixed(0)}s
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            Thời gian trung bình
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={3}>
                <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #7b1fa2 0%, #7b1fa2dd 100%)', color: 'white' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <TrendingUpIcon sx={{ mr: 1 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Bounce Rate
                            </Typography>
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {avgBounceRate.toFixed(1)}%
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            Tỷ lệ thoát
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Traffic Chart */}
            <Grid item xs={12} lg={8}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                            Biểu đồ Traffic 7 ngày qua
                        </Typography>

                        {/* Simple Bar Chart */}
                        <Box sx={{ display: 'flex', alignItems: 'end', height: 200, gap: 1, mb: 2 }}>
                            {pageViews && Array.isArray(pageViews) && pageViews.length > 0 ? pageViews.map((data, index) => (
                                <Box key={index} sx={{ flex: 1, textAlign: 'center' }}>
                                    <Box
                                        sx={{
                                            height: `${(data.uniqueVisitors / maxVisitors) * 100}%`,
                                            backgroundColor: '#E7C873',
                                            borderRadius: '4px 4px 0 0',
                                            mb: 1,
                                            minHeight: 20,
                                            position: 'relative',
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                position: 'absolute',
                                                top: -20,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                fontSize: '0.7rem',
                                                fontWeight: 600,
                                                color: '#666',
                                            }}
                                        >
                                            {data.uniqueVisitors}
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                                        {new Date(data.date).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' })}
                                    </Typography>
                                </Box>
                            )) : (
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Không có dữ liệu để hiển thị
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        {/* Legend */}
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ width: 12, height: 12, backgroundColor: '#E7C873', borderRadius: 1 }} />
                                <Typography variant="caption">Visitors</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* Traffic Sources */}
            <Grid item xs={12} lg={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                            Nguồn Traffic
                        </Typography>

                        {trafficSources && Array.isArray(trafficSources) && trafficSources.length > 0 ? trafficSources.map((source, index) => {
                            const colors = ['#1976d2', '#1877F2', '#4caf50', '#FF0000', '#ff9800', '#9c27b0'];
                            const color = colors[index % colors.length];

                            return (
                                <Box key={index} sx={{ mb: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2">{source.source}</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {source.percentage.toFixed(1)}%
                                        </Typography>
                                    </Box>
                                    <Box sx={{ position: 'relative', width: '100%' }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={source.percentage}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: 'rgba(0,0,0,0.1)',
                                                width: '100%',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: color,
                                                    borderRadius: 4,
                                                },
                                            }}
                                        />
                                    </Box>
                                </Box>
                            );
                        }) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Không có dữ liệu nguồn traffic
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default TrafficChart;
