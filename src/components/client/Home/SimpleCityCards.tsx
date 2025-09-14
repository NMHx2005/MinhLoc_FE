'use client'

import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const cities = [
    {
        name: 'TP. Hồ Chí Minh',
        image: '/hcm.png'
    },
    {
        name: 'Hà Nội',
        image: '/hanoi.png'
    },
    {
        name: 'Đà Nẵng',
        image: '/dn.png'
    },
    {
        name: 'Nha Trang',
        image: '/nhatrang.png'
    }
];

const SimpleCityCards: React.FC = () => {
    return (
        <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
            <Container maxWidth="lg">
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 4,
                    overflowX: 'auto',
                    pb: 2
                }}>
                    {cities.map((city) => (
                        <Box key={city.name} sx={{
                            flex: '0 0 auto',
                            minWidth: { xs: '280px', sm: '300px' }
                        }}>
                            <Box
                                sx={{
                                    height: 200,
                                    backgroundImage: `url(${city.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: 3,
                                    position: 'relative',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                    }
                                }}
                                role="img"
                                aria-label={`Bất động sản tại ${city.name}`}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                        p: 3,
                                        borderRadius: '0 0 12px 12px'
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        component="h4"
                                        sx={{
                                            color: 'white',
                                            fontWeight: 700,
                                            fontSize: '1.2rem'
                                        }}
                                    >
                                        {city.name}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default SimpleCityCards;
