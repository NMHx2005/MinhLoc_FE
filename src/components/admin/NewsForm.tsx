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
    Box,
    Typography,
    Switch,
    FormControlLabel,
    Chip,
    OutlinedInput,
    Avatar,
    IconButton,
} from '@mui/material';
import {
    CloudUpload as UploadIcon,
    Photo as PhotoIcon,
    Add as AddIcon,
} from '@mui/icons-material';

interface NewsArticle {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    author: string;
    status: 'draft' | 'published' | 'archived';
    featured: boolean;
    featuredImage: string;
    publishedAt: string;
    createdAt: string;
    views: number;
}

interface NewsFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<NewsArticle>) => void;
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
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: '',
        tags: [] as string[],
        author: 'Admin',
        status: 'draft' as const,
        featured: false,
        featuredImage: '/placeholder-news.jpg',
        publishedAt: '',
    });

    const [newTag, setNewTag] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const categories = [
        'Thị trường BDS',
        'Sản phẩm Sâm',
        'Chính sách',
        'Dự án mới',
        'Kiến thức',
        'Tin tức',
    ];

    const availableTags = [
        'BDS', 'Đầu tư', 'Sâm Ngọc Linh', 'Kontum', 'Y học',
        'Thuế', 'Chính sách', 'Sâm Hàn Quốc', 'Sức khỏe',
        'Căn hộ', 'Quận 7', 'Cao cấp', 'Dự án'
    ];

    useEffect(() => {
        if (initialData && (mode === 'edit' || mode === 'view')) {
            setFormData({
                title: initialData.title,
                slug: initialData.slug,
                excerpt: initialData.excerpt,
                content: initialData.content,
                category: initialData.category,
                tags: initialData.tags,
                author: initialData.author,
                status: initialData.status,
                featured: initialData.featured,
                featuredImage: initialData.featuredImage,
                publishedAt: initialData.publishedAt,
            });
        } else {
            setFormData({
                title: '',
                slug: '',
                excerpt: '',
                content: '',
                category: '',
                tags: [],
                author: 'Admin',
                status: 'draft',
                featured: false,
                featuredImage: '/placeholder-news.jpg',
                publishedAt: '',
            });
        }
        setErrors({});
    }, [initialData, mode, open]);

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    };

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setFormData(prev => {
            const newData = {
                ...prev,
                [field]: value
            };

            // Auto-generate slug from title
            if (field === 'title') {
                newData.slug = generateSlug(value);
            }

            return newData;
        });

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleSelectChange = (field: string) => (event: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));

        // Clear error when user selects
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleSwitchChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.checked
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

    const handleAvailableTagClick = (tag: string) => {
        if (!formData.tags.includes(tag)) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tag]
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Tiêu đề là bắt buộc';
        }

        if (!formData.excerpt.trim()) {
            newErrors.excerpt = 'Tóm tắt là bắt buộc';
        }

        if (!formData.content.trim()) {
            newErrors.content = 'Nội dung là bắt buộc';
        }

        if (!formData.category) {
            newErrors.category = 'Danh mục là bắt buộc';
        }

        if (formData.status === 'published' && !formData.publishedAt) {
            const today = new Date().toISOString().split('T')[0];
            setFormData(prev => ({ ...prev, publishedAt: today }));
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (mode === 'view') {
            onClose();
            return;
        }

        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData(prev => ({
                    ...prev,
                    featuredImage: e.target?.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const isReadOnly = mode === 'view';

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: { overflow: 'visible' }
            }}
        >
            <DialogTitle>
                {mode === 'add' ? '📝 Thêm Bài viết Mới' :
                    mode === 'edit' ? '✏️ Chỉnh sửa Bài viết' :
                        '👁️ Xem Chi tiết Bài viết'}
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    {/* Featured Image */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="subtitle2" sx={{ mb: 2 }}>
                                Ảnh đại diện
                            </Typography>
                            <Avatar
                                src={formData.featuredImage}
                                sx={{
                                    width: '100%',
                                    height: 160,
                                    borderRadius: 2,
                                    mb: 2,
                                    bgcolor: '#f5f5f5'
                                }}
                                variant="rounded"
                            >
                                <PhotoIcon sx={{ fontSize: 40, color: '#999' }} />
                            </Avatar>
                            {!isReadOnly && (
                                <>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="featured-image-upload"
                                        type="file"
                                        onChange={handleImageUpload}
                                    />
                                    <label htmlFor="featured-image-upload">
                                        <IconButton
                                            color="primary"
                                            component="span"
                                            sx={{
                                                border: '2px dashed #E7C873',
                                                borderRadius: 2,
                                                p: 2,
                                                '&:hover': {
                                                    backgroundColor: 'rgba(231, 200, 115, 0.1)'
                                                }
                                            }}
                                        >
                                            <UploadIcon />
                                        </IconButton>
                                    </label>
                                    <Typography variant="caption" display="block" color="text.secondary">
                                        Nhấp để tải ảnh lên
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Grid>

                    {/* Article Information */}
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Tiêu đề bài viết"
                                    value={formData.title}
                                    onChange={handleChange('title')}
                                    error={!!errors.title}
                                    helperText={errors.title}
                                    disabled={isReadOnly}
                                    placeholder="VD: Xu hướng bất động sản 2024"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Slug URL"
                                    value={formData.slug}
                                    onChange={handleChange('slug')}
                                    disabled={isReadOnly}
                                    helperText="URL thân thiện cho bài viết (tự động tạo từ tiêu đề)"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth error={!!errors.category}>
                                    <InputLabel>Danh mục</InputLabel>
                                    <Select
                                        value={formData.category}
                                        label="Danh mục"
                                        onChange={handleSelectChange('category')}
                                        disabled={isReadOnly}
                                    >
                                        {categories.map(category => (
                                            <MenuItem key={category} value={category}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.category && (
                                        <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                                            {errors.category}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Tác giả"
                                    value={formData.author}
                                    onChange={handleChange('author')}
                                    disabled={isReadOnly}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Tóm tắt"
                                    multiline
                                    rows={2}
                                    value={formData.excerpt}
                                    onChange={handleChange('excerpt')}
                                    error={!!errors.excerpt}
                                    helperText={errors.excerpt}
                                    disabled={isReadOnly}
                                    placeholder="Tóm tắt nội dung bài viết..."
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nội dung"
                                    multiline
                                    rows={6}
                                    value={formData.content}
                                    onChange={handleChange('content')}
                                    error={!!errors.content}
                                    helperText={errors.content}
                                    disabled={isReadOnly}
                                    placeholder="Nội dung chi tiết của bài viết..."
                                />
                            </Grid>

                            {/* Tags */}
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    Tags
                                </Typography>

                                {/* Current Tags */}
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                    {formData.tags.map(tag => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            onDelete={!isReadOnly ? () => handleRemoveTag(tag) : undefined}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    ))}
                                </Box>

                                {!isReadOnly && (
                                    <>
                                        {/* Add New Tag */}
                                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                            <TextField
                                                size="small"
                                                placeholder="Thêm tag mới..."
                                                value={newTag}
                                                onChange={(e) => setNewTag(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleAddTag();
                                                    }
                                                }}
                                            />
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={handleAddTag}
                                                startIcon={<AddIcon />}
                                            >
                                                Thêm
                                            </Button>
                                        </Box>

                                        {/* Available Tags */}
                                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                                            Tags có sẵn (nhấp để thêm):
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {availableTags.map(tag => (
                                                <Chip
                                                    key={tag}
                                                    label={tag}
                                                    size="small"
                                                    onClick={() => handleAvailableTagClick(tag)}
                                                    disabled={formData.tags.includes(tag)}
                                                    sx={{
                                                        cursor: formData.tags.includes(tag) ? 'default' : 'pointer',
                                                        opacity: formData.tags.includes(tag) ? 0.5 : 1
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </>
                                )}
                            </Grid>

                            {/* Settings */}
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Trạng thái</InputLabel>
                                    <Select
                                        value={formData.status}
                                        label="Trạng thái"
                                        onChange={handleSelectChange('status')}
                                        disabled={isReadOnly}
                                    >
                                        <MenuItem value="draft">Bản nháp</MenuItem>
                                        <MenuItem value="published">Đã xuất bản</MenuItem>
                                        <MenuItem value="archived">Lưu trữ</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Ngày xuất bản"
                                    type="date"
                                    value={formData.publishedAt}
                                    onChange={handleChange('publishedAt')}
                                    disabled={isReadOnly}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.featured}
                                            onChange={handleSwitchChange('featured')}
                                            disabled={isReadOnly}
                                        />
                                    }
                                    label="Bài viết nổi bật"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose}>
                    {isReadOnly ? 'Đóng' : 'Hủy'}
                </Button>
                {!isReadOnly && (
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            backgroundColor: '#E7C873',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#d4b86a',
                            },
                        }}
                    >
                        {mode === 'add' ? 'Thêm bài viết' : 'Cập nhật'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default NewsForm;
