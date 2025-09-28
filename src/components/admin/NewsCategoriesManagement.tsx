'use client'

import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Grid,
    Chip,
    FormControl,
    InputLabel,
    Select,
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Category as CategoryIcon,
} from '@mui/icons-material';
import { newsService } from '../../services/admin/newsService';

interface NewsCategory {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    color: string;
    isActive: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
    articleCount?: number;
}

const NewsCategoriesManagement: React.FC = () => {
    const [categories, setCategories] = useState<NewsCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCategory, setSelectedCategory] = useState<NewsCategory | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        color: '#E7C873',
        isActive: true
    });

    // Load categories from API
    const loadCategories = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await newsService.getNewsCategories();

            // Handle different response structures
            if (response.success && response.data) {
                setCategories(response.data);
            } else if (Array.isArray(response)) {
                setCategories(response);
            } else if (response.data) {
                setCategories(response.data);
            } else {
                setCategories([]);
            }
        } catch (err) {
            console.error('Error loading categories:', err);
            setError('Không thể tải danh sách danh mục');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Function to generate slug from name
    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, category: NewsCategory) => {
        setAnchorEl(event.currentTarget);
        setSelectedCategory(category);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedCategory(null);
    };

    const handleEdit = () => {
        if (selectedCategory) {
            setFormMode('edit');
            setFormData({
                name: selectedCategory.name,
                description: selectedCategory.description || '',
                color: selectedCategory.color,
                isActive: selectedCategory.isActive
            });
            setFormDialogOpen(true);
        }
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (selectedCategory) {
            try {
                setLoading(true);
                await newsService.deleteNewsCategory(selectedCategory._id);
                await loadCategories();
                setDeleteDialogOpen(false);
                setSelectedCategory(null);
                handleMenuClose();
            } catch (err) {
                console.error('Error deleting category:', err);
                setError('Không thể xóa danh mục: ' + (err as Error)?.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedCategory(null);
        handleMenuClose();
    };

    const handleToggleStatus = async () => {
        if (selectedCategory) {
            try {
                setLoading(true);
                await newsService.toggleNewsCategoryStatus(selectedCategory._id);
                await loadCategories();
                handleMenuClose();
            } catch (err) {
                console.error('Error toggling category status:', err);
                setError('Không thể thay đổi trạng thái danh mục: ' + (err as Error)?.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleAddCategory = () => {
        setFormMode('add');
        setFormData({
            name: '',
            description: '',
            color: '#E7C873',
            isActive: true
        });
        setErrors({});
        setFormDialogOpen(true);
    };

    const handleFormClose = () => {
        setFormDialogOpen(false);
        setSelectedCategory(null);
        setErrors({});
        handleMenuClose(); // Close menu when closing form
    };

    const handleFormChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Tên danh mục là bắt buộc';
        }

        const duplicateName = categories.find(cat =>
            cat.name.toLowerCase() === formData.name.toLowerCase() &&
            cat._id !== selectedCategory?._id
        );

        if (duplicateName) {
            newErrors.name = 'Tên danh mục đã tồn tại';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async () => {
        if (validateForm()) {
            try {
                setLoading(true);
                const slug = generateSlug(formData.name);

                if (formMode === 'add') {
                    await newsService.createNewsCategory({
                        name: formData.name,
                        slug: slug,
                        description: formData.description,
                        color: formData.color,
                        isActive: formData.isActive
                    });
                } else if (formMode === 'edit' && selectedCategory) {
                    await newsService.updateNewsCategory(selectedCategory._id, {
                        name: formData.name,
                        slug: slug,
                        description: formData.description,
                        color: formData.color,
                        isActive: formData.isActive
                    });
                }
                await loadCategories();
                handleFormClose();
            } catch (err) {
                console.error('Error saving category:', err);
                setError('Không thể lưu danh mục: ' + (err as Error)?.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        }
    };

    const getStatusColor = (status: string) => {
        return status === 'active' ? 'success' : 'default';
    };

    const getStatusLabel = (status: string) => {
        return status === 'active' ? 'Đang sử dụng' : 'Ngừng sử dụng';
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <Typography>Đang tải danh mục...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Danh mục Tin tức ({categories.length})
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddCategory}
                    sx={{
                        backgroundColor: '#E7C873',
                        color: '#000',
                        '&:hover': {
                            backgroundColor: '#d4b86a',
                        },
                    }}
                >
                    Thêm Danh mục
                </Button>
            </Box>

            {/* Categories Grid */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {categories.map((category) => (
                    <Grid item xs={12} md={6} lg={4} key={category._id}>
                        <Card
                            sx={{
                                height: '100%',
                                position: 'relative',
                                '&:hover': {
                                    boxShadow: 6,
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease'
                                }
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CategoryIcon sx={{ color: '#E7C873' }} />
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {category.name}
                                        </Typography>
                                    </Box>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => handleMenuOpen(e, category)}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                                    {category.description}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        Số bài viết: {category.articleCount}
                                    </Typography>
                                    <Chip
                                        label={getStatusLabel(category.isActive ? 'active' : 'inactive')}
                                        color={getStatusColor(category.isActive ? 'active' : 'inactive') as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
                                        size="small"
                                    />
                                </Box>

                                <Typography variant="caption" color="text.secondary">
                                    Slug: /{category.slug}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Detailed Table */}
            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Chi tiết Danh mục
                    </Typography>
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tên danh mục</TableCell>
                                    <TableCell>Slug</TableCell>
                                    <TableCell>Mô tả</TableCell>
                                    <TableCell align="center">Số bài viết</TableCell>
                                    <TableCell align="center">Trạng thái</TableCell>
                                    <TableCell align="center">Ngày tạo</TableCell>
                                    <TableCell align="center">Hành động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories.map((category) => (
                                    <TableRow key={category._id} hover>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CategoryIcon sx={{ color: '#E7C873' }} />
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                    {category.name}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                                                /{category.slug}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {category.description}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {category.articleCount}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={getStatusLabel(category.isActive ? 'active' : 'inactive')}
                                                color={getStatusColor(category.isActive ? 'active' : 'inactive') as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body2">
                                                {new Date(category.createdAt).toLocaleDateString('vi-VN')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                onClick={(e) => handleMenuOpen(e, category)}
                                                size="small"
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: { width: 200 },
                }}
            >
                <MenuItem onClick={handleEdit}>
                    <EditIcon sx={{ mr: 1 }} />
                    Chỉnh sửa
                </MenuItem>
                <MenuItem onClick={handleToggleStatus}>
                    <CategoryIcon sx={{ mr: 1 }} />
                    {selectedCategory?.isActive ? 'Ngừng sử dụng' : 'Kích hoạt'}
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <DeleteIcon sx={{ mr: 1 }} />
                    Xóa
                </MenuItem>
            </Menu>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                PaperProps={{
                    sx: { overflow: 'visible' }
                }}
            >
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa danh mục "{selectedCategory?.name}"?
                        Hành động này sẽ ảnh hưởng đến {selectedCategory?.articleCount} bài viết và không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Hủy</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Form Dialog */}
            <Dialog
                open={formDialogOpen}
                onClose={handleFormClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { overflow: 'visible' }
                }}
            >
                <DialogTitle>
                    {formMode === 'add' ? '🏷️ Thêm Danh mục Mới' : '✏️ Chỉnh sửa Danh mục'}
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tên danh mục"
                                value={formData.name}
                                onChange={handleFormChange('name')}
                                error={!!errors.name}
                                helperText={errors.name}
                                placeholder="VD: Thị trường BDS"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Mô tả"
                                multiline
                                rows={3}
                                value={formData.description}
                                onChange={handleFormChange('description')}
                                error={!!errors.description}
                                helperText={errors.description}
                                placeholder="Mô tả chi tiết về danh mục này..."
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Màu sắc"
                                type="color"
                                value={formData.color}
                                onChange={handleFormChange('color')}
                                InputProps={{
                                    style: { height: '56px' }
                                }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Trạng thái</InputLabel>
                                <Select
                                    value={formData.isActive ? 'active' : 'inactive'}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        isActive: e.target.value === 'active'
                                    }))}
                                    label="Trạng thái"
                                >
                                    <MenuItem value="active">Đang sử dụng</MenuItem>
                                    <MenuItem value="inactive">Ngừng sử dụng</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleFormClose}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleFormSubmit}
                        variant="contained"
                        disabled={loading}
                        sx={{
                            backgroundColor: '#E7C873',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#d4b86a',
                            },
                        }}
                    >
                        {loading ? 'Đang xử lý...' : (formMode === 'add' ? 'Thêm danh mục' : 'Cập nhật')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default NewsCategoriesManagement;
