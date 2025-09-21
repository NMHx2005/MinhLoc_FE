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
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
    Business as ProjectIcon,
    AttachMoney as RevenueIcon,
    ShowChart as ChartIcon,
    FileDownload as ExportIcon,
    DateRange as DateIcon,
} from '@mui/icons-material';

interface ProjectSalesData {
    id: string;
    projectName: string;
    category: string;
    totalUnits: number;
    soldUnits: number;
    revenue: number;
    avgPrice: number;
    salesRate: number;
    monthlyGrowth: number;
    location: string;
    status: 'active' | 'completed' | 'paused';
}

interface SalesChart {
    month: string;
    revenue: number;
    units: number;
    avgPrice: number;
}

const ProjectReports: React.FC = () => {
    const [dateRange, setDateRange] = useState('this_year');
    const [projectFilter, setProjectFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const projectSales: ProjectSalesData[] = [
        {
            id: '1',
            projectName: 'Chung cư Grand Marina',
            category: 'Căn hộ cao cấp',
            totalUnits: 200,
            soldUnits: 165,
            revenue: 825000000000,
            avgPrice: 5000000000,
            salesRate: 82.5,
            monthlyGrowth: 12.5,
            location: 'Quận 1, TP.HCM',
            status: 'active'
        },
        {
            id: '2',
            projectName: 'Biệt thự The Crown',
            category: 'Biệt thự',
            totalUnits: 50,
            soldUnits: 35,
            revenue: 700000000000,
            avgPrice: 20000000000,
            salesRate: 70.0,
            monthlyGrowth: 8.3,
            location: 'Quận 2, TP.HCM',
            status: 'active'
        },
        {
            id: '3',
            projectName: 'Shophouse Golden Plaza',
            category: 'Shophouse',
            totalUnits: 80,
            soldUnits: 72,
            revenue: 360000000000,
            avgPrice: 5000000000,
            salesRate: 90.0,
            monthlyGrowth: -2.1,
            location: 'Quận 7, TP.HCM',
            status: 'completed'
        },
        {
            id: '4',
            projectName: 'Office Tower Elite',
            category: 'Văn phòng',
            totalUnits: 120,
            soldUnits: 88,
            revenue: 440000000000,
            avgPrice: 5000000000,
            salesRate: 73.3,
            monthlyGrowth: 15.7,
            location: 'Quận 3, TP.HCM',
            status: 'active'
        },
        {
            id: '5',
            projectName: 'Resort Villa Paradise',
            category: 'Resort',
            totalUnits: 30,
            soldUnits: 18,
            revenue: 540000000000,
            avgPrice: 30000000000,
            salesRate: 60.0,
            monthlyGrowth: 5.2,
            location: 'Đà Nẵng',
            status: 'paused'
        }
    ];

    const salesChart: SalesChart[] = [
        { month: 'T1/2024', revenue: 125000000000, units: 25, avgPrice: 5000000000 },
        { month: 'T2/2024', revenue: 140000000000, units: 28, avgPrice: 5000000000 },
        { month: 'T3/2024', revenue: 160000000000, units: 32, avgPrice: 5000000000 },
        { month: 'T4/2024', revenue: 180000000000, units: 36, avgPrice: 5000000000 },
        { month: 'T5/2024', revenue: 200000000000, units: 40, avgPrice: 5000000000 },
        { month: 'T6/2024', revenue: 185000000000, units: 37, avgPrice: 5000000000 },
        { month: 'T7/2024', revenue: 220000000000, units: 44, avgPrice: 5000000000 },
        { month: 'T8/2024', revenue: 245000000000, units: 49, avgPrice: 5000000000 },
        { month: 'T9/2024', revenue: 230000000000, units: 46, avgPrice: 5000000000 },
        { month: 'T10/2024', revenue: 265000000000, units: 53, avgPrice: 5000000000 },
        { month: 'T11/2024', revenue: 285000000000, units: 57, avgPrice: 5000000000 },
        { month: 'T12/2024', revenue: 300000000000, units: 60, avgPrice: 5000000000 },
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('vi-VN').format(num);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'success';
            case 'completed': return 'info';
            case 'paused': return 'warning';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active': return 'Đang bán';
            case 'completed': return 'Hoàn thành';
            case 'paused': return 'Tạm dừng';
            default: return status;
        }
    };

    const totalRevenue = projectSales.reduce((sum, project) => sum + project.revenue, 0);
    const totalUnits = projectSales.reduce((sum, project) => sum + project.soldUnits, 0);
    const avgSalesRate = projectSales.reduce((sum, project) => sum + project.salesRate, 0) / projectSales.length;

    const maxSalesProject = projectSales.reduce((max, project) =>
        project.revenue > max.revenue ? project : max, projectSales[0]);

    const topPerformers = [...projectSales]
        .sort((a, b) => b.salesRate - a.salesRate)
        .slice(0, 3);

    const handleExport = () => {
        // Simulate export functionality
        // Export project reports
    };

    return (
        <Box>
            {/* Filters */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Khoảng thời gian</InputLabel>
                                <Select
                                    value={dateRange}
                                    label="Khoảng thời gian"
                                    onChange={(e) => setDateRange(e.target.value)}
                                >
                                    <MenuItem value="this_month">Tháng này</MenuItem>
                                    <MenuItem value="last_month">Tháng trước</MenuItem>
                                    <MenuItem value="this_quarter">Quý này</MenuItem>
                                    <MenuItem value="this_year">Năm này</MenuItem>
                                    <MenuItem value="custom">Tùy chỉnh</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Dự án</InputLabel>
                                <Select
                                    value={projectFilter}
                                    label="Dự án"
                                    onChange={(e) => setProjectFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    {projectSales.map(project => (
                                        <MenuItem key={project.id} value={project.id}>
                                            {project.projectName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Phân loại</InputLabel>
                                <Select
                                    value={categoryFilter}
                                    label="Phân loại"
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                >
                                    <MenuItem value="all">Tất cả</MenuItem>
                                    <MenuItem value="apartment">Căn hộ</MenuItem>
                                    <MenuItem value="villa">Biệt thự</MenuItem>
                                    <MenuItem value="shophouse">Shophouse</MenuItem>
                                    <MenuItem value="office">Văn phòng</MenuItem>
                                    <MenuItem value="resort">Resort</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
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

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                                <RevenueIcon sx={{ fontSize: 40, color: '#4caf50', mr: 1 }} />
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                                    {(totalRevenue / 1000000000000).toFixed(1)}T
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Tổng doanh thu (VNĐ)
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                                <TrendingUpIcon sx={{ fontSize: 16, color: '#4caf50', mr: 0.5 }} />
                                <Typography variant="caption" sx={{ color: '#4caf50' }}>
                                    +15.2% so với tháng trước
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                                <ProjectIcon sx={{ fontSize: 40, color: '#2196f3', mr: 1 }} />
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2196f3' }}>
                                    {formatNumber(totalUnits)}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Tổng sản phẩm đã bán
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                                <TrendingUpIcon sx={{ fontSize: 16, color: '#4caf50', mr: 0.5 }} />
                                <Typography variant="caption" sx={{ color: '#4caf50' }}>
                                    +8.7% so với tháng trước
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                                <ChartIcon sx={{ fontSize: 40, color: '#ff9800', mr: 1 }} />
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                                    {avgSalesRate.toFixed(1)}%
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Tỷ lệ bán trung bình
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                                <TrendingUpIcon sx={{ fontSize: 16, color: '#4caf50', mr: 0.5 }} />
                                <Typography variant="caption" sx={{ color: '#4caf50' }}>
                                    +2.3% so với tháng trước
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                                <DateIcon sx={{ fontSize: 40, color: '#9c27b0', mr: 1 }} />
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#9c27b0' }}>
                                    {projectSales.filter(p => p.status === 'active').length}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Dự án đang triển khai
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                                <TrendingDownIcon sx={{ fontSize: 16, color: '#f44336', mr: 0.5 }} />
                                <Typography variant="caption" sx={{ color: '#f44336' }}>
                                    -1 so với tháng trước
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Sales Chart */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Biểu đồ Doanh thu & Số lượng bán theo tháng
                            </Typography>

                            {/* Simple chart representation */}
                            <Box sx={{ mb: 3 }}>
                                {salesChart.map((item, index) => (
                                    <Box key={item.month} sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {item.month}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#4caf50' }}>
                                                {formatCurrency(item.revenue)} - {item.units} căn
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(item.revenue / 300000000000) * 100}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: 'rgba(0,0,0,0.1)',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: `hsl(${120 + index * 15}, 70%, 50%)`
                                                }
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Top Performers */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Top Performers
                            </Typography>

                            <List>
                                {topPerformers.map((project, index) => (
                                    <React.Fragment key={project.id}>
                                        <ListItem sx={{ px: 0 }}>
                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                            #{index + 1} {project.projectName}
                                                        </Typography>
                                                        <Chip
                                                            label={`${project.salesRate}%`}
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: index === 0 ? '#ffd700' :
                                                                    index === 1 ? '#c0c0c0' : '#cd7f32',
                                                                color: '#000',
                                                                fontWeight: 'bold'
                                                            }}
                                                        />
                                                    </Box>
                                                }
                                                secondary={`${project.soldUnits}/${project.totalUnits} căn • ${formatCurrency(project.revenue)} • ${project.salesRate}% bán`}
                                            />
                                        </ListItem>
                                        {index < topPerformers.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>

                            <Divider sx={{ my: 2 }} />

                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                    Dự án có doanh thu cao nhất:
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 600 }}>
                                    {maxSalesProject.projectName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {formatCurrency(maxSalesProject.revenue)}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Detailed Table */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Chi tiết Doanh số theo Dự án
                            </Typography>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Dự án</TableCell>
                                            <TableCell>Phân loại</TableCell>
                                            <TableCell align="center">Đã bán/Tổng</TableCell>
                                            <TableCell align="center">Tỷ lệ bán</TableCell>
                                            <TableCell align="right">Doanh thu</TableCell>
                                            <TableCell align="right">Giá TB</TableCell>
                                            <TableCell align="center">Tăng trưởng</TableCell>
                                            <TableCell align="center">Trạng thái</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {projectSales.map((project) => (
                                            <TableRow key={project.id} hover>
                                                <TableCell>
                                                    <Box>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                            {project.projectName}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {project.location}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2">
                                                        {project.category}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box>
                                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                            {project.soldUnits}/{project.totalUnits}
                                                        </Typography>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={project.salesRate}
                                                            sx={{
                                                                mt: 0.5,
                                                                height: 4,
                                                                borderRadius: 2,
                                                                backgroundColor: 'rgba(0,0,0,0.1)',
                                                            }}
                                                        />
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {project.salesRate}%
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {formatCurrency(project.revenue)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2">
                                                        {formatCurrency(project.avgPrice)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        {project.monthlyGrowth >= 0 ? (
                                                            <TrendingUpIcon sx={{ fontSize: 16, color: '#4caf50', mr: 0.5 }} />
                                                        ) : (
                                                            <TrendingDownIcon sx={{ fontSize: 16, color: '#f44336', mr: 0.5 }} />
                                                        )}
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                color: project.monthlyGrowth >= 0 ? '#4caf50' : '#f44336',
                                                                fontWeight: 600
                                                            }}
                                                        >
                                                            {project.monthlyGrowth >= 0 ? '+' : ''}{project.monthlyGrowth}%
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Chip
                                                        label={getStatusLabel(project.status)}
                                                        color={getStatusColor(project.status) as any}
                                                        size="small"
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
            </Grid>
        </Box>
    );
};

export default ProjectReports;
