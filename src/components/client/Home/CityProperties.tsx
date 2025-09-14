'use client';

import React from 'react';
import { Box, Typography, Container, Card, CardMedia, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import OptimizedImage from '@/components/common/OptimizedImage';

const CityCard = styled(Card)(() => ({
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    height: '200px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    },
}));

const CityOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(2),
    zIndex: 1,
}));

const cities = [
    {
        id: 1,
        name: 'TP. Hồ Chí Minh',
        properties: 156,
        image: '/cities/hcm.jpg',
        alt: 'Bất động sản TP. Hồ Chí Minh - Chung cư, biệt thự cao cấp',
    },
    {
        id: 2,
        name: 'Hà Nội',
        properties: 89,
        image: '/cities/hanoi.jpg',
        alt: 'Bất động sản Hà Nội - Nhà phố, chung cư trung tâm',
    },
    {
        id: 3,
        name: 'Đà Nẵng',
        properties: 45,
        image: '/cities/danang.jpg',
        alt: 'Bất động sản Đà Nẵng - Biệt thự biển, resort',
    },
    {
        id: 4,
        name: 'Nha Trang',
        properties: 32,
        image: '/cities/nhatrang.jpg',
        alt: 'Bất động sản Nha Trang - Condotel, villa biển',
    },
    {
        id: 5,
        name: 'Phú Quốc',
        properties: 28,
        image: '/cities/phuquoc.jpg',
        alt: 'Bất động sản Phú Quốc - Resort, villa đảo',
    },
];

const CityProperties: React.FC = () => {
    return (
        <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#fafafa' }}>
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

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' },
                        gap: 3,
                    }}
                >
                    {cities.map((city) => (
                        <Box key={city.id}>
                            <CityCard>
                                <CardMedia sx={{ height: '100%', position: 'relative' }}>
                                    <OptimizedImage
                                        src={city.image}
                                        alt={city.alt}
                                        fill
                                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, (max-width: 1280px) 33vw, 20vw"
                                    />
                                    <CityOverlay>
                                        <Typography
                                            variant="h5"
                                            component="h3"
                                            sx={{
                                                color: 'white',
                                                fontWeight: 700,
                                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                                mb: 1,
                                                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                            }}
                                        >
                                            {city.name}
                                        </Typography>
                                        <Chip
                                            label={`${city.properties} Bất động sản`}
                                            sx={{
                                                bgcolor: 'rgba(255,255,255,0.9)',
                                                color: '#1a1a1a',
                                                fontWeight: 600,
                                                fontSize: '0.875rem',
                                                '& .MuiChip-label': {
                                                    px: 2,
                                                },
                                            }}
                                        />
                                    </CityOverlay>
                                </CardMedia>
                            </CityCard>
                        </Box>
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

export default CityProperties;
