'use client'

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Link,
    IconButton,
    TextField,
    Button,
    Divider,
    CircularProgress,
} from '@mui/material';
import {
    Facebook,
    Twitter,
    Instagram,
    LinkedIn,
    ArrowForward,
    YouTube,
} from '@mui/icons-material';
import Image from 'next/image';
import { companyService, type CompanyInfo } from '@/services/client/companyService';

const Footer: React.FC = () => {
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            try {
                setLoading(true);
                const info = await companyService.getGeneralInfo();
                setCompanyInfo(info);
            } catch (error) {
                console.error('Error fetching company info:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyInfo();
    }, []);

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
                        <Image
                            src="/Logo_MinhLocGroup.png"
                            alt={companyInfo?.data?.companyName || "MINH LỘC GROUP"}
                            width={150}
                            height={56}
                            style={{
                                height: '56px',
                                width: 'auto',
                                filter: 'brightness(0) invert(1)',
                            }}
                        />
                    </Box>

                    {/* Social Media */}
                    {!loading && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="body2" sx={{ mr: 2 }}>
                                Theo dõi chúng tôi
                            </Typography>
                            {companyInfo?.data?.socialMedia?.facebook && (
                                <IconButton
                                    component={Link}
                                    href={companyInfo.data.socialMedia.facebook}
                                    target="_blank"
                                    aria-label="Facebook"
                                    sx={{ color: 'white' }}
                                >
                                    <Facebook />
                                </IconButton>
                            )}
                            {companyInfo?.data?.socialMedia?.twitter && (
                                <IconButton
                                    component={Link}
                                    href={companyInfo.data.socialMedia.twitter}
                                    target="_blank"
                                    aria-label="Twitter"
                                    sx={{ color: 'white' }}
                                >
                                    <Twitter />
                                </IconButton>
                            )}
                            {companyInfo?.data?.socialMedia?.instagram && (
                                <IconButton
                                    component={Link}
                                    href={companyInfo.data.socialMedia.instagram}
                                    target="_blank"
                                    aria-label="Instagram"
                                    sx={{ color: 'white' }}
                                >
                                    <Instagram />
                                </IconButton>
                            )}
                            {companyInfo?.data?.socialMedia?.linkedin && (
                                <IconButton
                                    component={Link}
                                    href={companyInfo.data.socialMedia.linkedin}
                                    target="_blank"
                                    aria-label="LinkedIn"
                                    sx={{ color: 'white' }}
                                >
                                    <LinkedIn />
                                </IconButton>
                            )}
                            {companyInfo?.data?.socialMedia?.youtube && (
                                <IconButton
                                    component={Link}
                                    href={companyInfo.data.socialMedia.youtube}
                                    target="_blank"
                                    aria-label="YouTube"
                                    sx={{ color: 'white' }}
                                >
                                    <YouTube />
                                </IconButton>
                            )}
                        </Box>
                    )}
                    {loading && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="body2" sx={{ mr: 2 }}>
                                Theo dõi chúng tôi
                            </Typography>
                            <CircularProgress size={20} sx={{ color: 'white' }} />
                        </Box>
                    )}
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
                        {!loading ? (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.6,
                                }}
                            >
                                {companyInfo?.data?.contactInfo?.email || 'hi@minhlocgroup.com'}<br />
                                {companyInfo?.data?.contactInfo?.phone || '(123) 456-7890'}
                            </Typography>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CircularProgress size={16} sx={{ color: 'white' }} />
                                <Typography variant="body2" sx={{ color: 'white', fontSize: '0.9rem' }}>
                                    Đang tải...
                                </Typography>
                            </Box>
                        )}
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
                        {!loading ? (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.6,
                                }}
                            >
                                {companyInfo?.data?.contactInfo?.address || '123 Đường ABC, Quận 1'}<br />
                                {companyInfo?.data?.headquarters || 'TP.HCM, Việt Nam'}
                            </Typography>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CircularProgress size={16} sx={{ color: 'white' }} />
                                <Typography variant="body2" sx={{ color: 'white', fontSize: '0.9rem' }}>
                                    Đang tải...
                                </Typography>
                            </Box>
                        )}
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
                        Copyright 2025 {companyInfo?.data?.companyName || 'MinhLoc Group'} - All Rights Reserved
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
