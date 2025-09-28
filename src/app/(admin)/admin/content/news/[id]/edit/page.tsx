'use client'

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Chip,
    Breadcrumbs,
    Link,
    IconButton,
    Alert,
    CircularProgress,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
} from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '../../../../../../../components/admin/AdminLayout';
import RichTextEditor from '../../../../../../../components/admin/RichTextEditor';
import ImageUpload from '../../../../../../../components/admin/ImageUpload';
import { newsService } from '../../../../../../../services/admin/newsService';
import type { NewsArticle, UpdateNewsData, NewsCategory, NewsTag } from '../../../../../../../services/admin/newsService';

const NewsEditPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [categories, setCategories] = useState<NewsCategory[]>([]);
    const [_tags, setTags] = useState<NewsTag[]>([]);
    const [newTag, setNewTag] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [article, setArticle] = useState<NewsArticle | null>(null);

    const [formData, setFormData] = useState<UpdateNewsData>({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: '',
        tags: [],
        status: 'draft',
        featured: false,
        featuredImage: '',
        isBreaking: false,
        allowComments: true,
        seo: {
            metaTitle: '',
            metaDescription: '',
            keywords: []
        }
    });

    // Load article and categories/tags
    useEffect(() => {
        if (params.id) {
            loadData(params.id as string);
        }
    }, [params.id]);

    const loadData = async (id: string) => {
        setLoading(true);
        try {
            const [articleResponse, categoriesResponse, tagsResponse] = await Promise.all([
                newsService.getNewsById(id),
                newsService.getNewsCategories(),
                newsService.getNewsTags()
            ]);

            const articleData = articleResponse.data;
            if (articleData) {
                setArticle(articleData);
            }
            setCategories(categoriesResponse.data || []);
            setTags(tagsResponse.data || []);

            // Populate form with article data
            if (articleData) {
                setFormData({
                    title: articleData.title || '',
                    slug: articleData.slug || '',
                    excerpt: articleData.excerpt || '',
                    content: articleData.content || '',
                    category: articleData.categoryId?._id || '',
                    tags: articleData.tags || [],
                    status: articleData.status || 'draft',
                    featured: articleData.isFeatured || false,
                    featuredImage: articleData.featuredImage || '',
                    isBreaking: articleData.isBreaking || false,
                    allowComments: articleData.allowComments ?? true,
                    seo: {
                        metaTitle: articleData.seo?.metaTitle || '',
                        metaDescription: articleData.seo?.metaDescription || '',
                        keywords: articleData.seo?.keywords || []
                    }
                });
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleInputChange = (field: string, value: string | boolean | string[]) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Auto-generate slug from title
        if (field === 'title' && typeof value === 'string') {
            setFormData(prev => ({
                ...prev,
                slug: generateSlug(value)
            }));
        }

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleSEOChange = (field: string, value: string | string[]) => {
        setFormData(prev => ({
            ...prev,
            seo: {
                ...prev.seo,
                [field]: value
            }
        }));
    };

    const handleAddTag = () => {
        if (newTag.trim() && formData.tags && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...(prev.tags || []), newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: (prev.tags || []).filter(tag => tag !== tagToRemove)
        }));
    };

    const handleAddKeyword = () => {
        const keyword = newTag.trim();
        if (keyword && formData.seo && formData.seo.keywords && !(formData.seo.keywords || []).includes(keyword)) {
            setFormData(prev => ({
                ...prev,
                seo: {
                    ...prev.seo,
                    keywords: [...(prev.seo?.keywords || []), keyword]
                }
            }));
            setNewTag('');
        }
    };

    const handleRemoveKeyword = (keywordToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            seo: {
                ...prev.seo,
                keywords: (prev.seo?.keywords || []).filter(keyword => keyword !== keywordToRemove)
            }
        }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.title?.trim()) {
            newErrors.title = 'Tiêu đề là bắt buộc';
        } else if (formData.title.length < 10) {
            newErrors.title = 'Tiêu đề phải có ít nhất 10 ký tự';
        }

        if (!formData.slug?.trim()) {
            newErrors.slug = 'Slug là bắt buộc';
        }

        if (!formData.excerpt?.trim()) {
            newErrors.excerpt = 'Tóm tắt là bắt buộc';
        } else if (formData.excerpt.length < 50) {
            newErrors.excerpt = 'Tóm tắt phải có ít nhất 50 ký tự';
        }

        if (!formData.content?.trim()) {
            newErrors.content = 'Nội dung là bắt buộc';
        } else if (formData.content.length < 100) {
            newErrors.content = 'Nội dung phải có ít nhất 100 ký tự';
        }

        if (!formData.category) {
            newErrors.category = 'Danh mục là bắt buộc';
        }

        if (!formData.featuredImage?.trim()) {
            newErrors.featuredImage = 'Hình ảnh đại diện là bắt buộc';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm() || !article) {
            return;
        }

        setSaving(true);
        try {
            // Map form data to API format
            const updateData: UpdateNewsData = {
                title: formData.title,
                slug: formData.slug,
                excerpt: formData.excerpt,
                content: formData.content,
                categoryId: formData.category, // Map category to categoryId
                isFeatured: formData.featured, // Map featured to isFeatured
                status: formData.status,
                tags: formData.tags,
                seo: formData.seo,
                isBreaking: formData.isBreaking,
                allowComments: formData.allowComments,
                featuredImage: formData.featuredImage,
                publishedAt: formData.publishedAt,
                author: formData.author,
                imageUrl: formData.imageUrl,
                imageAlt: formData.imageAlt,
                viewCount: formData.viewCount,
                likeCount: formData.likeCount,
                shareCount: formData.shareCount,
                isTrending: formData.isTrending,
                featuredImageUrl: formData.featuredImageUrl,
                featuredImageAlt: formData.featuredImageAlt,
                gallery: formData.gallery,
                relatedArticles: formData.relatedArticles,
                customFields: formData.customFields,
                notes: formData.notes
            };

            await newsService.updateNews(article._id, updateData);
            router.push(`/admin/content/news/${article._id}`);
        } catch (error) {
            console.error('Error updating article:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (article) {
            router.push(`/admin/content/news/${article._id}`);
        } else {
            router.push('/admin/content');
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!article) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">Không tìm thấy bài viết</Alert>
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
                    <Link
                        color="inherit"
                        href={`/admin/content/news/${article._id}`}
                        sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                    >
                        {article.title}
                    </Link>
                    <Typography color="text.primary">Chỉnh sửa</Typography>
                </Breadcrumbs>

                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton onClick={() => router.back()}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            Chỉnh sửa bài viết
                        </Typography>
                    </Box>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Basic Information */}
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 3, color: 'primary.main' }}>
                                        Thông tin cơ bản
                                    </Typography>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={8}>
                                            <TextField
                                                fullWidth
                                                label="Tiêu đề bài viết"
                                                value={formData.title}
                                                onChange={(e) => handleInputChange('title', e.target.value)}
                                                error={!!errors.title}
                                                helperText={errors.title}
                                                required
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                fullWidth
                                                label="Slug"
                                                value={formData.slug}
                                                onChange={(e) => handleInputChange('slug', e.target.value)}
                                                error={!!errors.slug}
                                                helperText={errors.slug || "Slug sẽ được tự động tạo từ tiêu đề"}
                                                required
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Tóm tắt"
                                                multiline
                                                rows={3}
                                                value={formData.excerpt}
                                                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                                                error={!!errors.excerpt}
                                                helperText={errors.excerpt}
                                                required
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                                                Nội dung bài viết *
                                            </Typography>
                                            <RichTextEditor
                                                value={formData.content || ''}
                                                onChange={(content) => handleInputChange('content', content)}
                                                height={400}
                                                error={!!errors.content}
                                                helperText={errors.content}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <FormControl fullWidth error={!!errors.category}>
                                                <InputLabel>Danh mục</InputLabel>
                                                <Select
                                                    value={formData.category}
                                                    label="Danh mục"
                                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                                >
                                                    {categories.map((category) => (
                                                        <MenuItem key={category._id} value={category._id}>
                                                            {category.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {errors.category && (
                                                    <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                                                        {errors.category}
                                                    </Typography>
                                                )}
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <ImageUpload
                                                value={formData.featuredImage || ''}
                                                onChange={(url) => handleInputChange('featuredImage', url)}
                                                error={!!errors.featuredImage}
                                                helperText={errors.featuredImage || "Upload hoặc nhập URL hình ảnh đại diện cho bài viết"}
                                                label="Hình đại diện"
                                                height={250}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Tags */}
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                                        Tags
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                        {(formData.tags || []).map((tag) => (
                                            <Chip
                                                key={tag}
                                                label={tag}
                                                onDelete={() => handleRemoveTag(tag)}
                                                color="primary"
                                                variant="outlined"
                                            />
                                        ))}
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <TextField
                                            size="small"
                                            placeholder="Nhập tag mới"
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                        />
                                        <Button
                                            variant="outlined"
                                            onClick={handleAddTag}
                                            disabled={!newTag.trim()}
                                        >
                                            Thêm
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Settings */}
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                                        Cài đặt
                                    </Typography>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={4}>
                                            <FormControl fullWidth>
                                                <InputLabel>Trạng thái</InputLabel>
                                                <Select
                                                    value={formData.status}
                                                    label="Trạng thái"
                                                    onChange={(e) => handleInputChange('status', e.target.value)}
                                                >
                                                    <MenuItem value="draft">Bản nháp</MenuItem>
                                                    <MenuItem value="published">Đã xuất bản</MenuItem>
                                                    <MenuItem value="archived">Lưu trữ</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} md={8}>
                                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={formData.featured}
                                                            onChange={(e) => handleInputChange('featured', e.target.checked)}
                                                        />
                                                    }
                                                    label="Bài viết nổi bật"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={formData.isBreaking || false}
                                                            onChange={(e) => handleInputChange('isBreaking', e.target.checked)}
                                                        />
                                                    }
                                                    label="Tin nóng"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={formData.allowComments ?? true}
                                                            onChange={(e) => handleInputChange('allowComments', e.target.checked)}
                                                        />
                                                    }
                                                    label="Cho phép bình luận"
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* SEO Settings */}
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                                        SEO Settings
                                    </Typography>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Meta Title"
                                                value={formData.seo?.metaTitle || ''}
                                                onChange={(e) => handleSEOChange('metaTitle', e.target.value)}
                                                helperText="Tiêu đề hiển thị trên kết quả tìm kiếm"
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Meta Description"
                                                multiline
                                                rows={2}
                                                value={formData.seo?.metaDescription || ''}
                                                onChange={(e) => handleSEOChange('metaDescription', e.target.value)}
                                                helperText="Mô tả hiển thị trên kết quả tìm kiếm"
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                                Keywords
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                                {(formData.seo?.keywords || []).map((keyword) => (
                                                    <Chip
                                                        key={keyword}
                                                        label={keyword}
                                                        onDelete={() => handleRemoveKeyword(keyword)}
                                                        color="secondary"
                                                        variant="outlined"
                                                    />
                                                ))}
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <TextField
                                                    size="small"
                                                    placeholder="Nhập keyword mới"
                                                    value={newTag}
                                                    onChange={(e) => setNewTag(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                                                />
                                                <Button
                                                    variant="outlined"
                                                    onClick={handleAddKeyword}
                                                    disabled={!newTag.trim()}
                                                >
                                                    Thêm
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Actions */}
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<CancelIcon />}
                                    onClick={handleCancel}
                                    disabled={saving}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    disabled={saving}
                                    sx={{
                                        backgroundColor: '#E7C873',
                                        color: '#000',
                                        '&:hover': {
                                            backgroundColor: '#d4b86a',
                                        },
                                    }}
                                >
                                    {saving ? 'Đang lưu...' : 'Cập nhật bài viết'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </AdminLayout>
    );
};

export default NewsEditPage;
