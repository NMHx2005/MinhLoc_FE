'use client'

import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const AboutUsSection: React.FC = () => {
    return (
        <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6, alignItems: 'center' }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h2"
                            component="h2"
                            sx={{
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                fontWeight: 700,
                                color: '#1a1a1a',
                                mb: 3
                            }}
                        >
                            Về MinhLoc Group
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                color: '#6c757d',
                                mb: 4,
                                lineHeight: 1.6
                            }}
                        >
                            Với hơn 15 năm kinh nghiệm trong lĩnh vực bất động sản,
                            MinhLoc Group đã trở thành một trong những thương hiệu uy tín
                            hàng đầu tại Việt Nam.
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                color: '#6c757d',
                                mb: 4,
                                lineHeight: 1.8
                            }}
                        >
                            Chúng tôi chuyên cung cấp các dự án bất động sản cao cấp,
                            từ chung cư, biệt thự đến shophouse và đất nền. Với đội ngũ
                            chuyên nghiệp và kinh nghiệm sâu rộng, chúng tôi cam kết mang
                            đến những sản phẩm chất lượng tốt nhất cho khách hàng.
                        </Typography>

                        <Button
                            variant="contained"
                            endIcon={<ArrowForward />}
                            sx={{
                                backgroundColor: '#E7C873',
                                color: 'white',
                                fontWeight: 700,
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': {
                                    backgroundColor: '#d4b85a',
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Tìm hiểu thêm
                        </Button>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Box
                            sx={{
                                height: 400,
                                backgroundImage: 'url(/images/about-us.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: 3,
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(45deg, rgba(231, 200, 115, 0.8), rgba(26, 35, 126, 0.8))',
                                    borderRadius: 3,
                                }
                            }}
                            role="img"
                            aria-label="Hình ảnh về MinhLoc Group"
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default AboutUsSection;
