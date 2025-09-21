'use client'

import React, { useState } from 'react';
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
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Category as CategoryIcon,
} from '@mui/icons-material';

interface NewsCategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    articleCount: number;
    status: 'active' | 'inactive';
    createdAt: string;
}

const NewsCategoriesManagement: React.FC = () => {
    const [categories, setCategories] = useState<NewsCategory[]>([
        {
            id: 1,
            name: 'Thị trường BDS',
            slug: 'thi-truong-bds',
            description: 'Tin tức và phân tích về thị trường bất động sản',
            articleCount: 15,
            status: 'active',
            createdAt: '2024-01-15'
        },
        {
            id: 2,
            name: 'Sản phẩm Sâm',
            slug: 'san-pham-sam',
            description: 'Thông tin về các sản phẩm sâm và lợi ích sức khỏe',
            articleCount: 8,
            status: 'active',
            createdAt: '2024-01-10'
        },
        {
            id: 3,
            name: 'Chính sách',
            slug: 'chinh-sach',
            description: 'Cập nhật các chính sách liên quan đến BDS và kinh doanh',
            articleCount: 5,
            status: 'active',
            createdAt: '2024-01-08'
        },
        {
            id: 4,
            name: 'Dự án mới',
            slug: 'du-an-moi',
            description: 'Giới thiệu các dự án bất động sản mới',
            articleCount: 3,
            status: 'inactive',
            createdAt: '2024-01-05'
        },
    ]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCategory, setSelectedCategory] = useState<NewsCategory | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'active' as const
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
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
                description: selectedCategory.description,
                status: selectedCategory.status
            });
            setFormDialogOpen(true);
        }
        handleMenuClose();
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = () => {
        if (selectedCategory) {
            setCategories(categories.filter(cat => cat.id !== selectedCategory.id));
            setDeleteDialogOpen(false);
            setSelectedCategory(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedCategory(null);
    };

    const handleAddCategory = () => {
        setFormMode('add');
        setFormData({
            name: '',
            description: '',
            status: 'active'
        });
        setErrors({});
        setFormDialogOpen(true);
    };

    const handleFormClose = () => {
        setFormDialogOpen(false);
        setSelectedCategory(null);
        setErrors({});
    };

    const handleFormChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

        if (!formData.description.trim()) {
            newErrors.description = 'Mô tả là bắt buộc';
        }

        const duplicateName = categories.find(cat =>
            cat.name.toLowerCase() === formData.name.toLowerCase() &&
            (formMode === 'add' || cat.id !== selectedCategory?.id)
        );

        if (duplicateName) {
            newErrors.name = 'Tên danh mục đã tồn tại';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = () => {
        if (validateForm()) {
            if (formMode === 'add') {
                const newCategory: NewsCategory = {
                    id: Math.max(...categories.map(c => c.id)) + 1,
                    name: formData.name,
                    slug: generateSlug(formData.name),
                    description: formData.description,
                    status: formData.status,
                    articleCount: 0,
                    createdAt: new Date().toISOString().split('T')[0],
                };
                setCategories([...categories, newCategory]);
            } else if (formMode === 'edit' && selectedCategory) {
                setCategories(categories.map(cat =>
                    cat.id === selectedCategory.id
                        ? {
                            ...cat,
                            name: formData.name,
                            slug: generateSlug(formData.name),
                            description: formData.description,
                            status: formData.status
                        }
                        : cat
                ));
            }
            handleFormClose();
        }
    };

    const getStatusColor = (status: string) => {
        return status === 'active' ? 'success' : 'default';
    };

    const getStatusLabel = (status: string) => {
        return status === 'active' ? 'Đang sử dụng' : 'Ngừng sử dụng';
    };

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
                    <Grid item xs={12} md={6} lg={4} key={category.id}>
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
                                        label={getStatusLabel(category.status)}
                                        color={getStatusColor(category.status) as any}
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
                                    <TableRow key={category.id} hover>
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
                                                label={getStatusLabel(category.status)}
                                                color={getStatusColor(category.status) as any}
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
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleFormClose}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleFormSubmit}
                        variant="contained"
                        sx={{
                            backgroundColor: '#E7C873',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#d4b86a',
                            },
                        }}
                    >
                        {formMode === 'add' ? 'Thêm danh mục' : 'Cập nhật'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default NewsCategoriesManagement;
