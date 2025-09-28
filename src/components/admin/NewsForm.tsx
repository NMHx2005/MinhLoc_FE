'use client'

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Chip,
    Box,
    Typography,
    IconButton,
    Alert,
    CircularProgress,
    Autocomplete,
    Divider,
} from '@mui/material';
import {
    Close as CloseIcon,
    Add as AddIcon,
    Delete as DeleteIcon,
    Image as ImageIcon,
} from '@mui/icons-material';
import { newsService } from '../../services/admin/newsService';
import type { NewsArticle, CreateNewsData, UpdateNewsData, NewsCategory, NewsTag } from '../../services/admin/newsService';

interface NewsFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateNewsData | UpdateNewsData) => void;
    mode: 'add' | 'edit' | 'view';
    initialData?: NewsArticle | null;
}

const NewsForm: React.FC<NewsFormProps> = ({
    open,
    onClose,
    onSubmit,
    mode,
    initialData
}) => {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [categories, setCategories] = useState<NewsCategory[]>([]);
    const [tags, setTags] = useState<NewsTag[]>([]);
    const [newTag, setNewTag] = useState('');
    const [newKeyword, setNewKeyword] = useState('');
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
        if (open) {
            loadCategoriesAndTags();
        }
    }, [open]);

    // Populate form when editing
    useEffect(() => {
        if (initialData && mode !== 'add') {
            console.warn('Initial data for edit:', initialData);
            console.warn('Category ID from initial data:', initialData.categoryId?._id);
            setFormData({
                title: initialData.title || '',
                slug: initialData.slug || '',
                excerpt: initialData.excerpt || '',
                content: initialData.content || '',
                category: initialData.categoryId?._id || '',
                tags: initialData.tags || [],
                status: initialData.status || 'draft',
                featured: initialData.isFeatured || false,
                featuredImage: initialData.featuredImage || '',
                isBreaking: initialData.isBreaking || false,
                allowComments: initialData.allowComments ?? true,
                seo: {
                    metaTitle: initialData.seo?.metaTitle || '',
                    metaDescription: initialData.seo?.metaDescription || '',
                    keywords: initialData.seo?.keywords || []
                }
            });
        } else if (mode === 'add') {
            // Reset form for new article
            setFormData({
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
        }
    }, [initialData, mode]);

    const loadCategoriesAndTags = async () => {
        setLoading(true);
        try {
            const [categoriesResponse, tagsResponse] = await Promise.all([
                newsService.getNewsCategories(),
                newsService.getNewsTags()
            ]);

            // Handle different response structures for categories
            console.warn('Categories response:', categoriesResponse);
            if (categoriesResponse.success && categoriesResponse.data) {
                setCategories(categoriesResponse.data);
                console.warn('Categories loaded from success.data:', categoriesResponse.data);
            } else if (Array.isArray(categoriesResponse)) {
                setCategories(categoriesResponse);
                console.warn('Categories loaded from array:', categoriesResponse);
            } else if (categoriesResponse.data) {
                setCategories(categoriesResponse.data);
                console.warn('Categories loaded from data:', categoriesResponse.data);
            } else {
                setCategories([]);
                console.warn('No categories found');
            }

            // Handle different response structures for tags
            if (tagsResponse.success && tagsResponse.data) {
                setTags(tagsResponse.data);
            } else if (Array.isArray(tagsResponse)) {
                setTags(tagsResponse);
            } else if (tagsResponse.data) {
                setTags(tagsResponse.data);
            } else {
                setTags([]);
            }
        } catch (error) {
            console.error('Error loading categories and tags:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Auto-generate slug from title
        if (field === 'title' && !formData.slug) {
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

    const handleSEOChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            seo: {
                ...prev.seo,
                [field]: value
            }
        }));
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
        const keyword = newKeyword.trim();
        if (keyword && !formData.seo.keywords.includes(keyword)) {
            setFormData(prev => ({
                ...prev,
                seo: {
                    ...prev.seo,
                    keywords: [...prev.seo.keywords, keyword]
                }
            }));
            setNewKeyword('');
        }
    };

    const handleRemoveKeyword = (keywordToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            seo: {
                ...prev.seo,
                keywords: prev.seo.keywords.filter(keyword => keyword !== keywordToRemove)
            }
        }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Tiêu đề là bắt buộc';
        } else if (formData.title.length < 10) {
            newErrors.title = 'Tiêu đề phải có ít nhất 10 ký tự';
        }

        if (!formData.slug.trim()) {
            newErrors.slug = 'Slug là bắt buộc';
        }

        if (!formData.excerpt.trim()) {
            newErrors.excerpt = 'Tóm tắt là bắt buộc';
        } else if (formData.excerpt.length < 50) {
            newErrors.excerpt = 'Tóm tắt phải có ít nhất 50 ký tự';
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
            newErrors.featuredImage = 'Hình ảnh đại diện là bắt buộc';
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
            // Create API data with correct field names
            const apiData = {
                title: formData.title,
                slug: formData.slug,
                excerpt: formData.excerpt,
                content: formData.content,
                categoryId: formData.category, // Map category to categoryId
                isFeatured: formData.featured, // Map featured to isFeatured
                status: formData.status,
                tags: formData.tags,
                seo: formData.seo,
                publishedAt: formData.publishedAt,
                author: formData.author,
                imageUrl: formData.imageUrl,
                imageAlt: formData.imageAlt,
                viewCount: formData.viewCount,
                likeCount: formData.likeCount,
                shareCount: formData.shareCount,
                isBreaking: formData.isBreaking,
                isTrending: formData.isTrending,
                featuredImageUrl: formData.featuredImageUrl,
                featuredImageAlt: formData.featuredImageAlt,
                gallery: formData.gallery,
                relatedArticles: formData.relatedArticles,
                customFields: formData.customFields,
                notes: formData.notes
            };

            await onSubmit(apiData);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setSaving(false);
        }
    };

    const isViewMode = mode === 'view';
    const isEditMode = mode === 'edit';

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: { minHeight: '80vh' }
            }}
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">
                        {mode === 'add' ? 'Thêm bài viết mới' :
                            mode === 'edit' ? 'Chỉnh sửa bài viết' :
                                'Xem chi tiết bài viết'}
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {/* Basic Information */}
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                                    Thông tin cơ bản
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <TextField
                                    fullWidth
                                    label="Tiêu đề bài viết"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    error={!!errors.title}
                                    helperText={errors.title}
                                    disabled={isViewMode}
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
                                    helperText={errors.slug}
                                    disabled={isViewMode}
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
                                    disabled={isViewMode}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nội dung bài viết"
                                    multiline
                                    rows={8}
                                    value={formData.content}
                                    onChange={(e) => handleInputChange('content', e.target.value)}
                                    error={!!errors.content}
                                    helperText={errors.content}
                                    disabled={isViewMode}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth error={!!errors.category}>
                                    <InputLabel>Danh mục</InputLabel>
                                    <Select
                                        value={formData.category}
                                        label="Danh mục"
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        disabled={isViewMode}
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

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Hình ảnh đại diện (URL)"
                                    value={formData.featuredImage}
                                    onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                                    error={!!errors.featuredImage}
                                    helperText={errors.featuredImage}
                                    disabled={isViewMode}
                                    required
                                />
                            </Grid>

                            {/* Tags */}
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                                    Tags
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                    {formData.tags.map((tag) => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            onDelete={isViewMode ? undefined : () => handleRemoveTag(tag)}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    ))}
                                </Box>
                                {!isViewMode && (
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
                                )}
                            </Grid>

                            {/* Settings */}
                            <Grid item xs={12}>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                                    Cài đặt
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Trạng thái</InputLabel>
                                    <Select
                                        value={formData.status}
                                        label="Trạng thái"
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        disabled={isViewMode}
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
                                                disabled={isViewMode}
                                            />
                                        }
                                        label="Bài viết nổi bật"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData.isBreaking}
                                                onChange={(e) => handleInputChange('isBreaking', e.target.checked)}
                                                disabled={isViewMode}
                                            />
                                        }
                                        label="Tin nóng"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData.allowComments}
                                                onChange={(e) => handleInputChange('allowComments', e.target.checked)}
                                                disabled={isViewMode}
                                            />
                                        }
                                        label="Cho phép bình luận"
                                    />
                                </Box>
                            </Grid>

                            {/* SEO Settings */}
                            <Grid item xs={12}>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                                    SEO Settings
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Meta Title"
                                    value={formData.seo.metaTitle}
                                    onChange={(e) => handleSEOChange('metaTitle', e.target.value)}
                                    disabled={isViewMode}
                                    helperText="Tiêu đề hiển thị trên kết quả tìm kiếm"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Meta Description"
                                    multiline
                                    rows={2}
                                    value={formData.seo.metaDescription}
                                    onChange={(e) => handleSEOChange('metaDescription', e.target.value)}
                                    disabled={isViewMode}
                                    helperText="Mô tả hiển thị trên kết quả tìm kiếm"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    Keywords
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                    {formData.seo.keywords.map((keyword) => (
                                        <Chip
                                            key={keyword}
                                            label={keyword}
                                            onDelete={isViewMode ? undefined : () => handleRemoveKeyword(keyword)}
                                            color="secondary"
                                            variant="outlined"
                                        />
                                    ))}
                                </Box>
                                {!isViewMode && (
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <TextField
                                            size="small"
                                            placeholder="Nhập keyword mới"
                                            value={newKeyword}
                                            onChange={(e) => setNewKeyword(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                                        />
                                        <Button
                                            variant="outlined"
                                            onClick={handleAddKeyword}
                                            disabled={!newKeyword.trim()}
                                        >
                                            Thêm
                                        </Button>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    {isViewMode ? 'Đóng' : 'Hủy'}
                </Button>
                {!isViewMode && (
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={saving}
                        sx={{
                            backgroundColor: '#E7C873',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#d4b86a',
                            },
                        }}
                    >
                        {saving ? 'Đang lưu...' : (mode === 'add' ? 'Thêm bài viết' : 'Cập nhật')}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default NewsForm;