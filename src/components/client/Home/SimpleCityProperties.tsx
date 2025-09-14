'use client';

import React from 'react';
import { Box, Typography, Container, Card, CardContent } from '@mui/material';

const cities = [
    {
        id: 1,
        name: 'TP. Hồ Chí Minh',
        properties: 156,
        image: '/hcm.png',
    },
    {
        id: 2,
        name: 'Hà Nội',
        properties: 89,
        image: '/hanoi.png',
    },
    {
        id: 3,
        name: 'Đà Nẵng',
        properties: 45,
        image: '/dn.png',
    },
    {
        id: 4,
        name: 'Nha Trang',
        properties: 32,
        image: '/nhatrang.png',
    },
    {
        id: 5,
        name: 'Phú Quốc',
        properties: 28,
        image: '/phuquoc.png',
    },
];

const SimpleCityProperties: React.FC = () => {
    return (
        <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
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
                        Tìm Bất Động Sản Theo Thành Phố
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
                        Khám phá các dự án bất động sản cao cấp tại các thành phố lớn nhất Việt Nam
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)',
                        xl: 'repeat(5, 1fr)'
                    },
                    gap: { xs: 2, sm: 3, md: 4 },
                    px: { xs: 1, sm: 0 }
                }}>
                    {cities.map((city) => (
                        <Card
                            key={city.id}
                            sx={{
                                borderRadius: '16px',
                                overflow: 'hidden',
                                height: { xs: '200px', sm: '250px', md: '300px', lg: '320px' },
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
                                    backgroundImage: `url(${city.image})`,
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
                                    background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(26, 26, 26, 0.1) 60%, rgba(0, 0, 0, 0) 100%)',
                                    zIndex: 1,
                                }}
                            />
                            <CardContent
                                sx={{
                                    p: { xs: 3, sm: 4, md: 5 },
                                    position: 'relative',
                                    zIndex: 2,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    component="h3"
                                    sx={{
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem', lg: '1.75rem' },
                                        mb: 1,
                                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {city.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'white',
                                        fontWeight: 400,
                                        fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem' },
                                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {city.properties} Bất động sản
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#666',
                            fontSize: '0.875rem',
                            '& a': {
                                color: '#E7C873',
                                textDecoration: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            },
                        }}
                    >
                        Xem tất cả thành phố và dự án bất động sản{' '}
                        <a href="/cities" aria-label="Xem tất cả thành phố">
                            tại đây
                        </a>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default SimpleCityProperties;
