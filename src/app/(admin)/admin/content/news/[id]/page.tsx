'use client'

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    Button,
    Grid,
    Divider,
    Alert,
    CircularProgress,
    Breadcrumbs,
    Link,
    IconButton,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    Schedule as ScheduleIcon,
    Person as PersonIcon,
    Category as CategoryIcon,
    Tag as TagIcon,
} from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '../../../../../../components/admin/AdminLayout';
import MarkdownRenderer from '../../../../../../components/admin/MarkdownRenderer';
import { newsService } from '../../../../../../services/admin/newsService';
import type { NewsArticle } from '../../../../../../services/admin/newsService';

const NewsDetailPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (params.id) {
            loadArticle(params.id as string);
        }
    }, [params.id]);

    const loadArticle = async (id: string) => {
        try {
            setLoading(true);
            const response = await newsService.getNewsById(id);
            if (response.data) {
                setArticle(response.data);
            } else {
                setError('Không tìm thấy bài viết');
            }
        } catch (error) {
            console.error('Error loading article:', error);
            setError('Không thể tải bài viết');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        if (article) {
            router.push(`/admin/content/news/${article._id}/edit`);
        }
    };

    const handleDelete = async () => {
        if (!article) return;

        if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
            try {
                await newsService.deleteNews(article._id);
                router.push('/admin/content');
            } catch (error) {
                console.error('Error deleting article:', error);
                setError('Không thể xóa bài viết');
            }
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !article) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">{error || 'Không tìm thấy bài viết'}</Alert>
            </Box>
        );
    }

    return (
        <AdminLayout>
            <Box sx={{ p: 3 }}>
                {/* Breadcrumbs */}
                <Breadcrumbs sx={{ mb: 3 }}>
                    <Link
                        color="inherit"
                        href="/admin/content"
                        sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                    >
                        Quản lý nội dung
                    </Link>
                    <Link
                        color="inherit"
                        href="/admin/content"
                        sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                    >
                        Tin tức
                    </Link>
                    <Typography color="text.primary">Chi tiết bài viết</Typography>
                </Breadcrumbs>

                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton onClick={() => router.back()}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            Chi tiết bài viết
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={handleEdit}
                            sx={{
                                borderColor: '#E7C873',
                                color: '#E7C873',
                                '&:hover': {
                                    borderColor: '#d4b86a',
                                    backgroundColor: 'rgba(231, 200, 115, 0.1)',
                                },
                            }}
                        >
                            Chỉnh sửa
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={handleDelete}
                        >
                            Xóa
                        </Button>
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    {/* Main Content */}
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                {/* Title */}
                                <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
                                    {article.title}
                                    {article.isFeatured && (
                                        <Chip
                                            label="Nổi bật"
                                            color="primary"
                                            size="small"
                                            sx={{ ml: 2, fontSize: '0.7rem' }}
                                        />
                                    )}
                                    {article.isBreaking && (
                                        <Chip
                                            label="Tin nóng"
                                            color="error"
                                            size="small"
                                            sx={{ ml: 1, fontSize: '0.7rem' }}
                                        />
                                    )}
                                </Typography>

                                {/* Meta Information */}
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <PersonIcon fontSize="small" color="action" />
                                        <Typography variant="body2" color="text.secondary">
                                            {article.author?.name || 'N/A'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <ScheduleIcon fontSize="small" color="action" />
                                        <Typography variant="body2" color="text.secondary">
                                            {formatDate(article.createdAt)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <VisibilityIcon fontSize="small" color="action" />
                                        <Typography variant="body2" color="text.secondary">
                                            {(article.statistics?.views || 0).toLocaleString()} lượt xem
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Category */}
                                <Box sx={{ mb: 3 }}>
                                    <Chip
                                        icon={<CategoryIcon />}
                                        label={article.categoryId?.name || 'N/A'}
                                        sx={{
                                            backgroundColor: article.categoryId?.color || '#1976d2',
                                            color: 'white',
                                            fontSize: '0.8rem'
                                        }}
                                    />
                                </Box>

                                {/* Featured Image */}
                                {article.featuredImage && (
                                    <Box sx={{ mb: 3 }}>
                                        <img
                                            src={article.featuredImage}
                                            alt={article.title}
                                            style={{
                                                width: '100%',
                                                height: '400px',
                                                objectFit: 'cover',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </Box>
                                )}

                                {/* Excerpt */}
                                <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary', fontStyle: 'italic' }}>
                                    {article.excerpt}
                                </Typography>

                                <Divider sx={{ my: 3 }} />

                                {/* Content */}
                                <Box sx={{ mb: 3 }}>
                                    <MarkdownRenderer content={article.content} />
                                </Box>

                                {/* Tags */}
                                {article.tags && article.tags.length > 0 && (
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <TagIcon fontSize="small" />
                                            Tags
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {article.tags.map((tag, index) => (
                                                <Chip
                                                    key={index}
                                                    label={tag}
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} md={4}>
                        {/* Status Card */}
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Trạng thái
                                </Typography>
                                <Chip
                                    label={article.status === 'published' ? 'Đã xuất bản' :
                                        article.status === 'draft' ? 'Bản nháp' : 'Lưu trữ'}
                                    color={article.status === 'published' ? 'success' :
                                        article.status === 'draft' ? 'warning' : 'default'}
                                    sx={{ mb: 2 }}
                                />
                                {article.publishedAt && (
                                    <Typography variant="body2" color="text.secondary">
                                        Xuất bản: {formatDate(article.publishedAt)}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>

                        {/* Statistics Card */}
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Thống kê
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Lượt xem
                                        </Typography>
                                        <Typography variant="h6">
                                            {(article.statistics?.views || 0).toLocaleString()}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Lượt thích
                                        </Typography>
                                        <Typography variant="h6">
                                            {article.statistics?.likes || 0}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Chia sẻ
                                        </Typography>
                                        <Typography variant="h6">
                                            {article.statistics?.shares || 0}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">
                                            Bình luận
                                        </Typography>
                                        <Typography variant="h6">
                                            {article.statistics?.comments || 0}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* SEO Card */}
                        {article.seo && (
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                        SEO
                                    </Typography>
                                    {article.seo.metaTitle && (
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                Meta Title
                                            </Typography>
                                            <Typography variant="body2">
                                                {article.seo.metaTitle}
                                            </Typography>
                                        </Box>
                                    )}
                                    {article.seo.metaDescription && (
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                Meta Description
                                            </Typography>
                                            <Typography variant="body2">
                                                {article.seo.metaDescription}
                                            </Typography>
                                        </Box>
                                    )}
                                    {article.seo.keywords && article.seo.keywords.length > 0 && (
                                        <Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                Keywords
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {article.seo.keywords.map((keyword, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={keyword}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </AdminLayout>
    );
};

export default NewsDetailPage;
