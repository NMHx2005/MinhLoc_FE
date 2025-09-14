'use client'

import React from 'react';
import { Box, Container, Typography, Card, CardContent, Button, Chip } from '@mui/material';
import { CalendarToday, ArrowForward } from '@mui/icons-material';

const newsItems = [
    {
        id: 1,
        title: 'Thị trường bất động sản TP.HCM tăng trưởng mạnh trong quý 3',
        excerpt: 'Thị trường bất động sản TP.HCM tiếp tục ghi nhận sự tăng trưởng mạnh mẽ với nhiều dự án mới được ra mắt...',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4O73Y60PL-qya1glyatnwh0uknUiPJa5eRQ&s',
        date: '15/01/2025',
        category: 'Thị trường',
        readTime: '5 phút đọc'
    },
    {
        id: 2,
        title: 'MinhLoc Group ra mắt dự án chung cư cao cấp tại Quận 7',
        excerpt: 'Dự án The Sun Avenue với 500 căn hộ cao cấp, đầy đủ tiện ích hiện đại...',
        image: 'https://smartland.vn/wp-content/uploads/2021/10/danh-sach-du-an-can-ho-chung-cu-quan-7-dang-dau-tu-nhat-2019-2-scaled.jpg',
        date: '12/01/2025',
        category: 'Dự án',
        readTime: '3 phút đọc'
    },
    {
        id: 3,
        title: 'Xu hướng đầu tư bất động sản 2025: Cơ hội và thách thức',
        excerpt: 'Năm 2025 được dự báo sẽ là năm có nhiều cơ hội đầu tư bất động sản với các chính sách mới...',
        image: 'https://sigroup.vn/wp-content/uploads/2025/01/dau-tu-bat-dong-san-quoc-te-2025-1-1.png',
        date: '10/01/2025',
        category: 'Phân tích',
        readTime: '7 phút đọc'
    }
];

const NewsSection: React.FC = () => {
    return (
        <Box sx={{ py: 8, backgroundColor: '#ffffff' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            fontWeight: 700,
                            color: '#1a1a1a',
                            mb: 2
                        }}
                    >
                        Tin Tức & Cập Nhật
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#6c757d',
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.6
                        }}
                    >
                        Cập nhật những tin tức mới nhất về thị trường bất động sản và các dự án của chúng tôi
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    {newsItems.map((item) => (
                        <Box key={item.id} sx={{ flex: 1 }}>
                            <Card
                                sx={{
                                    height: '100%',
                                    borderRadius: 3,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        height: 200,
                                        backgroundImage: `url(${item.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        position: 'relative',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: 'linear-gradient(45deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))',
                                        }
                                    }}
                                    role="img"
                                    aria-label={item.title}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            left: 16,
                                            zIndex: 1
                                        }}
                                    >
                                        <Chip
                                            label={item.category}
                                            sx={{
                                                backgroundColor: '#E7C873',
                                                color: 'white',
                                                fontWeight: 600
                                            }}
                                        />
                                    </Box>
                                </Box>

                                <CardContent sx={{ p: 3 }}>
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#1a1a1a',
                                            mb: 2,
                                            lineHeight: 1.3,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#6c757d',
                                            mb: 3,
                                            lineHeight: 1.6,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {item.excerpt}
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <CalendarToday sx={{ fontSize: 16, color: '#6c757d', mr: 0.5 }} />
                                            <Typography variant="body2" sx={{ color: '#6c757d' }}>
                                                {item.date}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: '#6c757d' }}>
                                            {item.readTime}
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant="text"
                                        endIcon={<ArrowForward />}
                                        fullWidth
                                        sx={{
                                            color: '#E7C873',
                                            fontWeight: 600,
                                            '&:hover': {
                                                backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                            }
                                        }}
                                    >
                                        Đọc thêm
                                    </Button>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>

                <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <Button
                        variant="outlined"
                        size="large"
                        endIcon={<ArrowForward />}
                        sx={{
                            borderColor: '#E7C873',
                            color: '#E7C873',
                            fontWeight: 700,
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            textTransform: 'none',
                            fontSize: '1rem',
                            '&:hover': {
                                backgroundColor: '#E7C873',
                                color: 'white',
                                borderColor: '#E7C873',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Xem tất cả tin tức
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default NewsSection;
