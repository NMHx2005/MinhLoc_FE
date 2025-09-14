'use client'

import React from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { LocationOn, TrendingUp, Home } from '@mui/icons-material';

const cities = [
    {
        name: 'TP. Hồ Chí Minh',
        projects: 25,
        properties: 1200,
        icon: <LocationOn sx={{ fontSize: 40, color: '#E7C873' }} />,
        description: 'Trung tâm kinh tế lớn nhất Việt Nam',
        image: '/images/hcm-city.jpg'
    },
    {
        name: 'Hà Nội',
        projects: 18,
        properties: 850,
        icon: <TrendingUp sx={{ fontSize: 40, color: '#E7C873' }} />,
        description: 'Thủ đô với tiềm năng phát triển mạnh',
        image: '/images/hanoi-city.jpg'
    },
    {
        name: 'Đà Nẵng',
        projects: 12,
        properties: 450,
        icon: <Home sx={{ fontSize: 40, color: '#E7C873' }} />,
        description: 'Thành phố đáng sống nhất Việt Nam',
        image: '/images/danang-city.jpg'
    }
];

const CityCards: React.FC = () => {
    return (
        <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
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
                        Dự Án Tại Các Thành Phố Lớn
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#6c757d',
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.6
                        }}
                    >
                        Khám phá các dự án bất động sản cao cấp tại những thành phố phát triển nhất Việt Nam
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    {cities.map((city) => (
                        <Box key={city.name} sx={{ flex: 1 }}>
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
                                <Box
                                    sx={{
                                        height: 200,
                                        backgroundImage: `url(${city.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        position: 'relative',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: 'linear-gradient(45deg, rgba(231, 200, 115, 0.8), rgba(26, 35, 126, 0.8))',
                                        }
                                    }}
                                    role="img"
                                    aria-label={`Hình ảnh thành phố ${city.name}`}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            zIndex: 1
                                        }}
                                    >
                                        {city.icon}
                                    </Box>
                                </Box>

                                <CardContent sx={{ p: 3 }}>
                                    <Typography
                                        variant="h5"
                                        component="h3"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#1a1a1a',
                                            mb: 2
                                        }}
                                    >
                                        {city.name}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#6c757d',
                                            mb: 3,
                                            lineHeight: 1.6
                                        }}
                                    >
                                        {city.description}
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#E7C873' }}>
                                                {city.projects}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#6c757d' }}>
                                                Dự án
                                            </Typography>
                                        </Box>
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#E7C873' }}>
                                                {city.properties}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#6c757d' }}>
                                                Bất động sản
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default CityCards;
