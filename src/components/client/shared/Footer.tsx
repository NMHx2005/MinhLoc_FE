'use client'

import React from 'react';
import {
    Box,
    Container,
    Typography,
    Link,
    IconButton,
    TextField,
    Button,
    Divider,
} from '@mui/material';
import {
    Facebook,
    Twitter,
    Instagram,
    LinkedIn,
    ArrowForward,
} from '@mui/icons-material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#1a1a1a',
                color: 'white',
                py: 8,
            }}
        >
            <Container maxWidth="lg">
                {/* Top Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', lg: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', lg: 'center' },
                        mb: 4,
                    }}
                >
                    {/* Logo */}
                    <Box sx={{ mb: { xs: 3, lg: 0 } }}>
                        <img
                            src="/Logo_MinhLocGroup.png"
                            alt="MINH LỘC GROUP"
                            style={{
                                height: '56px',
                                width: 'auto',
                                filter: 'brightness(0) invert(1)',
                            }}
                        />
                    </Box>

                    {/* Social Media */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ mr: 2 }}>
                            Theo dõi chúng tôi
                        </Typography>
                        <IconButton aria-label="Facebook" sx={{ color: 'white' }}>
                            <Facebook />
                        </IconButton>
                        <IconButton aria-label="Twitter" sx={{ color: 'white' }}>
                            <Twitter />
                        </IconButton>
                        <IconButton aria-label="Instagram" sx={{ color: 'white' }}>
                            <Instagram />
                        </IconButton>
                        <IconButton aria-label="LinkedIn" sx={{ color: 'white' }}>
                            <LinkedIn />
                        </IconButton>
                    </Box>
                </Box>

                {/* Divider */}
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', mb: 6 }} />

                {/* Main Content */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                            lg: 'repeat(5, 1fr)',
                        },
                        gap: 4,
                        mb: 6,
                    }}
                >
                    {/* Subscribe Section */}
                    <Box sx={{ gridColumn: { xs: '1', md: '1 / 3' } }}>
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.47)',
                                mb: 2,
                                fontSize: '0.9rem',
                                fontWeight: 500,
                            }}
                        >
                            Đăng ký nhận tin
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                mb: 2,
                                flexDirection: { xs: 'column', sm: 'row' },
                            }}
                        >
                            <TextField
                                placeholder="Email của bạn"
                                variant="outlined"
                                size="small"
                                sx={{
                                    flex: 1,
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'transparent',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        '& fieldset': {
                                            border: 'none',
                                        },
                                        '&:hover fieldset': {
                                            border: 'none',
                                        },
                                        '&.Mui-focused fieldset': {
                                            border: 'none',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: 'white',
                                        '&::placeholder': {
                                            color: 'white',
                                            opacity: 1,
                                        },
                                    },
                                }}
                            />
                            <Button
                                variant="contained"
                                endIcon={<ArrowForward />}
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                    borderRadius: '44px',
                                    px: 3,
                                    py: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.12)',
                                    },
                                }}
                            >
                                Gửi
                            </Button>
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'white',
                                fontSize: '0.9rem',
                                lineHeight: 1.4,
                            }}
                        >
                            Đăng ký nhận bản tin hàng tuần của chúng tôi.
                        </Typography>
                    </Box>

                    {/* Discover Section */}
                    <Box>
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.47)',
                                mb: 2,
                                fontSize: '0.9rem',
                                fontWeight: 500,
                            }}
                        >
                            Khám phá
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {[
                                'Về chúng tôi',
                                'Dịch vụ',
                                'Bất động sản',
                                'Tin tức',
                                'Liên hệ',
                                'Tuyển dụng',
                            ].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    sx={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </Box>
                    </Box>

                    {/* Support Section */}
                    <Box>
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.47)',
                                mb: 2,
                                fontSize: '0.9rem',
                                fontWeight: 500,
                            }}
                        >
                            Hỗ trợ
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {[
                                'Trung tâm trợ giúp',
                                'Chính sách bảo mật',
                                'Điều khoản dịch vụ',
                                'Câu hỏi thường gặp',
                                'Hỗ trợ',
                                'Cộng đồng',
                                'Liên hệ hỗ trợ',
                            ].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    sx={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </Box>
                    </Box>

                    {/* Contact Us Section */}
                    <Box>
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.47)',
                                mb: 2,
                                fontSize: '0.9rem',
                                fontWeight: 500,
                            }}
                        >
                            Liên hệ
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'white',
                                fontSize: '0.9rem',
                                lineHeight: 1.6,
                            }}
                        >
                            hi@minhlocgroup.com<br />
                            (123) 456-7890
                        </Typography>
                    </Box>

                    {/* Our Address Section */}
                    <Box>
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.47)',
                                mb: 2,
                                fontSize: '0.9rem',
                                fontWeight: 500,
                            }}
                        >
                            Địa chỉ
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'white',
                                fontSize: '0.9rem',
                                lineHeight: 1.6,
                            }}
                        >
                            123 Đường ABC, Quận 1<br />
                            TP.HCM, Việt Nam
                        </Typography>
                    </Box>
                </Box>

                {/* Bottom Divider */}
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', mb: 4 }} />

                {/* Copyright */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'white',
                            fontSize: '0.9rem',
                        }}
                    >
                        Copyright 2025 HungDan - All Rights Reserved
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
