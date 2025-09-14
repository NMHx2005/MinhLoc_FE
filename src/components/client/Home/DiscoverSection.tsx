'use client';

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const DiscoverSection: React.FC = () => {
    return (
        <Box
            component="section"
            sx={{
                position: 'relative',
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                height: { xs: '400px', sm: '500px', md: '600px', lg: '750px' },
                backgroundImage: 'url("/banner_next.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
                    zIndex: 1,
                },
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                <Box
                    sx={{
                        textAlign: 'center',
                        maxWidth: '610px',
                        mx: 'auto',
                        px: { xs: 2, sm: 3 },
                    }}
                >
                    {/* Tiêu đề chính */}
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                            fontWeight: 700,
                            color: 'white',
                            mb: { xs: 2, sm: 3 },
                            lineHeight: 1.2,
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        }}
                    >
                        Khám Phá Nơi Bạn Sẽ Yêu Thích Sống
                    </Typography>

                    {/* Mô tả */}
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                            color: 'white',
                            mb: { xs: 3, sm: 4 },
                            lineHeight: 1.6,
                            opacity: 0.95,
                            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                        }}
                    >
                        Pellentesque egestas elementum egestas faucibus sem. Velit nunc egestas ut morbi. Leo diam diam
                    </Typography>

                    {/* Button */}
                    <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            backgroundColor: '#E6C873',
                            color: '#1A1A1A',
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            fontWeight: 600,
                            px: { xs: 3, sm: 4 },
                            py: { xs: 1.5, sm: 2 },
                            borderRadius: '12px',
                            textTransform: 'none',
                            boxShadow: '0 4px 12px rgba(230, 200, 115, 0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#D4B85A',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 16px rgba(230, 200, 115, 0.4)',
                            },
                            '&:active': {
                                transform: 'translateY(0)',
                            },
                        }}
                        aria-label="Xem Bất Động Sản"
                    >
                        Xem Bất Động Sản
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default DiscoverSection;