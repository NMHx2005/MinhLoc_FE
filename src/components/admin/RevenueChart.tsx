'use client';

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Chip,
    Tooltip,
    IconButton,
} from '@mui/material';
import {
    Refresh as RefreshIcon,
    TrendingUp as TrendingUpIcon,
    AttachMoney as MoneyIcon,
    ShowChart as ChartIcon,
} from '@mui/icons-material';
import { useRevenueChart } from '../../hooks/useDashboard';
import { LinearProgress } from '@mui/material';

interface RevenueChartProps {
    height?: number;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ height = 300 }) => {
    const [period, setPeriod] = useState('12months');
    const { data: chartData, loading, error, refetch } = useRevenueChart(period);

    const handlePeriodChange = (event: any) => {
        setPeriod(event.target.value);
    };

    if (loading) {
        return (
            <Card sx={{ height: 'auto', minHeight: height + 100 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>📈 Biểu đồ doanh thu</Typography>
                    <LinearProgress />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card sx={{ height: 'auto', minHeight: height + 100 }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="error" variant="body1">
                        {error}
                    </Typography>
                    <Tooltip title="Thử lại">
                        <IconButton onClick={refetch} sx={{ mt: 1 }}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </CardContent>
            </Card>
        );
    }

    // Calculate totals for summary - ensure chartData is an array
    const safeChartData = Array.isArray(chartData) ? chartData : [];
    const totalRevenue = safeChartData.reduce((sum, item) => sum + (item.revenue || 0), 0);
    const totalProjects = safeChartData.reduce((sum, item) => sum + (item.projects || 0), 0);
    const avgRevenue = safeChartData.length > 0 ? totalRevenue / safeChartData.length : 0;

    return (
        <Card sx={{ height: 'auto', minHeight: height + 100 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">📈 Biểu đồ doanh thu</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>Thời gian</InputLabel>
                            <Select
                                value={period}
                                label="Thời gian"
                                onChange={handlePeriodChange}
                            >
                                <MenuItem value="3months">3 tháng</MenuItem>
                                <MenuItem value="6months">6 tháng</MenuItem>
                                <MenuItem value="12months">12 tháng</MenuItem>
                                <MenuItem value="24months">24 tháng</MenuItem>
                            </Select>
                        </FormControl>
                        <Tooltip title="Làm mới dữ liệu">
                            <IconButton onClick={refetch} size="small">
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                {/* Summary Stats */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
                            <Typography variant="h6" color="primary">
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                    notation: 'compact',
                                }).format(totalRevenue)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Tổng doanh thu
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.50', borderRadius: 1 }}>
                            <Typography variant="h6" color="success.main">
                                {totalProjects}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Tổng dự án
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.50', borderRadius: 1 }}>
                            <Typography variant="h6" color="warning.main">
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                    notation: 'compact',
                                }).format(avgRevenue)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                TB/tháng
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Chart Placeholder - You can integrate with Chart.js, Recharts, etc. */}
                <Box
                    sx={{
                        height: height,
                        bgcolor: 'grey.50',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        border: '2px dashed',
                        borderColor: 'grey.300',
                    }}
                >
                    <ChartIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        Biểu đồ doanh thu
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {safeChartData.length} điểm dữ liệu
                    </Typography>

                    {/* Simple bar representation */}
                    <Box sx={{ display: 'flex', alignItems: 'end', gap: 1, height: 120 }}>
                        {safeChartData.slice(0, 12).map((item, index) => {
                            const maxRevenue = safeChartData.length > 0 ? Math.max(...safeChartData.map(d => d.revenue || 0)) : 0;
                            const height = (item.revenue / maxRevenue) * 100;
                            return (
                                <Tooltip key={index} title={`${item.month}: ${new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                    notation: 'compact',
                                }).format(item.revenue)}`}>
                                    <Box
                                        sx={{
                                            width: 20,
                                            height: `${height}%`,
                                            bgcolor: 'primary.main',
                                            borderRadius: 1,
                                            minHeight: 4,
                                        }}
                                    />
                                </Tooltip>
                            );
                        })}
                    </Box>
                </Box>

                {/* Recent months data */}
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Dữ liệu gần đây:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {safeChartData.slice(-6).map((item, index) => (
                            <Chip
                                key={index}
                                label={`${item.month}: ${new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                    notation: 'compact',
                                }).format(item.revenue)}`}
                                size="small"
                                variant="outlined"
                            />
                        ))}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RevenueChart;
