'use client';

import React, { useState } from 'react';
import { Box, Typography, Container, Card, CardContent, Button, Chip, Tabs, Tab } from '@mui/material';
import { LocationOn, Bed, Bathroom, SquareFoot, ArrowForward } from '@mui/icons-material';

const properties = [
    {
        id: 1,
        title: 'Biệt Thự Sang Trọng Có Hồ Bơi',
        location: 'Quận 7, TP.HCM',
        price: '8.9 tỷ',
        area: '250m²',
        bedrooms: 4,
        bathrooms: 3,
        image: '/anh_1.png',
        type: 'ĐANG BÁN',
        featured: true,
    },
    {
        id: 2,
        title: 'Chung Cư Hiện Đại',
        location: 'Quận 1, TP.HCM',
        price: '6.5 tỷ',
        area: '120m²',
        bedrooms: 2,
        bathrooms: 2,
        image: '/anh_2.png',
        type: 'ĐANG BÁN',
        featured: false,
    },
    {
        id: 3,
        title: 'Nhà Gia Đình Ấm Cúng',
        location: 'Cầu Giấy, Hà Nội',
        price: '4.5 tỷ',
        area: '180m²',
        bedrooms: 3,
        bathrooms: 2,
        image: '/anh_3.png',
        type: 'CHO THUÊ',
        featured: false,
    },
    {
        id: 4,
        title: 'Căn Hộ Penthouse Cao Cấp',
        location: 'Quận 3, TP.HCM',
        price: '7.5 tỷ',
        area: '100m²',
        bedrooms: 2,
        bathrooms: 2,
        image: '/anh_4.png',
        type: 'ĐANG BÁN',
        featured: true,
    },
    {
        id: 5,
        title: 'Căn Hộ View Đẹp Mới',
        location: 'Quận 2, TP.HCM',
        price: '15 triệu/tháng',
        area: '80m²',
        bedrooms: 2,
        bathrooms: 1,
        image: '/anh_5.png',
        type: 'CHO THUÊ',
        featured: true,
    },
    {
        id: 6,
        title: 'Chung Cư Diamond Manor',
        location: 'Quận 9, TP.HCM',
        price: '5.2 tỷ',
        area: '150m²',
        bedrooms: 3,
        bathrooms: 2,
        image: '/anh_1.png',
        type: 'ĐANG BÁN',
        featured: true,
    },
];

const categories = ['Tất Cả BĐS', 'Biệt Thự', 'Chung Cư', 'Văn Phòng'];

const SimpleFeaturedProperties: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState(0);

    const handleCategoryChange = (_event: React.SyntheticEvent, newValue: number) => {
        setSelectedCategory(newValue);
    };

    return (
        <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#ffffff' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            fontWeight: 700,
                            color: '#1a1a1a',
                            mb: 2,
                            lineHeight: 1.2,
                        }}
                    >
                        Bất Động Sản Nổi Bật
                    </Typography>
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            color: '#666',
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.6,
                        }}
                    >
                        Khám phá bộ sưu tập bất động sản được chọn lọc kỹ lưỡng
                    </Typography>
                </Box>

                {/* Category Tabs */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                    <Tabs
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        sx={{
                            '& .MuiTabs-indicator': {
                                display: 'none',
                            },
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: '#1a1a1a',
                                px: 3,
                                py: 1,
                                borderRadius: '40px',
                                minHeight: '40px',
                                '&.Mui-selected': {
                                    backgroundColor: '#f8f9fa',
                                    color: '#1a1a1a',
                                    border: '1px solid #1a1a1a',
                                },
                            },
                        }}
                    >
                        {categories.map((category, index) => (
                            <Tab key={index} label={category} />
                        ))}
                    </Tabs>
                </Box>

                {/* Properties Grid */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)'
                    },
                    gap: { xs: 3, sm: 4, md: 4 },
                    px: { xs: 1, sm: 0 }
                }}>
                    {properties.map((property) => (
                        <Card
                            key={property.id}
                            sx={{
                                borderRadius: '16px',
                                overflow: 'hidden',
                                height: '446px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundImage: `url(${property.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(26,26,26,0.1) 60%, rgba(26,26,26,0.8) 100%)',
                                    zIndex: 1,
                                }}
                            />

                            {/* Status Tags */}
                            <Box sx={{ position: 'absolute', top: 24, left: 20, zIndex: 2, display: 'flex', gap: 1 }}>
                                <Chip
                                    label={property.type}
                                    sx={{
                                        backgroundColor: '#1F4B42',
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '0.875rem',
                                        height: '33px',
                                        borderRadius: '33px',
                                        '& .MuiChip-label': {
                                            px: 2,
                                        },
                                    }}
                                />
                                {property.featured && (
                                    <Chip
                                        label="Featured"
                                        sx={{
                                            backgroundColor: '#E7C873',
                                            color: '#1a1a1a',
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            height: '33px',
                                            borderRadius: '33px',
                                            '& .MuiChip-label': {
                                                px: 2,
                                            },
                                        }}
                                    />
                                )}
                            </Box>

                            {/* Property Info */}
                            <CardContent
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    p: 5,
                                    zIndex: 2,
                                    color: 'white',
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    component="h3"
                                    sx={{
                                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                                        fontWeight: 700,
                                        color: 'white',
                                        mb: 1,
                                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {property.title}
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <LocationOn sx={{ fontSize: 20, color: 'white', mr: 1 }} />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'white',
                                            fontSize: '0.875rem',
                                            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                        }}
                                    >
                                        {property.location}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Bed sx={{ fontSize: 20, color: 'white', mr: 1 }} />
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'white',
                                                fontSize: '0.875rem',
                                                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                            }}
                                        >
                                            {property.bedrooms}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Bathroom sx={{ fontSize: 20, color: 'white', mr: 1 }} />
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'white',
                                                fontSize: '0.875rem',
                                                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                            }}
                                        >
                                            {property.bathrooms}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <SquareFoot sx={{ fontSize: 20, color: 'white', mr: 1 }} />
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'white',
                                                fontSize: '0.875rem',
                                                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                            }}
                                        >
                                            {property.area}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            fontWeight: 700,
                                            color: 'white',
                                            fontSize: { xs: '1.25rem', md: '1.5rem' },
                                            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                        }}
                                    >
                                        {property.price}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                {/* See All Button */}
                <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForward />}
                        sx={{
                            backgroundColor: '#E7C873',
                            color: '#1a1a1a',
                            fontWeight: 600,
                            px: 4,
                            py: 2,
                            borderRadius: '60px',
                            textTransform: 'none',
                            fontSize: '1rem',
                            height: '54px',
                            minWidth: '180px',
                            '&:hover': {
                                backgroundColor: '#d4b85a',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                        aria-label="Xem Tất Cả Danh Sách"
                    >
                        Xem Tất Cả Danh Sách
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default SimpleFeaturedProperties;
