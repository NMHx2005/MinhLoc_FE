"use client";

import React, { useState, useEffect, use } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Breadcrumbs,
    Link as MuiLink,
    Button,
    Chip,
    Stack,
    Avatar,
    CircularProgress,
    Alert,
    Divider,
} from '@mui/material';
import {
    Home,
    Article,
    CalendarToday,
    Person,
    AccessTime,
    Share as ShareIcon,
    Facebook,
    Twitter,
    LinkedIn,
    BookmarkBorder,
    Bookmark,
    ArrowBack,
    Visibility,
    ThumbUp,
    Comment,
} from '@mui/icons-material';
import Link from 'next/link';
import Layout from '@/components/client/shared/Layout';
import { newsService } from '@/services/client/newsService';
import type { NewsArticle } from '@/services/client/newsService';

interface NewsCategory {
    _id: string;
    name: string;
    slug: string;
    color: string;
}

const NewsDetailPage: React.FC<{ params: Promise<{ slug: string }> }> = ({ params }) => {
    const [news, setNews] = useState<NewsArticle | null>(null);
    const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);
    const [category, setCategory] = useState<NewsCategory | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showShare, setShowShare] = useState(false);

    const resolvedParams = use(params);

    useEffect(() => {
        const loadNewsDetail = async () => {
            try {
                setLoading(true);
                setError(null);

                // Load news article by slug
                const newsData = await newsService.getNewsBySlug(resolvedParams.slug);
                setNews(newsData);

                // Set category info from news data
                if (newsData.categoryId && typeof newsData.categoryId === 'object') {
                    setCategory(newsData.categoryId);
                }

                // Load related news
                const categoryId = typeof newsData.categoryId === 'object' ? newsData.categoryId._id : newsData.categoryId;
                const relatedData = await newsService.getNews(1, 3, {
                    category: categoryId,
                    exclude: newsData._id
                });
                setRelatedNews(relatedData);

            } catch (err) {
                console.error('Error loading news detail:', err);
                setError('Không thể tải bài viết. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        if (resolvedParams.slug) {
            loadNewsDetail();
        }
    }, [resolvedParams.slug]);

    const getCategoryColor = (category: NewsCategory | null) => {
        return category?.color || '#E7C873';
    };

    const getCategoryLabel = (category: NewsCategory | null) => {
        return category?.name || 'Tin tức';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateReadTime = (content: string) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return `${minutes} phút`;
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleShare = () => {
        setShowShare(!showShare);
    };

    if (loading) {
        return (
            <Layout>
                <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                    <CircularProgress size={60} sx={{ color: '#E7C873', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        Đang tải bài viết...
                    </Typography>
                </Container>
            </Layout>
        );
    }

    if (error || !news) {
        return (
            <Layout>
                <Container maxWidth="lg" sx={{ py: 8 }}>
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error || 'Không tìm thấy bài viết'}
                    </Alert>
                    <Button
                        component={Link}
                        href="/news"
                        variant="contained"
                        startIcon={<ArrowBack />}
                        sx={{
                            backgroundColor: '#E7C873',
                            '&:hover': {
                                backgroundColor: '#d4b85a',
                            },
                        }}
                    >
                        Quay lại tin tức
                    </Button>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Simple Header */}
            <Box sx={{ backgroundColor: '#f8f9fa', py: 3, borderBottom: '1px solid #e9ecef' }}>
                <Container maxWidth="lg">
                    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                        <MuiLink component={Link} href="/" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                            Trang chủ
                        </MuiLink>
                        <MuiLink component={Link} href="/news" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Article sx={{ mr: 0.5 }} fontSize="inherit" />
                            Tin tức
                        </MuiLink>
                        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', color: '#E7C873' }}>
                            {news.title}
                        </Typography>
                    </Breadcrumbs>

                    {/* Category Tags */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        <Chip
                            label={getCategoryLabel(category)}
                            sx={{
                                backgroundColor: getCategoryColor(category),
                                color: 'white',
                                fontWeight: 600,
                            }}
                        />
                        {news.isFeatured && (
                            <Chip
                                label="Nổi bật"
                                sx={{
                                    backgroundColor: '#FF5722',
                                    color: 'white',
                                    fontWeight: 600,
                                }}
                            />
                        )}
                        {news.isBreaking && (
                            <Chip
                                label="Tin nóng"
                                sx={{
                                    backgroundColor: '#F44336',
                                    color: 'white',
                                    fontWeight: 600,
                                }}
                            />
                        )}
                    </Box>

                    {/* Article Title */}
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            fontSize: { xs: '1.8rem', md: '2.2rem' },
                            lineHeight: 1.3,
                            color: '#2c3e50',
                        }}
                    >
                        {news.title}
                    </Typography>

                    {/* Article Meta */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, color: '#6c757d', flexWrap: 'wrap', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarToday sx={{ fontSize: 18 }} />
                            <Typography variant="body2">
                                {formatDate(news.publishedAt || news.createdAt)}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTime sx={{ fontSize: 18 }} />
                            <Typography variant="body2">
                                {news.readingTime ? `${news.readingTime} phút` : calculateReadTime(news.content)}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Person sx={{ fontSize: 18 }} />
                            <Typography variant="body2">
                                {typeof news.author === 'object' ? news.author.name : (news.author || 'MinhLoc Group')}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Visibility sx={{ fontSize: 18 }} />
                            <Typography variant="body2">
                                {news.statistics?.views || 0} lượt xem
                            </Typography>
                        </Box>
                    </Box>

                    {/* Article Excerpt */}
                    {news.excerpt && (
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#6c757d',
                                fontWeight: 400,
                                fontStyle: 'italic',
                                borderLeft: '4px solid #E7C873',
                                pl: 2,
                                py: 1,
                                backgroundColor: '#f8f9fa',
                                borderRadius: '0 4px 4px 0',
                            }}
                        >
                            {news.excerpt}
                        </Typography>
                    )}
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Grid container spacing={4}>
                    {/* Main Content */}
                    <Grid item xs={12} md={8}>
                        {/* Featured Image */}
                        {news.featuredImage && (
                            <Box sx={{ mb: 4, textAlign: 'center' }}>
                                <img
                                    src={news.featuredImage}
                                    alt={news.title}
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    }}
                                />
                            </Box>
                        )}

                        {/* Article Content */}
                        <Card sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <CardContent sx={{ p: 4 }}>
                                <Box
                                    sx={{
                                        '& h1, & h2, & h3, & h4, & h5, & h6': {
                                            fontSize: '1.4rem',
                                            fontWeight: 600,
                                            color: '#2c3e50',
                                            mb: 2,
                                            mt: 3,
                                        },
                                        '& p': {
                                            fontSize: '1rem',
                                            lineHeight: 1.7,
                                            mb: 2,
                                            color: '#2c3e50',
                                        },
                                        '& ul, & ol': {
                                            pl: 3,
                                            mb: 2,
                                        },
                                        '& li': {
                                            fontSize: '1rem',
                                            lineHeight: 1.7,
                                            mb: 1,
                                            color: '#2c3e50',
                                        },
                                        '& strong': {
                                            fontWeight: 600,
                                            color: '#2c3e50',
                                        },
                                        '& blockquote': {
                                            borderLeft: '4px solid #E7C873',
                                            pl: 2,
                                            ml: 0,
                                            fontStyle: 'italic',
                                            color: '#6c757d',
                                            backgroundColor: '#f8f9fa',
                                            p: 2,
                                            borderRadius: '0 4px 4px 0',
                                            mb: 2,
                                        },
                                        '& img': {
                                            maxWidth: '100%',
                                            height: 'auto',
                                            borderRadius: '4px',
                                            mb: 2,
                                        },
                                    }}
                                    dangerouslySetInnerHTML={{ __html: news.content }}
                                />
                            </CardContent>
                        </Card>

                        {/* Tags and Keywords */}
                        {(news.tags?.length > 0 || news.seo?.keywords?.length > 0) && (
                            <Card sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2c3e50' }}>
                                        Tags & Từ khóa
                                    </Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                                        {news.tags?.map((tag, index) => (
                                            <Chip
                                                key={index}
                                                label={tag}
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    borderColor: '#E7C873',
                                                    color: '#E7C873',
                                                }}
                                            />
                                        ))}
                                        {news.seo?.keywords?.map((keyword, index) => (
                                            <Chip
                                                key={`keyword-${index}`}
                                                label={keyword}
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    borderColor: '#1976D2',
                                                    color: '#1976D2',
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        )}

                        {/* Simple Stats */}
                        <Card sx={{ mb: 4, borderRadius: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2c3e50' }}>
                                    Thống kê
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Visibility sx={{ color: '#1976D2', fontSize: 20 }} />
                                        <Typography variant="body2">
                                            <strong>{news.statistics?.views || 0}</strong> lượt xem
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <ThumbUp sx={{ color: '#4CAF50', fontSize: 20 }} />
                                        <Typography variant="body2">
                                            <strong>{news.statistics?.likes || 0}</strong> lượt thích
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Comment sx={{ color: '#FF9800', fontSize: 20 }} />
                                        <Typography variant="body2">
                                            <strong>{news.statistics?.comments || 0}</strong> bình luận
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <ShareIcon sx={{ color: '#9C27B0', fontSize: 20 }} />
                                        <Typography variant="body2">
                                            <strong>{news.statistics?.shares || 0}</strong> chia sẻ
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Related News */}
                        {relatedNews.length > 0 && (
                            <Card sx={{ borderRadius: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#E7C873' }}>
                                        Tin Liên Quan
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {relatedNews.map((relatedNews) => (
                                            <Grid item xs={12} sm={6} key={relatedNews._id}>
                                                <Card
                                                    component={Link}
                                                    href={`/news/${relatedNews.slug}`}
                                                    sx={{
                                                        textDecoration: 'none',
                                                        color: 'inherit',
                                                        transition: 'all 0.3s ease',
                                                        borderRadius: 1,
                                                        '&:hover': {
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                                                        },
                                                    }}
                                                >
                                                    <CardMedia
                                                        component="img"
                                                        height="150"
                                                        image={relatedNews.featuredImage || relatedNews.imageUrl || '/placeholder-news.jpg'}
                                                        alt={relatedNews.title}
                                                        sx={{ objectFit: 'cover' }}
                                                    />
                                                    <CardContent sx={{ p: 2 }}>
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{
                                                                fontWeight: 600,
                                                                mb: 1,
                                                                fontSize: '0.9rem',
                                                                lineHeight: 1.4,
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: 'vertical',
                                                                overflow: 'hidden',
                                                            }}
                                                        >
                                                            {relatedNews.title}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {formatDate(relatedNews.publishedAt || relatedNews.createdAt)}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        )}
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} md={4}>
                        {/* Author Info */}
                        <Card sx={{ mb: 3, borderRadius: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2c3e50' }}>
                                    Tác giả
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar
                                        src={news.authorAvatar || '/avatar.jpg'}
                                        sx={{ width: 50, height: 50 }}
                                    />
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            {typeof news.author === 'object' ? news.author.name : (news.author || 'MinhLoc Group')}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {typeof news.author === 'object' && news.author.id ? news.author.id.email : 'MinhLoc Group'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Article Info */}
                        <Card sx={{ mb: 3, borderRadius: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2c3e50' }}>
                                    Thông tin bài viết
                                </Typography>
                                <Stack spacing={1.5}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <AccessTime sx={{ color: '#1976D2', fontSize: 18 }} />
                                        <Typography variant="body2">
                                            {news.readingTime ? `${news.readingTime} phút đọc` : 'Thời gian đọc không xác định'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Article sx={{ color: '#4CAF50', fontSize: 18 }} />
                                        <Typography variant="body2">
                                            {news.wordCount || 0} từ
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CalendarToday sx={{ color: '#FF9800', fontSize: 18 }} />
                                        <Typography variant="body2">
                                            {formatDate(news.publishedAt || news.createdAt)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Comment sx={{ color: '#9C27B0', fontSize: 18 }} />
                                        <Typography variant="body2">
                                            {news.allowComments ? 'Cho phép bình luận' : 'Không cho phép bình luận'}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <Card sx={{ mb: 3, borderRadius: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2c3e50' }}>
                                    Hành động
                                </Typography>
                                <Stack spacing={1.5}>
                                    <Button
                                        variant="outlined"
                                        startIcon={isBookmarked ? <Bookmark /> : <BookmarkBorder />}
                                        onClick={handleBookmark}
                                        fullWidth
                                        sx={{
                                            borderColor: '#E7C873',
                                            color: '#E7C873',
                                            '&:hover': {
                                                backgroundColor: '#E7C873',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        {isBookmarked ? 'Đã lưu' : 'Lưu bài viết'}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<ShareIcon />}
                                        onClick={handleShare}
                                        fullWidth
                                        sx={{
                                            borderColor: '#1976D2',
                                            color: '#1976D2',
                                            '&:hover': {
                                                backgroundColor: '#1976D2',
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        Chia sẻ
                                    </Button>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        href="/news"
                                        startIcon={<ArrowBack />}
                                        fullWidth
                                        sx={{
                                            backgroundColor: '#6c757d',
                                            '&:hover': {
                                                backgroundColor: '#5a6268',
                                            },
                                        }}
                                    >
                                        Quay lại tin tức
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Share Options */}
                        {showShare && (
                            <Card sx={{ mb: 3, borderRadius: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2c3e50' }}>
                                        Chia sẻ
                                    </Typography>
                                    <Stack spacing={1.5}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<Facebook />}
                                            fullWidth
                                            size="small"
                                            sx={{
                                                borderColor: '#1877F2',
                                                color: '#1877F2',
                                                '&:hover': {
                                                    backgroundColor: '#1877F2',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            Facebook
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            startIcon={<Twitter />}
                                            fullWidth
                                            size="small"
                                            sx={{
                                                borderColor: '#1DA1F2',
                                                color: '#1DA1F2',
                                                '&:hover': {
                                                    backgroundColor: '#1DA1F2',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            Twitter
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            startIcon={<LinkedIn />}
                                            fullWidth
                                            size="small"
                                            sx={{
                                                borderColor: '#0077B5',
                                                color: '#0077B5',
                                                '&:hover': {
                                                    backgroundColor: '#0077B5',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            LinkedIn
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default NewsDetailPage;
