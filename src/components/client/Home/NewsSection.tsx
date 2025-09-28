'use client'

import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Card,
    CardContent,
    CardMedia,
    Button,
    CircularProgress,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Link from 'next/link';
import { newsService, type NewsArticle } from '@/services/client/newsService';

const NewsSection: React.FC = () => {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const newsCategories = [
        {
            id: 1,
            title: 'TIN MINHLOC GROUP',
            icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/tin-tuc/icon1.png',
        },
        {
            id: 2,
            title: 'TIN THỊ TRƯỜNG',
            icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/tin-tuc/icon2.png',
        },
        {
            id: 3,
            title: 'VĂN HÓA MINHLOC GROUP',
            icon: 'https://datxanhmiennam.com.vn/Data/Sites/1/media/tin-tuc/icon3.png',
        }
    ];

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await newsService.getNews(1, 6); // Lấy 6 tin tức
                if (response && Array.isArray(response)) {
                    setNews(response);
                } else {
                    setError('Không thể tải dữ liệu tin tức');
                }
            } catch (err) {
                console.error('Error fetching news:', err);
                setError('Có lỗi xảy ra khi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // 3 Featured News (Top) - lấy 3 tin đầu tiên
    const featuredNews = news.slice(0, 3);

    // 6 Side News (Bottom) - lấy tất cả 6 tin
    const sideNews = news.slice(0, 6);

    return (
        <Box
            component="section"
            className="news-section"
            sx={{
                py: 8,
                backgroundImage: 'url(https://datxanhmiennam.com.vn/Data/Sites/1/skins/default/images/homeNews_bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                minHeight: '600px',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#E7C873',
                    opacity: 0.3,
                    zIndex: 1,
                }
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                {/* Category Headers Row */}
                <Box


                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: 4,
                        mb: 4,
                    }}
                >
                    {newsCategories.map((category) => (
                        <Box
                            key={category.id}


                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                color: 'white',
                            }}
                        >
                            <Box
                                component="img"
                                src={category.icon}
                                alt={category.title}
                                sx={{
                                    width: 24,
                                    height: 24,
                                    filter: 'brightness(0) invert(1)',
                                }}
                            />
                            <Typography
                                variant="h6"
                                component="h3"
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    color: '#E7C873',
                                    textTransform: 'uppercase',
                                    textAlign: 'center',
                                }}
                            >
                                {category.title}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* Loading State */}
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
                        <CircularProgress sx={{ color: 'white' }} />
                    </Box>
                )}

                {/* Error State */}
                {error && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            {error}
                        </Typography>
                    </Box>
                )}

                {/* Content */}
                {!loading && !error && (
                    <>
                        {/* Featured News Row */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    md: 'repeat(3, 1fr)',
                                },
                                gap: 4,
                                mb: 6,
                            }}
                        >
                            {featuredNews.map((newsItem) => (
                                <Card
                                    key={newsItem._id}
                                    component={Link}
                                    href={`/news/${newsItem.slug}`}


                                    sx={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: 1,
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease-in-out',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={newsItem.imageUrl || newsItem.featuredImageUrl || '/modern-house.png'}
                                        alt={newsItem.title}
                                        sx={{
                                            transition: 'transform 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                            },
                                        }}
                                    />
                                    <CardContent sx={{ p: 2 }}>
                                        <Typography
                                            variant="h6"
                                            component="h4"
                                            sx={{
                                                fontSize: '0.95rem',
                                                fontWeight: 600,
                                                color: 'white',
                                                mb: 2,
                                                lineHeight: 1.4,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {newsItem.title}
                                        </Typography>
                                        <Button
                                            endIcon={<ArrowForward />}
                                            sx={{
                                                color: '#E7C873',
                                                textTransform: 'none',
                                                fontSize: '0.9rem',
                                                fontWeight: 500,
                                                p: 0,
                                                minWidth: 'auto',
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            Xem thêm
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>

                        {/* Side News Grid */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: 'repeat(2, 1fr)',
                                    md: 'repeat(3, 1fr)',
                                },
                                gap: 3,
                            }}
                        >
                            {sideNews.map((newsItem) => (
                                <Box
                                    key={newsItem._id}
                                    component={Link}
                                    href={`/news/${newsItem.slug}`}


                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        textDecoration: 'none',
                                        color: 'white',
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateX(5px)',
                                            '& img': {
                                                transform: 'scale(1.1)',
                                            },
                                            '& h5': {
                                                color: '#E7C873',
                                            },
                                        },
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={newsItem.imageUrl || newsItem.featuredImageUrl || '/modern-house.png'}
                                        alt={newsItem.title}
                                        sx={{
                                            width: 80,
                                            height: 60,
                                            objectFit: 'cover',
                                            borderRadius: 1,
                                            flexShrink: 0,
                                            transition: 'transform 0.3s ease-in-out',
                                        }}
                                    />
                                    <Typography
                                        variant="subtitle2"
                                        component="h5"
                                        sx={{
                                            fontSize: '0.85rem',
                                            fontWeight: 500,
                                            color: 'white',
                                            lineHeight: 1.4,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            transition: 'color 0.3s ease-in-out',
                                        }}
                                    >
                                        {newsItem.title}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default NewsSection;
