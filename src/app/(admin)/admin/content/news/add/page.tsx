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
    CircularProgress,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../../../../components/admin/AdminLayout';
import RichTextEditor from '../../../../../../components/admin/RichTextEditor';
import ImageUpload from '../../../../../../components/admin/ImageUpload';
import { newsService } from '../../../../../../services/admin/newsService';
import type { CreateNewsData, NewsCategory, NewsTag } from '../../../../../../services/admin/newsService';

const NewsAddPage: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [categories, setCategories] = useState<NewsCategory[]>([]);
    const [_tags, setTags] = useState<NewsTag[]>([]);
    const [newTag, setNewTag] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [formData, setFormData] = useState<CreateNewsData>({
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


    // Load categories and tags
    useEffect(() => {
        loadCategoriesAndTags();
    }, []);

    const loadCategoriesAndTags = async () => {
        setLoading(true);
        try {
            const [categoriesRes, tagsRes] = await Promise.all([
                newsService.getNewsCategories(),
                newsService.getNewsTags()
            ]);

            if (categoriesRes.success) {
                setCategories(categoriesRes.data || []);
            }
            if (tagsRes.success) {
                setTags(tagsRes.data || []);
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
            .normalize('NFD') // Normalize to NFD form
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleInputChange = (field: string, value: string | string[] | boolean) => {
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

    const handleSeoChange = (field: string, value: string | string[]) => {
        setFormData(prev => ({
            ...prev,
            seo: {
                ...prev.seo,
                [field]: value
            }
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Tiêu đề là bắt buộc';
        } else if (formData.title.length < 10) {
            newErrors.title = 'Tiêu đề phải có ít nhất 10 ký tự';
        }

        if (!formData.slug?.trim()) {
            newErrors.slug = 'Slug là bắt buộc';
        }

        if (!formData.excerpt.trim()) {
            newErrors.excerpt = 'Mô tả ngắn là bắt buộc';
        } else if (formData.excerpt.length < 20) {
            newErrors.excerpt = 'Mô tả phải có ít nhất 20 ký tự';
        }

        if (!formData.content.trim()) {
            newErrors.content = 'Nội dung là bắt buộc';
        } else if (formData.content.length < 100) {
            newErrors.content = 'Nội dung phải có ít nhất 100 ký tự';
        }

        if (!formData.category) {
            newErrors.category = 'Danh mục là bắt buộc';
        }

        if (!formData.featuredImage.trim()) {
            newErrors.featuredImage = 'Hình đại diện là bắt buộc';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSaving(true);
        try {
            // Map form data to API format
            const newsData: CreateNewsData = {
                title: formData.title,
                slug: formData.slug,
                excerpt: formData.excerpt,
                content: formData.content,
                categoryId: formData.category, // Map category to categoryId
                isFeatured: formData.featured, // Map featured to isFeatured
                status: formData.status,
                tags: formData.tags,
                seo: formData.seo || {
                    metaTitle: '',
                    metaDescription: '',
                    keywords: []
                },
                isBreaking: formData.isBreaking || false,
                allowComments: formData.allowComments ?? true,
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

            const response = await newsService.createNews(newsData);
            if (response.success) {
                router.push('/admin/content');
            } else {
                console.error('Error creating news:', response.message);
            }
        } catch (error) {
            console.error('Error creating news:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleAddTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleAddKeyword = () => {
        const keyword = newTag.trim();
        if (keyword && formData.seo && !(formData.seo.keywords || []).includes(keyword)) {
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

    if (loading) {
        return (
            <AdminLayout>
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <CircularProgress />
                </Box>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <Box sx={{ p: 3 }}>
                {/* Breadcrumbs */}
                <Breadcrumbs sx={{ mb: 3 }}>
                    <Link href="/admin/content" color="inherit">
                        Quản lý nội dung
                    </Link>
                    <Link href="/admin/content/news" color="inherit">
                        Tin tức
                    </Link>
                    <Typography color="text.primary">Thêm bài viết</Typography>
                </Breadcrumbs>

                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <IconButton onClick={() => router.back()} sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" component="h1">
                        Thêm bài viết mới
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Main Content */}
                        <Grid item xs={12} md={8}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 3 }}>
                                        Thông tin cơ bản
                                    </Typography>

                                    {/* Title */}
                                    <TextField
                                        fullWidth
                                        label="Tiêu đề bài viết"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        error={!!errors.title}
                                        helperText={errors.title || "Tiêu đề sẽ được tự động tạo slug"}
                                        required
                                        sx={{ mb: 3 }}
                                    />

                                    {/* Slug */}
                                    <TextField
                                        fullWidth
                                        label="Slug"
                                        value={formData.slug || ''}
                                        onChange={(e) => handleInputChange('slug', e.target.value)}
                                        error={!!errors.slug}
                                        helperText={errors.slug || "Slug sẽ được tự động tạo từ tiêu đề"}
                                        required
                                        sx={{ mb: 3 }}
                                    />

                                    {/* Excerpt */}
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        label="Mô tả ngắn"
                                        value={formData.excerpt}
                                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                                        error={!!errors.excerpt}
                                        helperText={errors.excerpt || "Mô tả ngắn sẽ hiển thị trong danh sách bài viết"}
                                        required
                                        sx={{ mb: 3 }}
                                    />

                                    {/* Content */}
                                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                                        Nội dung bài viết *
                                    </Typography>
                                    <RichTextEditor
                                        value={formData.content}
                                        onChange={(content) => handleInputChange('content', content)}
                                        height={400}
                                        error={!!errors.content}
                                        helperText={errors.content}
                                    />

                                    {/* Tags */}
                                    <Box sx={{ mt: 3 }}>
                                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                                            Danh mục
                                        </Typography>
                                        <FormControl fullWidth error={!!errors.category}>
                                            <InputLabel>Chọn danh mục</InputLabel>
                                            <Select
                                                value={formData.category}
                                                onChange={(e) => handleInputChange('category', e.target.value)}
                                                label="Chọn danh mục"
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
                                    </Box>

                                    {/* Featured Image */}
                                    <Box sx={{ mt: 3 }}>
                                        <ImageUpload
                                            value={formData.featuredImage}
                                            onChange={(url) => handleInputChange('featuredImage', url)}
                                            error={!!errors.featuredImage}
                                            helperText={errors.featuredImage || "Upload hoặc nhập URL hình ảnh đại diện cho bài viết"}
                                            label="Hình đại diện"
                                            height={250}
                                        />
                                    </Box>

                                    {/* Tags */}
                                    <Box sx={{ mt: 3 }}>
                                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                                            Thẻ tag
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                            <TextField
                                                size="small"
                                                placeholder="Nhập tag mới"
                                                value={newTag}
                                                onChange={(e) => setNewTag(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleAddTag();
                                                    }
                                                }}
                                            />
                                            <Button onClick={handleAddTag} variant="outlined" size="small">
                                                Thêm
                                            </Button>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                            {formData.tags.map((tag, index) => (
                                                <Chip
                                                    key={index}
                                                    label={tag}
                                                    onDelete={() => handleRemoveTag(tag)}
                                                    size="small"
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Sidebar */}
                        <Grid item xs={12} md={4}>
                            {/* Status */}
                            <Card sx={{ mb: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                        Trạng thái
                                    </Typography>
                                    <FormControl fullWidth>
                                        <InputLabel>Trạng thái</InputLabel>
                                        <Select
                                            value={formData.status}
                                            onChange={(e) => handleInputChange('status', e.target.value)}
                                            label="Trạng thái"
                                        >
                                            <MenuItem value="draft">Nháp</MenuItem>
                                            <MenuItem value="published">Xuất bản</MenuItem>
                                        </Select>
                                    </FormControl>
                                </CardContent>
                            </Card>

                            {/* Settings */}
                            <Card sx={{ mb: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                        Cài đặt
                                    </Typography>

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData.featured}
                                                onChange={(e) => handleInputChange('featured', e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label="Bài viết nổi bật"
                                        sx={{ mb: 2, display: 'block' }}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData.isBreaking || false}
                                                onChange={(e) => handleInputChange('isBreaking', e.target.checked)}
                                                color="error"
                                            />
                                        }
                                        label="Tin nóng"
                                        sx={{ mb: 2, display: 'block' }}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData.allowComments ?? true}
                                                onChange={(e) => handleInputChange('allowComments', e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label="Cho phép bình luận"
                                        sx={{ mb: 2, display: 'block' }}
                                    />
                                </CardContent>
                            </Card>

                            {/* SEO Settings */}
                            <Card sx={{ mb: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                        SEO
                                    </Typography>

                                    <TextField
                                        fullWidth
                                        label="Meta Title"
                                        value={formData.seo?.metaTitle || ''}
                                        onChange={(e) => handleSeoChange('metaTitle', e.target.value)}
                                        placeholder="Tiêu đề hiển thị trên công cụ tìm kiếm"
                                        sx={{ mb: 2 }}
                                    />

                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        label="Meta Description"
                                        value={formData.seo?.metaDescription || ''}
                                        onChange={(e) => handleSeoChange('metaDescription', e.target.value)}
                                        placeholder="Mô tả hiển thị trên công cụ tìm kiếm"
                                        sx={{ mb: 2 }}
                                    />

                                    <Box>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            Keywords
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                            <TextField
                                                id="keyword-input"
                                                size="small"
                                                placeholder="Nhập keyword"
                                                fullWidth
                                            />
                                            <Button onClick={handleAddKeyword} variant="outlined" size="small">
                                                Thêm
                                            </Button>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                            {(formData.seo?.keywords || []).map((keyword, index) => (
                                                <Chip
                                                    key={index}
                                                    label={keyword}
                                                    onDelete={() => handleRemoveKeyword(keyword)}
                                                    size="small"
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            startIcon={<SaveIcon />}
                                            disabled={saving}
                                            fullWidth
                                        >
                                            {saving ? 'Đang lưu...' : 'Lưu bài viết'}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            startIcon={<CancelIcon />}
                                            onClick={() => router.back()}
                                            fullWidth
                                        >
                                            Hủy
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </AdminLayout>
    );
};

export default NewsAddPage;