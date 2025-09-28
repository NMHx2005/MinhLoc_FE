'use client';

import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    LinearProgress,
    Avatar,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    Refresh as RefreshIcon,
    Business as BusinessIcon,
    Inventory as InventoryIcon,
    Article as ArticleIcon,
    People as PeopleIcon,
    AttachMoney as MoneyIcon,
    AssignmentTurnedIn as CompletedIcon,
    Construction as ConstructionIcon,
} from '@mui/icons-material';
import { useOverview } from '../../hooks/useDashboard';

interface StatCardProps {
    title: string;
    value: number | string;
    change?: number;
    icon: React.ReactNode;
    color: string;
    format?: 'number' | 'currency' | 'percentage';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color, format = 'number' }) => {
    const formatValue = (val: number | string) => {
        if (format === 'currency') {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(Number(val));
        }
        if (format === 'percentage') {
            return `${val}%`;
        }
        return new Intl.NumberFormat('vi-VN').format(Number(val));
    };

    return (
        <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
                        {icon}
                    </Avatar>
                    {change !== undefined && (
                        <Chip
                            icon={change >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                            label={`${change >= 0 ? '+' : ''}${change.toFixed(1)}%`}
                            color={change >= 0 ? 'success' : 'error'}
                            size="small"
                            variant="outlined"
                        />
                    )}
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {formatValue(value)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
};

const DashboardOverview: React.FC = () => {
    const { data: overview, loading, error, refetch } = useOverview();

    if (loading) {
        return (
            <Box sx={{ width: '100%', mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Tổng quan</Typography>
                <LinearProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ width: '100%', mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Tổng quan</Typography>
                <Card>
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
            </Box>
        );
    }

    if (!overview) {
        return null;
    }

    return (
        <Box sx={{ width: '100%', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">📊 Tổng quan</Typography>
                <Tooltip title="Làm mới dữ liệu">
                    <IconButton onClick={refetch} size="small">
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Tổng dự án"
                        value={overview.totalProjects}
                        icon={<BusinessIcon />}
                        color="#1976d2"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Tin nhắn"
                        value={overview.totalMessages}
                        icon={<InventoryIcon />}
                        color="#388e3c"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Tin nhắn chưa đọc"
                        value={overview.unreadMessages}
                        icon={<ArticleIcon />}
                        color="#f57c00"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Người dùng"
                        value={overview.totalUsers}
                        icon={<PeopleIcon />}
                        color="#7b1fa2"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Tổng doanh thu"
                        value={overview.totalRevenue}
                        icon={<MoneyIcon />}
                        color="#2e7d32"
                        format="currency"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Doanh thu tháng"
                        value={overview.monthlyRevenue}
                        icon={<TrendingUpIcon />}
                        color="#1565c0"
                        format="currency"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Dự án hoàn thành"
                        value={overview.projectProgress.completed}
                        icon={<CompletedIcon />}
                        color="#388e3c"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Dự án đang thi công"
                        value={overview.projectProgress.construction}
                        icon={<ConstructionIcon />}
                        color="#f57c00"
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardOverview;
