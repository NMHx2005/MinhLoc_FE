'use client'

import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    Chip,
    LinearProgress,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    Visibility as VisibilityIcon,
    People as PeopleIcon,
    Mouse as ClickIcon,
} from '@mui/icons-material';

interface TrafficData {
    date: string;
    visitors: number;
    pageViews: number;
    sessions: number;
    bounceRate: number;
}

const TrafficChart: React.FC = () => {
    // Mock data for last 7 days
    const trafficData: TrafficData[] = [
        { date: '2024-01-15', visitors: 1240, pageViews: 3420, sessions: 1180, bounceRate: 35.2 },
        { date: '2024-01-16', visitors: 1380, pageViews: 3890, sessions: 1320, bounceRate: 32.8 },
        { date: '2024-01-17', visitors: 1150, pageViews: 3150, sessions: 1090, bounceRate: 38.5 },
        { date: '2024-01-18', visitors: 1620, pageViews: 4560, sessions: 1540, bounceRate: 28.9 },
        { date: '2024-01-19', visitors: 1890, pageViews: 5230, sessions: 1780, bounceRate: 25.4 },
        { date: '2024-01-20', visitors: 2100, pageViews: 5890, sessions: 1980, bounceRate: 22.1 },
        { date: '2024-01-21', visitors: 1950, pageViews: 5420, sessions: 1850, bounceRate: 24.8 },
    ];

    const maxVisitors = Math.max(...trafficData.map(d => d.visitors));
    const maxPageViews = Math.max(...trafficData.map(d => d.pageViews));

    const totalVisitors = trafficData.reduce((sum, d) => sum + d.visitors, 0);
    const totalPageViews = trafficData.reduce((sum, d) => sum + d.pageViews, 0);
    const totalSessions = trafficData.reduce((sum, d) => sum + d.sessions, 0);
    const avgBounceRate = trafficData.reduce((sum, d) => sum + d.bounceRate, 0) / trafficData.length;

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
                            +12.5% so với tuần trước
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
                            +8.2% so với tuần trước
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
                            {totalSessions.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            +15.8% so với tuần trước
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
                            -5.2% so với tuần trước
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
                            {trafficData.map((data, index) => (
                                <Box key={index} sx={{ flex: 1, textAlign: 'center' }}>
                                    <Box
                                        sx={{
                                            height: `${(data.visitors / maxVisitors) * 100}%`,
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
                                            {data.visitors}
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                                        {new Date(data.date).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' })}
                                    </Typography>
                                </Box>
                            ))}
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

                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Google Search</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>45.2%</Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={45.2}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#1976d2',
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Facebook</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>28.5%</Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={28.5}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#1877F2',
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Direct</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>15.8%</Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={15.8}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#4caf50',
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">YouTube</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>10.5%</Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={10.5}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#FF0000',
                                    },
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default TrafficChart;
