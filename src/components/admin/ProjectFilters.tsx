'use client'

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Chip,
    Stack,
    Grid,
    IconButton,
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterIcon,
    Clear as ClearIcon,
    Tune as TuneIcon,
} from '@mui/icons-material';

interface ProjectFiltersProps {
    onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
    search: string;
    type: string;
    status: string;
    city: string;
    district: string;
    minPrice: string;
    maxPrice: string;
    minArea: string;
    maxArea: string;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        type: 'all',
        status: 'all',
        city: 'all',
        district: 'all',
        minPrice: '',
        maxPrice: '',
        minArea: '',
        maxArea: '',
    });

    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleReset = () => {
        const defaultFilters = {
            search: '',
            type: 'all',
            status: 'all',
            city: 'all',
            district: 'all',
            minPrice: '',
            maxPrice: '',
            minArea: '',
            maxArea: '',
        };
        setFilters(defaultFilters);
        onFilterChange(defaultFilters);
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (filters.search) count++;
        if (filters.type !== 'all') count++;
        if (filters.status !== 'all') count++;
        if (filters.city !== 'all') count++;
        if (filters.district !== 'all') count++;
        if (filters.minPrice || filters.maxPrice) count++;
        if (filters.minArea || filters.maxArea) count++;
        return count;
    };

    const typeOptions = [
        { value: 'all', label: 'Tất cả loại' },
        { value: 'apartment', label: 'Chung cư' },
        { value: 'villa', label: 'Biệt thự' },
        { value: 'commercial', label: 'Thương mại' },
        { value: 'land', label: 'Đất nền' },
    ];

    const statusOptions = [
        { value: 'all', label: 'Tất cả trạng thái' },
        { value: 'available', label: 'Đang bán' },
        { value: 'sold', label: 'Đã bán' },
        { value: 'coming-soon', label: 'Sắp mở bán' },
    ];

    const cityOptions = [
        { value: 'all', label: 'Tất cả thành phố' },
        { value: 'TP.HCM', label: 'TP. Hồ Chí Minh' },
        { value: 'Hà Nội', label: 'Hà Nội' },
        { value: 'Đà Nẵng', label: 'Đà Nẵng' },
        { value: 'Khác', label: 'Khác' },
    ];

    const districtOptions = [
        { value: 'all', label: 'Tất cả quận/huyện' },
        { value: 'Quận 1', label: 'Quận 1' },
        { value: 'Quận 2', label: 'Quận 2' },
        { value: 'Quận 7', label: 'Quận 7' },
        { value: 'Quận 9', label: 'Quận 9' },
        { value: 'Khác', label: 'Khác' },
    ];

    return (
        <Card>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <FilterIcon sx={{ mr: 1, color: '#E7C873' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Bộ lọc Dự án
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

                {/* Basic Filters */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Tìm kiếm dự án"
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            InputProps={{
                                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                            }}
                            placeholder="Nhập tên dự án, địa chỉ..."
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Loại dự án</InputLabel>
                            <Select
                                value={filters.type}
                                label="Loại dự án"
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                            >
                                {typeOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Trạng thái</InputLabel>
                            <Select
                                value={filters.status}
                                label="Trạng thái"
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                            >
                                {statusOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Advanced Filters Toggle */}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        startIcon={<TuneIcon />}
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        sx={{ color: '#E7C873' }}
                    >
                        {showAdvanced ? 'Ẩn bộ lọc nâng cao' : 'Hiện bộ lọc nâng cao'}
                    </Button>
                </Box>

                {/* Advanced Filters */}
                {showAdvanced && (
                    <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e0e0e0' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                            Bộ lọc nâng cao
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Thành phố</InputLabel>
                                    <Select
                                        value={filters.city}
                                        label="Thành phố"
                                        onChange={(e) => handleFilterChange('city', e.target.value)}
                                    >
                                        {cityOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Quận/Huyện</InputLabel>
                                    <Select
                                        value={filters.district}
                                        label="Quận/Huyện"
                                        onChange={(e) => handleFilterChange('district', e.target.value)}
                                    >
                                        {districtOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    fullWidth
                                    label="Giá tối thiểu (tỷ VNĐ)"
                                    type="number"
                                    value={filters.minPrice}
                                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                    placeholder="0"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    fullWidth
                                    label="Giá tối đa (tỷ VNĐ)"
                                    type="number"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                    placeholder="100"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    fullWidth
                                    label="Diện tích tối thiểu (m²)"
                                    type="number"
                                    value={filters.minArea}
                                    onChange={(e) => handleFilterChange('minArea', e.target.value)}
                                    placeholder="0"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    fullWidth
                                    label="Diện tích tối đa (m²)"
                                    type="number"
                                    value={filters.maxArea}
                                    onChange={(e) => handleFilterChange('maxArea', e.target.value)}
                                    placeholder="1000"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {/* Action Buttons */}
                <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        startIcon={<ClearIcon />}
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
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            Bộ lọc đang áp dụng:
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {filters.search && (
                                <Chip
                                    label={`Tìm kiếm: ${filters.search}`}
                                    onDelete={() => handleFilterChange('search', '')}
                                    size="small"
                                    sx={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}
                                />
                            )}
                            {filters.type !== 'all' && (
                                <Chip
                                    label={`Loại: ${typeOptions.find(opt => opt.value === filters.type)?.label}`}
                                    onDelete={() => handleFilterChange('type', 'all')}
                                    size="small"
                                    sx={{ backgroundColor: '#e8f5e8', color: '#388e3c' }}
                                />
                            )}
                            {filters.status !== 'all' && (
                                <Chip
                                    label={`Trạng thái: ${statusOptions.find(opt => opt.value === filters.status)?.label}`}
                                    onDelete={() => handleFilterChange('status', 'all')}
                                    size="small"
                                    sx={{ backgroundColor: '#fff3e0', color: '#f57c00' }}
                                />
                            )}
                            {filters.city !== 'all' && (
                                <Chip
                                    label={`Thành phố: ${cityOptions.find(opt => opt.value === filters.city)?.label}`}
                                    onDelete={() => handleFilterChange('city', 'all')}
                                    size="small"
                                    sx={{ backgroundColor: '#f3e5f5', color: '#7b1fa2' }}
                                />
                            )}
                        </Stack>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default ProjectFilters;
