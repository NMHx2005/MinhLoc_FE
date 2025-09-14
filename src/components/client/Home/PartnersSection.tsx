'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const partners = [
    {
        id: 1,
        name: 'Vingroup',
        logo: '/partner3.png',
        category: 'Tập Đoàn Bất Động Sản'
    },
    {
        id: 2,
        name: 'Novaland',
        logo: '/Novaland.png',
        category: 'Nhà Phát Triển Bất Động Sản'
    },
    {
        id: 3,
        name: 'Sun Group',
        logo: '/SunGroup.png',
        category: 'Tập Đoàn Du Lịch & Bất Động Sản'
    },
    {
        id: 4,
        name: 'Him Lam Land',
        logo: '/Him Lam Land.png',
        category: 'Nhà Phát Triển Bất Động Sản'
    },
    {
        id: 5,
        name: 'Nam Long',
        logo: '/Nam Long.webp',
        category: 'Tập Đoàn Bất Động Sản'
    },
    {
        id: 6,
        name: 'DIC Corp',
        logo: '/DIC Corp.png',
        category: 'Tập Đoàn Bất Động Sản'
    },
    {
        id: 7,
        name: 'An Gia',
        logo: '/An Gia.webp',
        category: 'Nhà Phát Triển Bất Động Sản'
    },
    {
        id: 8,
        name: 'Hưng Thịnh',
        logo: '/Hưng Thịnh.png',
        category: 'Tập Đoàn Bất Động Sản'
    },
    {
        id: 9,
        name: 'Becamex',
        logo: '/Becamex.png',
        category: 'Tập Đoàn Công Nghiệp & Bất Động Sản'
    },
    {
        id: 10,
        name: 'FLC Group',
        logo: '/FLC Group.webp',
        category: 'Tập Đoàn Đa Ngành'
    }
];

const PartnersSection: React.FC = () => {
    return (
        <Box
            component="section"
            sx={{
                py: { xs: 6, md: 8, lg: 10 },
                mb: { xs: 4, md: 6, lg: 8 },
                backgroundColor: '#ffffff',
                position: 'relative',
            }}
        >
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            fontWeight: 700,
                            color: '#1a1a1a',
                            mb: 2,
                            lineHeight: 1.2,
                        }}
                    >
                        Đối Tác Tin Cậy
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
                        Hàng nghìn công ty hàng đầu thế giới tin tưởng MinhLoc Group
                    </Typography>
                </Box>

                {/* Partners Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(3, 1fr)',
                            md: 'repeat(4, 1fr)',
                            lg: 'repeat(5, 1fr)',
                        },
                        gap: { xs: 2, sm: 3, md: 4 },
                        mb: { xs: 4, md: 6 },
                    }}
                >
                    {partners.map((partner) => (
                        <Box
                            key={partner.id}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: { xs: 80, sm: 100, md: 120 },
                                p: { xs: 2, sm: 3 },
                                backgroundColor: '#ffffff',
                                borderRadius: '16px',
                                border: '2px solid #f0f0f0',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                '&:hover': {
                                    backgroundColor: '#fafafa',
                                    transform: 'translateY(-6px)',
                                    borderColor: '#8B4513',
                                    boxShadow: '0 12px 32px rgba(139, 69, 19, 0.2)',
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src={partner.logo}
                                alt={partner.name}
                                sx={{
                                    maxWidth: '100%',
                                    maxHeight: { xs: '40px', sm: '50px', md: '60px' },
                                    objectFit: 'contain',
                                    filter: 'brightness(1.1) contrast(1.2) saturate(0.8)',
                                    opacity: 0.7,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        filter: 'brightness(1.3) contrast(1.4) saturate(1.2)',
                                        opacity: 1,
                                        transform: 'scale(1.05)',
                                    },
                                }}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    // Show text fallback
                                    const parent = e.currentTarget.parentElement;
                                    if (parent) {
                                        parent.innerHTML = `
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    color: '#8B4513', 
                                                    textAlign: 'center',
                                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                    fontWeight: 700,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px'
                                                }}
                                            >
                                                ${partner.name}
                                            </Typography>
                                        `;
                                    }
                                }}
                            />
                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#8B4513',
                                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                    textAlign: 'center',
                                    mt: 1,
                                    display: { xs: 'none', sm: 'block' },
                                    fontWeight: 500,
                                    opacity: 0.8,
                                }}
                            >
                                {partner.category}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* Bottom Stats */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                        gap: { xs: 3, sm: 4 },
                        mt: { xs: 4, md: 6 },
                        textAlign: 'center',
                    }}
                >
                    <Box>
                        <Typography
                            variant="h3"
                            component="div"
                            sx={{
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                fontWeight: 700,
                                color: '#8B4513',
                                mb: 1,
                            }}
                        >
                            500+
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                color: '#1a1a1a',
                                fontWeight: 500,
                            }}
                        >
                            Đối Tác Chiến Lược
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="h3"
                            component="div"
                            sx={{
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                fontWeight: 700,
                                color: '#8B4513',
                                mb: 1,
                            }}
                        >
                            50+
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                color: '#1a1a1a',
                                fontWeight: 500,
                            }}
                        >
                            Tỉnh Thành Phố
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="h3"
                            component="div"
                            sx={{
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                fontWeight: 700,
                                color: '#8B4513',
                                mb: 1,
                            }}
                        >
                            15+
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                color: '#1a1a1a',
                                fontWeight: 500,
                            }}
                        >
                            Năm Kinh Nghiệm
                        </Typography>
                    </Box>
                </Box>

                {/* Call to Action */}
                <Box sx={{ textAlign: 'center', mt: { xs: 4, md: 6 } }}>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#666',
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.6,
                        }}
                    >
                        Bạn có muốn trở thành đối tác của chúng tôi?{' '}
                        <Box
                            component="span"
                            sx={{
                                color: '#8B4513',
                                fontWeight: 600,
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                '&:hover': {
                                    color: '#A0522D',
                                },
                            }}
                        >
                            Liên hệ ngay
                        </Box>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default PartnersSection;
