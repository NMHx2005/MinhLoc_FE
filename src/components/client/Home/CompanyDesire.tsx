'use client'

import React from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
} from '@mui/material';
import { ArrowForward, Download } from '@mui/icons-material';
import Link from 'next/link';

const CompanyDesire: React.FC = () => {
    const desireItems = [
        {
            id: 1,
            title: 'Tầm nhìn',
            icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/icon/desire_icon1.png',
            description: '2025: Trở thành công ty đầu tư kinh doanh, dịch vụ bất động sản uy tín và chuyên nghiệp hàng đầu miền Nam\n2030: Trở thành công ty đầu tư kinh doanh, dịch vụ bất động sản uy tín và chuyên nghiệp hàng đầu Việt Nam'
        },
        {
            id: 2,
            title: 'Sứ mệnh',
            icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/icon/desire_icon2.png',
            description: 'Cung cấp sản phẩm và dịch vụ ưu việt, nâng cao giá trị cuộc sống'
        },
        {
            id: 3,
            title: 'Giá trị cốt lõi',
            icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/icon/desire_icon3.png',
            description: 'Khát vọng - Chuyên nghiệp - Chính trực - Nhân văn'
        },
        {
            id: 4,
            title: 'Triết lý kinh doanh',
            icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/icon/desire_icon4.png',
            description: '"Chúng tôi xây dựng niềm tin bắt đầu từ xây dựng ngôi nhà của bạn".'
        }
    ];

    return (
        <Box component="section" className="home-desire" sx={{ py: 8, backgroundColor: 'white' }}>
            <Container maxWidth="lg">
                <Box className="Module Module-151">
                    <Box className="ModuleContent">
                        {/* Section Title */}
                        <Typography
                            variant="h2"
                            component="h1"
                            className="title-home"


                            sx={{
                                textAlign: 'center',
                                color: '#E7C873',
                                fontWeight: 600,
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                mb: 6,
                            }}
                        >
                            Minh Lộc Group - Khát vọng vươn xa
                        </Typography>

                        {/* Main Content */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', lg: 'row' },
                                gap: { xs: 4, lg: 6 },
                                alignItems: { xs: 'center', lg: 'flex-start' }
                            }}
                        >
                            {/* Left Column - Description */}
                            <Box



                                sx={{
                                    width: { xs: '100%', lg: '40%' },
                                    maxWidth: { xs: '100%', lg: '400px' }
                                }}
                            >
                                <Box className="desire-desc" sx={{ mb: 4 }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontSize: '1.1rem',
                                            lineHeight: 1.8,
                                            color: '#333',
                                            textAlign: { xs: 'center', lg: 'left' },
                                        }}
                                    >
                                        Minh Lộc Group không ngừng hoàn thiện, cải tiến nhằm phát triển các dự án Bất Động Sản vì mục tiêu an sinh xã hội, đáp ứng tối đa nhu cầu an cư và đầu tư của khách hàng.
                                    </Typography>
                                </Box>

                                {/* Action Buttons */}
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row', lg: 'column' },
                                    gap: 2,
                                    justifyContent: { xs: 'center', lg: 'flex-start' }
                                }}>
                                    <Link href="/gioi-thieu/gioi-thieu-chung" passHref>
                                        <Button
                                            variant="outlined"
                                            endIcon={<ArrowForward />}
                                            sx={{
                                                color: '#E7C873',
                                                borderColor: '#E7C873',
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                                fontWeight: 500,
                                                px: 3,
                                                py: 1.5,
                                                borderRadius: 1,
                                                minWidth: { xs: '200px', sm: 'auto' },
                                                '&:hover': {
                                                    backgroundColor: '#E7C873',
                                                    color: 'white',
                                                    borderColor: '#E7C873',
                                                },
                                            }}
                                        >
                                            Xem giới thiệu chi tiết
                                        </Button>
                                    </Link>

                                    <Button
                                        component={Link}
                                        href="/gioi-thieu/nang-luc-canh-tranh"
                                        className="btn-link"
                                        variant="outlined"
                                        endIcon={<Download />}
                                        sx={{
                                            color: '#E7C873',
                                            borderColor: '#E7C873',
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            px: 3,
                                            py: 1.5,
                                            borderRadius: 2,
                                            minWidth: { xs: '200px', sm: 'auto' },
                                            '&:hover': {
                                                backgroundColor: '#E7C873',
                                                color: 'white',
                                                borderColor: '#E7C873',
                                            },
                                        }}
                                    >
                                        Tải hồ sơ năng lực
                                    </Button>
                                </Box>
                            </Box>

                            {/* Right Column - Desire Items */}
                            <Box



                                sx={{
                                    width: { xs: '100%', lg: '60%' },
                                    flex: 1
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: {
                                            xs: '1fr',
                                            sm: 'repeat(2, 1fr)',
                                        },
                                        gap: 3,
                                    }}
                                >
                                    {desireItems.map((item, index) => (
                                        <Box
                                            key={item.id}
                                            component="figure"


                                            sx={{
                                                m: 0,
                                                p: 3,
                                                textAlign: 'center',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                backgroundColor: 'white',
                                                borderRadius: 1,
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                    transition: 'transform 0.3s ease',
                                                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                                                },
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={item.icon}
                                                alt={item.title}
                                                sx={{
                                                    width: 80,
                                                    height: 80,
                                                    objectFit: 'contain',
                                                    mb: 2,
                                                }}
                                            />
                                            <Box component="figcaption">
                                                <Typography
                                                    variant="h4"
                                                    component="h3"
                                                    sx={{
                                                        fontSize: '1.5rem',
                                                        fontWeight: 700,
                                                        color: '#E7C873',
                                                        mb: 2,
                                                        textTransform: 'uppercase',
                                                    }}
                                                >
                                                    {item.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        lineHeight: 1.6,
                                                        color: '#666',
                                                        whiteSpace: 'pre-line',
                                                    }}
                                                >
                                                    {item.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default CompanyDesire;
