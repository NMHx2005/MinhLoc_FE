"use client";

import React, { useState, useEffect } from 'react';
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
    Chip,
    Pagination,
    Tabs,
    Tab,
    TextField,
    InputAdornment,
    CircularProgress,
    Alert,
    Button,
} from '@mui/material';
import {
    Home,
    Article,
    CalendarToday,
    Person,
    Search,
    FilterList,
} from '@mui/icons-material';
import Link from 'next/link';
import Layout from '@/components/client/shared/Layout';
import { newsService, type NewsArticle, type NewsCategory, type NewsFilters } from '@/services/client/newsService';

const NewsPage: React.FC = () => {
    // State management
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [categories, setCategories] = useState<NewsCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [_totalArticles, setTotalArticles] = useState(0);
    const itemsPerPage = 6;

    // Filtering
    const [activeTab, setActiveTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [_selectedCategory, setSelectedCategory] = useState<string>('');
    const [filters, setFilters] = useState<NewsFilters>({});

    // Load data on component mount
    useEffect(() => {
        loadNews();
        loadCategories();
    }, [currentPage, filters]); // eslint-disable-line react-hooks/exhaustive-deps

    // Load news articles
    const loadNews = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await newsService.getNews(currentPage, itemsPerPage, filters);
            console.warn('News result:', result);

            // Handle actual response structure - result is directly an array of articles
            if (Array.isArray(result)) {
                setArticles(result);
                // Since we don't have pagination info, set default values
                setTotalPages(1);
                setTotalArticles(result.length);
            } else {
                // Fallback in case response structure changes
                setArticles([]);
                setTotalPages(1);
                setTotalArticles(0);
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải tin tức');
        } finally {
            setLoading(false);
        }
    };

    // Load categories
    const loadCategories = async () => {
        try {
            const categoriesData = await newsService.getNewsCategories();
            setCategories(categoriesData);
        } catch (err: unknown) {
            console.error('Error loading categories:', err);
        }
    };

    // Handle search
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setFilters(prev => ({ ...prev, search: query }));
        setCurrentPage(1);
    };

    // Handle category filter
    const handleCategoryFilter = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setFilters(prev => ({ ...prev, category: categoryId }));
        setCurrentPage(1);
    };

    // Handle tab change
    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        if (newValue === 0) {
            // All news
            setFilters({});
            setSelectedCategory('');
        } else if (categories[newValue - 1]) {
            // Category filter
            handleCategoryFilter(categories[newValue - 1]._id);
        }
    };

    // Handle page change
    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Get category color
    const getCategoryColor = (category: { color?: string }) => {
        return category.color || '#E7C873';
    };

    // Get current articles for display
    const featuredNews = articles?.filter(article => article.isFeatured) || [];
    const regularNews = articles?.filter(article => !article.isFeatured) || [];

    // Show loading state
    if (loading) {
        return (
            <Layout>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <CircularProgress size={60} />
                </Box>
            </Layout>
        );
    }

    // Show error state
    if (error) {
        return (
            <Layout>
                <Container maxWidth="lg" sx={{ py: 6 }}>
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Hero Section */}
            <Box
                sx={{
                    backgroundImage: 'url("https://datxanhmiennam.com.vn/Data/Sites/1/Banner/bntt.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                    pt: { xs: 12, md: 16 },
                    pb: { xs: 8, md: 12 },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        zIndex: 1,
                    }
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box textAlign="center" data-aos="fade-up" data-aos-duration="1000">
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                color: 'white',
                                fontWeight: 700,
                                mb: 2,
                                fontSize: { xs: '2.5rem', md: '4rem' },
                            }}
                        >
                            TIN TỨC
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#E7C873',
                                mb: 3,
                                fontSize: { xs: '1.2rem', md: '1.5rem' },
                            }}
                        >
                            Cập nhật thông tin mới nhất từ Minh Lộc Group
                        </Typography>
                        <Breadcrumbs aria-label="breadcrumb" sx={{ justifyContent: 'center', color: 'white' }}>
                            <MuiLink component={Link} href="/" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                                <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                                Trang chủ
                            </MuiLink>
                            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', color: '#E7C873' }}>
                                <Article sx={{ mr: 0.5 }} fontSize="inherit" />
                                Tin tức
                            </Typography>
                        </Breadcrumbs>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                {/* Search and Filter */}
                <Box sx={{ mb: 4 }} data-aos="fade-up" data-aos-delay="200">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                placeholder="Tìm kiếm tin tức..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        '&:hover fieldset': {
                                            borderColor: '#E7C873',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#E7C873',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button
                                variant="outlined"
                                startIcon={<FilterList />}
                                fullWidth
                                sx={{
                                    borderRadius: 2,
                                    borderColor: '#E7C873',
                                    color: '#E7C873',
                                    '&:hover': {
                                        borderColor: '#d4b85a',
                                        backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                    },
                                }}
                            >
                                Bộ lọc
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {/* Category Tabs */}
                <Box sx={{ mb: 6 }} data-aos="fade-up" data-aos-delay="300">
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '1rem',
                                '&.Mui-selected': {
                                    color: '#E7C873',
                                    fontWeight: 600,
                                },
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#E7C873',
                            },
                        }}
                    >
                        <Tab label="Tất cả" />
                        {categories.map((category) => (
                            <Tab key={category._id} label={category.name} />
                        ))}
                    </Tabs>
                </Box>

                {/* Loading State */}
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress size={60} sx={{ color: '#E7C873' }} />
                    </Box>
                )}

                {/* Error State */}
                {error && (
                    <Box sx={{ mb: 4 }}>
                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                            {error}
                        </Alert>
                    </Box>
                )}

                {/* Featured News */}
                {!loading && featuredNews.length > 0 && (
                    <Box sx={{ mb: 6 }} data-aos="fade-up" data-aos-delay="400">
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                color: '#E7C873',
                                fontWeight: 600,
                                mb: 4,
                                fontSize: { xs: '1.8rem', md: '2.2rem' },
                            }}
                        >
                            Tin Nổi Bật
                        </Typography>
                        <Grid container spacing={4}>
                            {featuredNews.map((article) => (
                                <Grid item xs={12} md={6} key={article._id}>
                                    <Card
                                        component={Link}
                                        href={`/news/${article.slug}`}
                                        sx={{
                                            height: '100%',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            transition: 'all 0.3s ease',
                                            borderRadius: 1,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                            },
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={article.featuredImage}
                                            alt={article.title}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                        <CardContent sx={{ p: 3 }}>
                                            <Box sx={{ mb: 2 }}>
                                                <Chip
                                                    label={article.categoryId.name}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: getCategoryColor(article.categoryId),
                                                        color: 'white',
                                                        fontWeight: 500,
                                                        mb: 2,
                                                    }}
                                                />
                                            </Box>
                                            <Typography
                                                variant="h5"
                                                component="h3"
                                                sx={{
                                                    fontWeight: 700,
                                                    mb: 2,
                                                    fontSize: '1.25rem',
                                                    lineHeight: 1.3,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {article.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    mb: 2,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {article.excerpt}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <CalendarToday sx={{ fontSize: 16 }} />
                                                    <Typography variant="caption">
                                                        {formatDate(article.publishedAt)}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <Person sx={{ fontSize: 16 }} />
                                                    <Typography variant="caption">{article.author.name}</Typography>
                                                </Box>
                                                <Typography variant="caption">{article.readTime} phút</Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Container>
        </Layout>
    );
};

export default NewsPage;
