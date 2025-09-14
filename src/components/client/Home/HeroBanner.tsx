'use client'

import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    Select,
    MenuItem,
    Container,
    IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
    FilterList as FilterIcon,
    KeyboardArrowDown as ArrowDownIcon,
    Search as SearchIcon,
    ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

const HeroBanner: React.FC = () => {
    const [keyword, setKeyword] = useState('');
    const [region, setRegion] = useState('');
    const [type, setType] = useState('');

    const handleSearch = () => {
        console.warn('Search:', { keyword, region, type });
    };

    const regionOptions = [
        { value: '', label: 'Tất cả khu vực' },
        { value: 'hcm', label: 'TP. Hồ Chí Minh' },
        { value: 'hanoi', label: 'Hà Nội' },
        { value: 'danang', label: 'Đà Nẵng' },
        { value: 'nhatrang', label: 'Nha Trang' },
        { value: 'phuquoc', label: 'Phú Quốc' },
    ];

    const typeOptions = [
        { value: '', label: 'Tất cả loại' },
        { value: 'apartment', label: 'Chung cư' },
        { value: 'house', label: 'Nhà phố' },
        { value: 'villa', label: 'Biệt thự' },
        { value: 'land', label: 'Đất nền' },
        { value: 'commercial', label: 'Thương mại' },
    ];


    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: { xs: 'calc(100vh - 80px)', md: 'calc(100vh - 142.5px)' },
                display: 'flex',
                flexDirection: 'column',
                color: 'white',
            }}
        >
            {/* Hero Content */}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2, pt: { xs: 14, md: 20 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center' }}>
                        {/* Property Specs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    fontWeight: 400,
                                    letterSpacing: '0.5px',
                                    mb: 4,
                                }}
                            >
                                5 Phòng ngủ - 2 Phòng tắm - 180 m²
                            </Typography>
                        </motion.div>

                        {/* Main Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Typography
                                component="h1"
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '2.5rem', md: '4rem' },
                                    fontWeight: 'bold',
                                    color: 'white',
                                    mb: 4,
                                    lineHeight: 1.1,
                                }}
                            >
                                Không Gian Văn Phòng Tại Tây Bắc
                            </Typography>
                        </motion.div>

                        {/* Price */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Typography
                                component="h2"
                                variant="h3"
                                sx={{
                                    color: 'white',
                                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                                    fontWeight: 600,
                                    mb: 6,
                                }}
                            >
                                250 triệu/tháng
                            </Typography>
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Button
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => console.warn('View Details')}
                                sx={{
                                    backgroundColor: '#E7C873',
                                    color: 'black',
                                    fontWeight: 'bold',
                                    px: { xs: 4, md: 5 },
                                    py: { xs: 1.5, md: 1.8 },
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    mb: 4,
                                    '&:hover': {
                                        backgroundColor: '#d4b85a',
                                    },
                                }}
                            >
                                Xem chi tiết →
                            </Button>
                        </motion.div>
                    </Box>
                </Container>
            </Box>

            {/* Search Form */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            backgroundColor: '#1a1a1a',
                            borderRadius: 3,
                            p: 3,
                            mb: 4,
                            mt: 4,
                            boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 8px 25px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                            position: 'relative',
                            zIndex: 2,
                            border: '1px solid rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                gap: { xs: 3, md: 0 },
                                alignItems: { xs: 'stretch', md: 'center' },
                            }}
                        >
                            {/* Keyword Input */}
                            <Box sx={{
                                flex: 1,
                                position: 'relative',
                                width: { xs: '100%', md: 'auto' },
                                borderRight: { md: '1px solid rgba(255, 255, 255, 0.1)' },
                                pr: { md: 2 },
                                pb: { xs: 2, md: 0 },
                            }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        fontSize: '0.875rem',
                                        mb: 1,
                                        fontWeight: 500,
                                    }}
                                >
                                    Keyword
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter Keyword"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: 'transparent',
                                            '& fieldset': {
                                                border: 'none',
                                            },
                                            '&:hover fieldset': {
                                                border: 'none',
                                            },
                                            '&.Mui-focused fieldset': {
                                                border: 'none',
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'white',
                                            fontSize: '1rem',
                                            py: 1.5,
                                        },
                                    }}
                                />
                            </Box>

                            {/* Region Select */}
                            <Box sx={{
                                flex: 1,
                                position: 'relative',
                                width: { xs: '100%', md: 'auto' },
                                borderRight: { md: '1px solid rgba(255, 255, 255, 0.1)' },
                                pr: { md: 2 },
                                pb: { xs: 2, md: 0 },
                            }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        fontSize: '0.875rem',
                                        mb: 1,
                                        fontWeight: 500,
                                    }}
                                >
                                    Status
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                        displayEmpty
                                        IconComponent={ArrowDownIcon}
                                        inputProps={{
                                            'aria-label': 'Chọn khu vực',
                                        }}
                                        MenuProps={{
                                            disableScrollLock: true,
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: '#2a2a2a',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: 2,
                                                    mt: 0.5,
                                                    maxHeight: 300,
                                                    maxWidth: 'calc(100vw - 48px)',
                                                    '& .MuiMenuItem-root': {
                                                        color: 'white',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                                        },
                                                        '&.Mui-selected': {
                                                            backgroundColor: 'rgba(231,200,115,0.2)',
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                        sx={{
                                            color: 'white',
                                            backgroundColor: 'transparent',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                            '& .MuiSelect-icon': {
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        {regionOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            {/* Type Select */}
                            <Box sx={{
                                flex: 1,
                                position: 'relative',
                                width: { xs: '100%', md: 'auto' },
                                borderRight: { md: '1px solid rgba(255, 255, 255, 0.1)' },
                                pr: { md: 2 },
                                pb: { xs: 2, md: 0 },
                            }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        fontSize: '0.875rem',
                                        mb: 1,
                                        fontWeight: 500,
                                    }}
                                >
                                    Type
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        displayEmpty
                                        IconComponent={ArrowDownIcon}
                                        inputProps={{
                                            'aria-label': 'Chọn loại bất động sản',
                                        }}
                                        MenuProps={{
                                            disableScrollLock: true,
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: '#2a2a2a',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: 2,
                                                    mt: 0.5,
                                                    maxHeight: 300,
                                                    maxWidth: 'calc(100vw - 48px)',
                                                    '& .MuiMenuItem-root': {
                                                        color: 'white',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                                        },
                                                        '&.Mui-selected': {
                                                            backgroundColor: 'rgba(231,200,115,0.2)',
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                        sx={{
                                            color: 'white',
                                            backgroundColor: 'transparent',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                            '& .MuiSelect-icon': {
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        {typeOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            {/* Filter Button */}
                            <Box sx={{
                                px: { xs: 0, md: 2 },
                                width: { xs: '100%', md: 'auto' },
                                pb: { xs: 2, md: 0 },
                            }}>
                                <IconButton
                                    aria-label="Lọc tìm kiếm"
                                    sx={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: 'white',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: 3,
                                        px: { xs: 2, md: 3 },
                                        py: 1.5,
                                        width: { xs: '100%', md: 'auto' },
                                        minHeight: { xs: '48px', md: 'auto' },
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        },
                                    }}
                                >
                                    <FilterIcon sx={{ mr: 1 }} />
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        Filter
                                    </Typography>
                                </IconButton>
                            </Box>

                            {/* Search Button */}
                            <Box sx={{ width: { xs: '100%', md: 'auto' } }}>
                                <Button
                                    variant="contained"
                                    onClick={handleSearch}
                                    startIcon={<SearchIcon />}
                                    sx={{
                                        backgroundColor: '#E7C873',
                                        color: 'black',
                                        fontWeight: 'bold',
                                        px: { xs: 3, md: 4 },
                                        py: 1.5,
                                        borderRadius: 3,
                                        textTransform: 'none',
                                        fontSize: { xs: '0.9rem', md: '1rem' },
                                        width: { xs: '100%', md: 'auto' },
                                        minHeight: { xs: '48px', md: 'auto' },
                                        '&:hover': {
                                            backgroundColor: '#d4b85a',
                                        },
                                    }}
                                >
                                    Search
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </motion.div>
        </Box>
    );
};

export default HeroBanner;
