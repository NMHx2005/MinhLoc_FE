'use client';

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AboutSection: React.FC = () => {
    const stats = [
        {
            number: '18 Tỷ',
            label: 'Giá Trị Giao Dịch Bất Động Sản',
            icon: '💰',
            color: '#4CAF50',
        },
        {
            number: '15K+',
            label: 'Bất Động Sản Đang Bán',
            icon: '🏠',
            color: '#2196F3',
        },
        {
            number: '26K+',
            label: 'Bất Động Sản Cần Mua',
            icon: '🔍',
            color: '#FF9800',
        },
        {
            number: '890',
            label: 'Giao Dịch Hoàn Thành Hàng Ngày',
            icon: '✅',
            color: '#9C27B0',
        },
    ];

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 6, md: 8, lg: 10 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
                <Box
                >
                    {/* Left Column - Text and Stats */}
                    <Box>
                        <Box sx={{ pr: { md: 4 } }}>
                            {/* Main Heading */}
                            <Typography
                                variant="h2"
                                component="h2"
                                sx={{
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                                    fontWeight: 700,
                                    color: '#1a1a1a',
                                    mb: { xs: 2, sm: 3 },
                                    lineHeight: 1.2,
                                }}
                            >
                                Chúng Tôi Sử Dụng Bất Động Sản Để Thể Hiện Sự Trân Trọng Với Thế Giới
                            </Typography>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                                    gap: { xs: 4, md: 6 },
                                    alignItems: 'center',
                                }}>
                                <Box>
                                    {/* Sub Heading */}
                                    <Typography
                                        variant="h6"
                                        component="p"
                                        sx={{
                                            fontSize: { xs: '1.1rem', sm: '1.2rem' },
                                            color: '#666666',
                                            mb: { xs: 4, sm: 5 },
                                            lineHeight: 1.6,
                                            fontWeight: 400,
                                        }}
                                    >
                                        Với hơn 10 năm kinh nghiệm trong lĩnh vực bất động sản, chúng tôi cam kết mang đến
                                        những giải pháp đầu tư thông minh và dịch vụ tư vấn chuyên nghiệp.
                                    </Typography>

                                    {/* Statistics Grid */}
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                            gap: { xs: 3, sm: 4 },
                                            mb: { xs: 4, sm: 5 },
                                        }}
                                    >
                                        {stats.map((stat, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    textAlign: { xs: 'center', sm: 'left' },
                                                    p: { xs: 2, sm: 3 },
                                                    backgroundColor: '#f8f9fa',
                                                    borderRadius: '12px',
                                                    border: '1px solid #e9ecef',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        backgroundColor: '#f1f3f4',
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                    },
                                                }}
                                            >
                                                <Typography
                                                    variant="h3"
                                                    component="div"
                                                    sx={{
                                                        fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' },
                                                        fontWeight: 700,
                                                        color: '#1a1a1a',
                                                        mb: 1,
                                                    }}
                                                >
                                                    {stat.number}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        fontSize: { xs: '0.875rem', sm: '0.9rem' },
                                                        color: '#666666',
                                                        lineHeight: 1.4,
                                                    }}
                                                >
                                                    {stat.label}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>

                                    {/* Learn More Button */}
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
                                        aria-label="Tìm Hiểu Thêm"
                                    >
                                        Tìm Hiểu Thêm
                                    </Button>
                                </Box>
                                {/* Right Column - Image */}
                                <Box>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                paddingTop: '75%',
                                            },
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src="/modern-house.png"
                                            alt="Ngoi nha hien dai voi kien truc dep"
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                },
                                            }}
                                            onError={(e) => {
                                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDYwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPk5nJm9hY3V0ZTtpIG5oJmFncmF2ZTtuIGhpJm5hY3V0ZTtuIGRpJm5hY3V0ZTtuPC90ZXh0Pgo8L3N2Zz4K';
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
};

export default AboutSection;