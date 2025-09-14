'use client'

import React from 'react';
import { Box, Container, Typography, Card, CardContent, Chip, Button } from '@mui/material';
import { LocationOn, Bed, Bathroom, SquareFoot, ArrowForward } from '@mui/icons-material';
import OptimizedImage from '@/components/common/OptimizedImage';

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
        type: 'Đang bán',
        status: 'Mới',
        features: ['Hồ bơi', 'Vườn', 'Chỗ đậu xe']
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
        type: 'Đang bán',
        status: 'Mới',
        features: ['Gym', 'Hồ bơi', 'Chỗ đậu xe']
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
        type: 'Đang bán',
        status: 'Mới',
        features: ['Vườn', 'Garage', 'An ninh']
    },
    {
        id: 4,
        title: 'Căn Hộ Trung Tâm',
        location: 'Quận 3, TP.HCM',
        price: '7.5 tỷ',
        area: '100m²',
        bedrooms: 2,
        bathrooms: 2,
        image: '/anh_4.png',
        type: 'Đang bán',
        status: 'Mới',
        features: ['View thành phố', 'Gym', 'Hồ bơi']
    },
    {
        id: 5,
        title: 'Nhà Ngoại Ô',
        location: 'Quận 9, TP.HCM',
        price: '3.8 tỷ',
        area: '220m²',
        bedrooms: 4,
        bathrooms: 3,
        image: '/anh_5.png',
        type: 'Đang bán',
        status: 'Mới',
        features: ['Vườn', 'Garage', 'Gần trường học']
    },
    {
        id: 6,
        title: 'Bất Động Sản Biển',
        location: 'Nha Trang, Khánh Hòa',
        price: '12 tỷ',
        area: '300m²',
        bedrooms: 5,
        bathrooms: 4,
        image: '/anh_1.png',
        type: 'Đang bán',
        status: 'Mới',
        features: ['View biển', 'Hồ bơi', 'Tiếp cận bãi biển']
    }
];

const FeaturedProperties: React.FC = () => {
    return (
        <Box sx={{ py: 8 }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            fontWeight: 700,
                            color: '#1a1a1a',
                            mb: 2
                        }}
                    >
                        Bất Động Sản Nổi Bật
                    </Typography>
                    <Typography
                        variant="h3"
                        component="h3"
                        sx={{
                            color: '#495057',
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.6,
                            fontSize: '1.25rem',
                            fontWeight: 400
                        }}
                    >
                        Khám phá bộ sưu tập bất động sản được chọn lọc kỹ lưỡng
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                    gap: 4
                }}>
                    {properties.map((property) => (
                        <Box key={property.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    borderRadius: 3,
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                                    }
                                }}
                            >
                                <Box sx={{ position: 'relative', height: 250 }}>
                                    <OptimizedImage
                                        src={property.image}
                                        alt={`${property.title} - ${property.location}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={false}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: 'linear-gradient(45deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))',
                                            zIndex: 1,
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            left: 16,
                                            zIndex: 1
                                        }}
                                    >
                                        <Chip
                                            label={property.status}
                                            sx={{
                                                backgroundColor: '#4caf50',
                                                color: 'white',
                                                fontWeight: 600
                                            }}
                                        />
                                    </Box>

                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            right: 16,
                                            zIndex: 1
                                        }}
                                    >
                                        <Chip
                                            label={property.type}
                                            sx={{
                                                backgroundColor: '#E7C873',
                                                color: 'black',
                                                fontWeight: 600
                                            }}
                                        />
                                    </Box>
                                </Box>

                                <CardContent sx={{ p: 3 }}>
                                    <Typography
                                        variant="h4"
                                        component="h4"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#1a1a1a',
                                            mb: 1,
                                            lineHeight: 1.3,
                                            fontSize: '1.25rem'
                                        }}
                                    >
                                        {property.title}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <LocationOn sx={{ fontSize: 16, color: '#6c757d', mr: 0.5 }} />
                                        <Typography variant="body2" sx={{ color: '#495057' }}>
                                            {property.location}
                                        </Typography>
                                    </Box>

                                    <Typography
                                        variant="h5"
                                        component="h5"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#E7C873',
                                            mb: 2
                                        }}
                                    >
                                        {property.price}
                                    </Typography>

                                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Bed sx={{ fontSize: 16, color: '#6c757d', mr: 0.5 }} />
                                            <Typography variant="body2" sx={{ color: '#495057' }}>
                                                {property.bedrooms}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Bathroom sx={{ fontSize: 16, color: '#495057', mr: 0.5 }} />
                                            <Typography variant="body2" sx={{ color: '#495057' }}>
                                                {property.bathrooms}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <SquareFoot sx={{ fontSize: 16, color: '#495057', mr: 0.5 }} />
                                            <Typography variant="body2" sx={{ color: '#495057' }}>
                                                {property.area}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
                                        {property.features.map((feature, idx) => (
                                            <Chip
                                                key={idx}
                                                label={feature}
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#e9ecef',
                                                    color: '#495057',
                                                    fontSize: '0.75rem'
                                                }}
                                            />
                                        ))}
                                    </Box>

                                    <Button
                                        variant="outlined"
                                        endIcon={<ArrowForward />}
                                        fullWidth
                                        sx={{
                                            borderColor: '#E7C873',
                                            color: '#E7C873',
                                            fontWeight: 600,
                                            py: 1,
                                            '&:hover': {
                                                backgroundColor: '#E7C873',
                                                color: 'white',
                                                borderColor: '#E7C873',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>

                <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForward />}
                        sx={{
                            backgroundColor: '#E7C873',
                            color: 'black',
                            fontWeight: 700,
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            textTransform: 'none',
                            fontSize: '1.1rem',
                            '&:hover': {
                                backgroundColor: '#d4b85a',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Xem Tất Cả Bất Động Sản
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default FeaturedProperties;
