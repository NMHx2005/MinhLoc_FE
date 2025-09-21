'use client'

import React from 'react';
import {
    Box,
    Typography,
    Container,
    Card,
    CardContent,
} from '@mui/material';

const BusinessAreas: React.FC = () => {
    const businessAreas = [
        {
            id: 1,
            title: 'Xây dựng',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/News/23/xd.jpg',
            description: 'Đất Xanh đã không ngừng phát triển mạnh mẽ các hoạt động đầu tư xây dựng để nhanh chóng trở thành một trong những tập đoàn phát triển bất động sản hàng đầu Việt Nam'
        },
        {
            id: 2,
            title: 'Đầu tư tài chính',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/News/22/tc.jpg',
            description: 'Trải qua chặng đường 14 năm phát triển, Tập đoàn Đất Xanh đã trở thành một trong những chủ đầu tư mang lại đầu ấn với sản phẩm đa dạng đáp ứng nhu cầu của thị trường.'
        },
        {
            id: 3,
            title: 'Bất động sản',
            image: 'https://datxanhmiennam.com.vn/Data/Sites/1/News/21/bds.jpg',
            description: 'Tất cả các giải pháp mà Đất Xanh cung cấp đều được phân tích một cách chuyên sâu, hướng đến phục vụ và giải quyết những vướng mắc một cách nhanh chóng và thỏa mãn tối đa nhu cầu của khách hàng.'
        }
    ];

    return (
        <Box
            component="section"
            className="business-areas-section"
            sx={{
                py: 8,
                backgroundColor: '#f8f9fa',
                backgroundImage: 'url(/background.png)',
                backgroundRepeat: 'repeat',
                backgroundSize: 'auto',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(248, 249, 250, 0.95)',
                    zIndex: 1,
                }
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                {/* Section Title */}
                <Typography
                    variant="h2"
                    component="h2"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    sx={{
                        textAlign: 'center',
                        color: '#E7C873',
                        fontWeight: 700,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        mb: 6,
                    }}
                >
                    Lĩnh vực hoạt động
                </Typography>

                {/* Business Areas Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: 4,
                        mt: 4,
                    }}
                >
                    {businessAreas.map((area, index) => (
                        <Card
                            key={area.id}
                            data-aos="zoom-in"
                            data-aos-duration="1000"
                            data-aos-delay={index * 200}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                },
                            }}
                        >
                            {/* Image */}
                            <Box
                                component="img"
                                src={area.image}
                                alt={area.title}
                                sx={{
                                    width: '100%',
                                    height: 250,
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            />

                            {/* Content */}
                            <CardContent
                                sx={{
                                    p: 3,
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    component="h3"
                                    sx={{
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        color: '#E7C873',
                                        mb: 2,
                                        textAlign: 'center',
                                    }}
                                >
                                    {area.title}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '0.95rem',
                                        lineHeight: 1.7,
                                        color: '#555',
                                        textAlign: 'justify',
                                        flexGrow: 1,
                                    }}
                                >
                                    {area.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default BusinessAreas;
