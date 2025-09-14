'use client';

import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const SignInCTA: React.FC = () => {
    return (
        <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
            <Container maxWidth="lg">
                <Box
                    sx={{
                        background: '#1F4B42',
                        borderRadius: '16px',
                        p: { xs: 3, sm: 4, md: 6 },
                        position: 'relative',
                        overflow: 'hidden',
                        minHeight: { xs: '200px', sm: '220px', md: '242px' },
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 2, sm: 3, md: 4 },
                        flexDirection: { xs: 'column', md: 'row' },
                        textAlign: { xs: 'center', md: 'left' },
                    }}
                >
                    <Box sx={{ flex: 1, width: { xs: '100%', md: 'auto' } }}>
                        <Typography
                            variant="h2"
                            component="h2"
                            sx={{
                                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '1.875rem' },
                                fontWeight: 700,
                                color: 'white',
                                mb: { xs: 1.5, md: 2 },
                                lineHeight: 1.2,
                            }}
                        >
                            Đăng Nhập Để Tối Ưu Hóa Tìm Kiếm
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.9375rem', lg: '1rem' },
                                color: 'white',
                                maxWidth: { xs: '100%', md: '600px' },
                                lineHeight: 1.6,
                                opacity: 0.9,
                                mx: { xs: 'auto', md: 0 },
                            }}
                        >
                            Lưu bất động sản yêu thích, tạo thông báo giá và theo dõi các yêu cầu tư vấn bạn gửi đến chuyên gia.
                        </Typography>
                    </Box>

                    <Box sx={{ flexShrink: 0, width: { xs: '100%', md: 'auto' } }}>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: '#E7C873',
                                color: '#1F4B42',
                                px: { xs: 3, sm: 4 },
                                py: 2,
                                fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem' },
                                fontWeight: 600,
                                borderRadius: '12px',
                                textTransform: 'none',
                                minWidth: { xs: '100%', sm: '240px', md: '272px' },
                                height: { xs: '48px', sm: '50px', md: '54px' },
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                '&:hover': {
                                    bgcolor: '#d4b85a',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                            aria-label="Đăng nhập hoặc tạo tài khoản"
                        >
                            Đăng nhập hoặc tạo tài khoản
                            <ArrowForwardIcon sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }} />
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default SignInCTA;