'use client'

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
    Button,
    Chip,
    Stack,
    Grid,
} from '@mui/material';
import {
    DateRange as DateRangeIcon,
    FilterList as FilterIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';

interface AnalyticsFiltersProps {
    onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
    timeRange: string;
    device: string;
    source: string;
    page: string;
}

const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState<FilterState>({
        timeRange: '7d',
        device: 'all',
        source: 'all',
        page: 'all',
    });

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleReset = () => {
        const defaultFilters = {
            timeRange: '7d',
            device: 'all',
            source: 'all',
            page: 'all',
        };
        setFilters(defaultFilters);
        onFilterChange(defaultFilters);
    };

    const timeRangeOptions = [
        { value: '1d', label: 'Hôm qua' },
        { value: '7d', label: '7 ngày qua' },
        { value: '30d', label: '30 ngày qua' },
        { value: '90d', label: '3 tháng qua' },
        { value: '1y', label: '1 năm qua' },
    ];

    const deviceOptions = [
        { value: 'all', label: 'Tất cả thiết bị' },
        { value: 'desktop', label: 'Desktop' },
        { value: 'mobile', label: 'Mobile' },
        { value: 'tablet', label: 'Tablet' },
    ];

    const sourceOptions = [
        { value: 'all', label: 'Tất cả nguồn' },
        { value: 'google', label: 'Google Search' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'direct', label: 'Direct' },
        { value: 'youtube', label: 'YouTube' },
        { value: 'other', label: 'Khác' },
    ];

    const pageOptions = [
        { value: 'all', label: 'Tất cả trang' },
        { value: '/', label: 'Trang chủ' },
        { value: '/projects', label: 'Dự án' },
        { value: '/about', label: 'Giới thiệu' },
        { value: '/news', label: 'Tin tức' },
        { value: '/contact', label: 'Liên hệ' },
    ];

    const getActiveFiltersCount = () => {
        let count = 0;
        if (filters.device !== 'all') count++;
        if (filters.source !== 'all') count++;
        if (filters.page !== 'all') count++;
        return count;
    };

    return (
        <Card>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <FilterIcon sx={{ mr: 1, color: '#E7C873' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Bộ lọc Analytics
                    </Typography>
                    {getActiveFiltersCount() > 0 && (
                        <Chip
                            label={`${getActiveFiltersCount()} bộ lọc`}
                            size="small"
                            sx={{
                                ml: 2,
                                backgroundColor: '#E7C873',
                                color: 'white',
                                fontWeight: 600,
                            }}
                        />
                    )}
                </Box>

                <Grid container spacing={3}>
                    {/* Time Range */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Khoảng thời gian</InputLabel>
                            <Select
                                value={filters.timeRange}
                                label="Khoảng thời gian"
                                onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                                startAdornment={<DateRangeIcon sx={{ mr: 1, color: '#E7C873' }} />}
                            >
                                {timeRangeOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Device */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Thiết bị</InputLabel>
                            <Select
                                value={filters.device}
                                label="Thiết bị"
                                onChange={(e) => handleFilterChange('device', e.target.value)}
                            >
                                {deviceOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Source */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Nguồn traffic</InputLabel>
                            <Select
                                value={filters.source}
                                label="Nguồn traffic"
                                onChange={(e) => handleFilterChange('source', e.target.value)}
                            >
                                {sourceOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Page */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Trang</InputLabel>
                            <Select
                                value={filters.page}
                                label="Trang"
                                onChange={(e) => handleFilterChange('page', e.target.value)}
                            >
                                {pageOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Action Buttons */}
                <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={handleReset}
                        sx={{
                            borderColor: '#E7C873',
                            color: '#E7C873',
                            '&:hover': {
                                borderColor: '#d4b85a',
                                backgroundColor: 'rgba(231, 200, 115, 0.1)',
                            },
                        }}
                    >
                        Đặt lại
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<FilterIcon />}
                        onClick={() => onFilterChange(filters)}
                        sx={{
                            backgroundColor: '#E7C873',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#d4b85a',
                            },
                        }}
                    >
                        Áp dụng bộ lọc
                    </Button>
                </Box>

                {/* Active Filters Display */}
                {getActiveFiltersCount() > 0 && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            Bộ lọc đang áp dụng:
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {filters.device !== 'all' && (
                                <Chip
                                    label={`Thiết bị: ${deviceOptions.find(opt => opt.value === filters.device)?.label}`}
                                    onDelete={() => handleFilterChange('device', 'all')}
                                    size="small"
                                    sx={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}
                                />
                            )}
                            {filters.source !== 'all' && (
                                <Chip
                                    label={`Nguồn: ${sourceOptions.find(opt => opt.value === filters.source)?.label}`}
                                    onDelete={() => handleFilterChange('source', 'all')}
                                    size="small"
                                    sx={{ backgroundColor: '#e8f5e8', color: '#388e3c' }}
                                />
                            )}
                            {filters.page !== 'all' && (
                                <Chip
                                    label={`Trang: ${pageOptions.find(opt => opt.value === filters.page)?.label}`}
                                    onDelete={() => handleFilterChange('page', 'all')}
                                    size="small"
                                    sx={{ backgroundColor: '#fff3e0', color: '#f57c00' }}
                                />
                            )}
                        </Stack>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default AnalyticsFilters;
