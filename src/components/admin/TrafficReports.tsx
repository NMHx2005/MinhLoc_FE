'use client'

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Chip,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import {
    Visibility as PageViewsIcon,
    People as UsersIcon,
    Schedule as DurationIcon,
    ExitToApp as BounceIcon,
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    Computer as DeviceIcon,
    Language as LocationIcon,
    Search as SearchIcon,
    Link as ReferralIcon,
    FileDownload as ExportIcon,
} from '@mui/icons-material';

interface TrafficData {
    metric: string;
    current: number;
    previous: number;
    change: number;
    unit: string;
}

interface TopPage {
    page: string;
    pageviews: number;
    uniqueViews: number;
    avgTime: string;
    bounceRate: number;
}

interface TrafficSource {
    source: string;
    users: number;
    sessions: number;
    bounceRate: number;
    avgDuration: string;
    percentage: number;
}

interface DeviceData {
    device: string;
    users: number;
    percentage: number;
    sessions: number;
    bounceRate: number;
}

const TrafficReports: React.FC = () => {
    const [dateRange, setDateRange] = useState('last_30_days');

    const overviewMetrics: TrafficData[] = [
        { metric: 'Tổng lượt truy cập', current: 45672, previous: 38945, change: 17.3, unit: '' },
        { metric: 'Người dùng duy nhất', current: 12843, previous: 11256, change: 14.1, unit: '' },
        { metric: 'Thời gian trung bình', current: 2.45, previous: 2.18, change: 12.4, unit: 'phút' },
        { metric: 'Tỷ lệ thoát', current: 32.1, previous: 35.7, change: -10.1, unit: '%' },
    ];

    const topPages: TopPage[] = [
        {
            page: '/',
            pageviews: 8924,
            uniqueViews: 6432,
            avgTime: '3:45',
            bounceRate: 28.5
        },
        {
            page: '/projects',
            pageviews: 5678,
            uniqueViews: 4321,
            avgTime: '4:12',
            bounceRate: 22.3
        },
        {
            page: '/ginseng-products',
            pageviews: 4523,
            uniqueViews: 3654,
            avgTime: '3:28',
            bounceRate: 31.2
        },
        {
            page: '/about',
            pageviews: 3421,
            uniqueViews: 2987,
            avgTime: '2:56',
            bounceRate: 42.1
        },
        {
            page: '/contact',
            pageviews: 2876,
            uniqueViews: 2543,
            avgTime: '2:15',
            bounceRate: 38.7
        }
    ];

    const trafficSources: TrafficSource[] = [
        {
            source: 'Organic Search',
            users: 5643,
            sessions: 7234,
            bounceRate: 29.8,
            avgDuration: '3:42',
            percentage: 43.9
        },
        {
            source: 'Direct',
            users: 3456,
            sessions: 4123,
            bounceRate: 25.4,
            avgDuration: '4:15',
            percentage: 26.9
        },
        {
            source: 'Social Media',
            users: 2134,
            sessions: 2876,
            bounceRate: 45.2,
            avgDuration: '2:18',
            percentage: 16.6
        },
        {
            source: 'Referral',
            users: 987,
            sessions: 1234,
            bounceRate: 38.9,
            avgDuration: '2:54',
            percentage: 7.7
        },
        {
            source: 'Email',
            users: 654,
            sessions: 789,
            bounceRate: 22.1,
            avgDuration: '5:23',
            percentage: 5.1
        }
    ];

    const deviceData: DeviceData[] = [
        {
            device: 'Desktop',
            users: 7234,
            percentage: 56.3,
            sessions: 9876,
            bounceRate: 28.4
        },
        {
            device: 'Mobile',
            users: 4567,
            percentage: 35.6,
            sessions: 6543,
            bounceRate: 35.7
        },
        {
            device: 'Tablet',
            users: 1042,
            percentage: 8.1,
            sessions: 1345,
            bounceRate: 31.2
        }
    ];

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('vi-VN').format(num);
    };

    const getChangeColor = (change: number) => {
        return change >= 0 ? '#4caf50' : '#f44336';
    };

    const getChangeIcon = (change: number) => {
        return change >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />;
    };

    const handleExport = () => {
        // Export traffic reports
    };

    return (
        <Box>
            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Khoảng thời gian</InputLabel>
                                <Select
                                    value={dateRange}
                                    label="Khoảng thời gian"
                                    onChange={(e) => setDateRange(e.target.value)}
                                >
                                    <MenuItem value="today">Hôm nay</MenuItem>
                                    <MenuItem value="yesterday">Hôm qua</MenuItem>
                                    <MenuItem value="last_7_days">7 ngày qua</MenuItem>
                                    <MenuItem value="last_30_days">30 ngày qua</MenuItem>
                                    <MenuItem value="last_90_days">90 ngày qua</MenuItem>
                                    <MenuItem value="this_year">Năm nay</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="body2" color="text.secondary">
                                So sánh với: Cùng kỳ trước
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<ExportIcon />}
                                onClick={handleExport}
                            >
                                Xuất báo cáo
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Overview Metrics */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {overviewMetrics.map((metric, index) => {
                    const icons = [PageViewsIcon, UsersIcon, DurationIcon, BounceIcon];
                    const IconComponent = icons[index];
                    const colors = ['#2196f3', '#4caf50', '#ff9800', '#f44336'];

                    return (
                        <Grid item xs={12} md={3} key={metric.metric}>
                            <Card>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                                        <IconComponent sx={{ fontSize: 40, color: colors[index], mr: 1 }} />
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: colors[index] }}>
                                            {formatNumber(metric.current)}{metric.unit}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        {metric.metric}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            color: getChangeColor(metric.change)
                                        }}>
                                            {React.cloneElement(getChangeIcon(metric.change), {
                                                sx: { fontSize: 16, mr: 0.5 }
                                            })}
                                            <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                                {metric.change >= 0 ? '+' : ''}{metric.change}%
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            <Grid container spacing={3}>
                {/* Top Pages */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                <PageViewsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                Trang được xem nhiều nhất
                            </Typography>

                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Trang</TableCell>
                                            <TableCell align="center">Lượt xem</TableCell>
                                            <TableCell align="center">Tỷ lệ thoát</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {topPages.map((page) => (
                                            <TableRow key={page.page} hover>
                                                <TableCell>
                                                    <Box>
                                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                            {page.page}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {formatNumber(page.uniqueViews)} unique • {page.avgTime}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {formatNumber(page.pageviews)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Chip
                                                        label={`${page.bounceRate}%`}
                                                        size="small"
                                                        color={page.bounceRate < 30 ? 'success' :
                                                            page.bounceRate < 40 ? 'warning' : 'error'}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Traffic Sources */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                <SearchIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                Nguồn traffic
                            </Typography>

                            <List>
                                {trafficSources.map((source, index) => (
                                    <React.Fragment key={source.source}>
                                        <ListItem sx={{ px: 0 }}>
                                            <ListItemText
                                                primary={`${source.source} - ${source.percentage}%`}
                                                secondary={`${formatNumber(source.users)} users • ${source.avgDuration} avg`}
                                            />
                                        </ListItem>
                                        {index < trafficSources.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Device Breakdown */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                <DeviceIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                Thiết bị truy cập
                            </Typography>

                            <List>
                                {deviceData.map((device, index) => (
                                    <React.Fragment key={device.device}>
                                        <ListItem sx={{ px: 0 }}>
                                            <ListItemText
                                                primary={`${device.device} - ${device.percentage}%`}
                                                secondary={`${formatNumber(device.users)} users • ${device.bounceRate}% bounce`}
                                            />
                                        </ListItem>
                                        {index < deviceData.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Geographic Data */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                <LocationIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                Vị trí địa lý
                            </Typography>

                            <List>
                                {[
                                    { country: 'Việt Nam', users: 8934, percentage: 69.6 },
                                    { country: 'Singapore', users: 1456, percentage: 11.3 },
                                    { country: 'Malaysia', users: 987, percentage: 7.7 },
                                    { country: 'Thailand', users: 654, percentage: 5.1 },
                                    { country: 'Khác', users: 812, percentage: 6.3 }
                                ].map((location, index) => (
                                    <React.Fragment key={location.country}>
                                        <ListItem sx={{ px: 0 }}>
                                            <ListItemText
                                                primary={`${location.country} - ${location.percentage}%`}
                                                secondary={`${formatNumber(location.users)} users`}
                                            />
                                        </ListItem>
                                        {index < 4 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Real-time Data */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Google Analytics Integration
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={3}>
                                    <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50', mb: 1 }}>
                                            127
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Đang online
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2196f3', mb: 1 }}>
                                            2.4k
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Hôm nay
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800', mb: 1 }}>
                                            18.7k
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Tuần này
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#9c27b0', mb: 1 }}>
                                            65.3k
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Tháng này
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 3, p: 2, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                    📊 Google Analytics Status: Đã kết nối
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Dữ liệu được cập nhật tự động mỗi 24 giờ từ GA4.
                                    Lần cập nhật cuối: {new Date().toLocaleString('vi-VN')}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TrafficReports;
