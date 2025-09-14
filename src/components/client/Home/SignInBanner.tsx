'use client'

import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Login, PersonAdd, ArrowForward } from '@mui/icons-material';

const SignInBanner: React.FC = () => {
    return (
        <Box
            sx={{
                py: 8,
                background: 'linear-gradient(135deg, #E7C873 0%, #1F4B43 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url("/patterns/dots.png")',
                    opacity: 0.1,
                }
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
                    <Box sx={{ flex: 2 }}>
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontSize: { xs: '1.8rem', md: '2.5rem' },
                                fontWeight: 700,
                                mb: 2,
                                lineHeight: 1.2
                            }}
                        >
                            Bắt Đầu Hành Trình Đầu Tư Của Bạn
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                mb: 4,
                                opacity: 0.9,
                                lineHeight: 1.6,
                                maxWidth: '600px'
                            }}
                        >
                            Tham gia cộng đồng hơn 10,000 nhà đầu tư thông minh.
                            Nhận thông tin dự án mới nhất và cơ hội đầu tư tốt nhất.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                startIcon={<Login />}
                                endIcon={<ArrowForward />}
                                sx={{
                                    backgroundColor: 'white',
                                    color: '#1F4B43',
                                    fontWeight: 700,
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Đăng Nhập
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={<PersonAdd />}
                                sx={{
                                    borderColor: 'white',
                                    color: 'white',
                                    fontWeight: 700,
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        borderColor: 'white',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Đăng Ký
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                p: 4,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: 4,
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    color: '#E7C873'
                                }}
                            >
                                Miễn Phí
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 3,
                                    opacity: 0.9
                                }}
                            >
                                Tư vấn chuyên nghiệp
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#E7C873' }}>
                                        24/7
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        Hỗ trợ
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#E7C873' }}>
                                        100%
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        Miễn phí
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography
                                variant="body2"
                                sx={{
                                    opacity: 0.8,
                                    fontStyle: 'italic'
                                }}
                            >
                                "Đầu tư thông minh, tương lai vững chắc"
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default SignInBanner;
