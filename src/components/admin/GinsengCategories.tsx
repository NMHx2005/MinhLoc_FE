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
    Alert,
    CircularProgress,
    Snackbar,
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Category as CategoryIcon,
} from '@mui/icons-material';
import { ginsengService } from '../../services/admin/ginsengService';
import type { GinsengCategory } from '../../services/admin/ginsengService';

const GinsengCategories: React.FC = () => {
    const [categories, setCategories] = useState<GinsengCategory[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCategory, setSelectedCategory] = useState<GinsengCategory | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        status: 'active' as 'active' | 'inactive'
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Load categories on component mount
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            setLoading(true);
            setError(null);
            const categoriesData = await ginsengService.getCategories();
            setCategories(categoriesData);
        } catch (err) {
            console.error('Error loading categories:', err);
            setError('Không thể tải danh sách phân loại');
        } finally {
            setLoading(false);
        }
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, category: GinsengCategory) => {
        setAnchorEl(event.currentTarget);
        setSelectedCategory(category);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        // Don't reset selectedCategory here to preserve data for form operations
    };

    const handleEdit = () => {
        if (selectedCategory) {
            setFormMode('edit');
            setFormData({
                name: selectedCategory.name,
                slug: selectedCategory.slug,
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

    const handleToggleStatus = () => {
        setStatusDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = async () => {
        if (selectedCategory) {
            try {
                setLoading(true);
                await ginsengService.deleteCategory(selectedCategory._id);
                setSnackbarMessage('Xóa phân loại thành công');
                setSnackbarOpen(true);
                loadCategories(); // Reload categories
                setDeleteDialogOpen(false);
                setSelectedCategory(null);
            } catch (err) {
                console.error('Error deleting category:', err);
                setError('Không thể xóa phân loại');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedCategory(null);
    };

    const handleStatusConfirm = async () => {
        if (selectedCategory) {
            try {
                setLoading(true);
                const newStatus = selectedCategory.status === 'active' ? 'inactive' : 'active';
                await ginsengService.updateCategory({
                    _id: selectedCategory._id,
                    name: selectedCategory.name,
                    slug: selectedCategory.slug,
                    description: selectedCategory.description,
                    status: newStatus
                });
                setSnackbarMessage(`Đã ${newStatus === 'active' ? 'kích hoạt' : 'vô hiệu hóa'} phân loại thành công`);
                setSnackbarOpen(true);
                loadCategories(); // Reload categories
                setStatusDialogOpen(false);
                setSelectedCategory(null);
            } catch (err) {
                console.error('Error updating category status:', err);
                setError('Không thể cập nhật trạng thái phân loại');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleStatusCancel = () => {
        setStatusDialogOpen(false);
        setSelectedCategory(null);
    };

    const handleAddCategory = () => {
        setFormMode('add');
        setFormData({
            name: '',
            slug: '',
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

        // Clear error when user starts typing
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
            newErrors.name = 'Tên phân loại là bắt buộc';
        }

        if (!formData.slug.trim()) {
            newErrors.slug = 'Slug là bắt buộc';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Mô tả là bắt buộc';
        }

        // Check for duplicate name (exclude current category when editing)
        const duplicateName = categories.find(cat =>
            cat.name.toLowerCase() === formData.name.toLowerCase() &&
            (formMode === 'add' || cat._id !== selectedCategory?._id)
        );

        if (duplicateName) {
            newErrors.name = 'Tên phân loại đã tồn tại';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async () => {
        if (validateForm()) {
            try {
                setLoading(true);
                if (formMode === 'add') {
                    await ginsengService.createCategory(formData);
                    setSnackbarMessage('Thêm phân loại thành công');
                } else if (selectedCategory) {
                    await ginsengService.updateCategory({
                        _id: selectedCategory._id,
                        ...formData
                    });
                    setSnackbarMessage('Cập nhật phân loại thành công');
                }
                setSnackbarOpen(true);
                loadCategories(); // Reload categories
                setFormDialogOpen(false);
                setSelectedCategory(null);
                setErrors({});
            } catch (err) {
                console.error('Error submitting category:', err);
                setError(formMode === 'add' ? 'Không thể thêm phân loại' : 'Không thể cập nhật phân loại');
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

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box>
            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Phân loại Sâm ({categories.length})
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
                    Thêm Phân loại
                </Button>
            </Box>

            {/* Categories Grid */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {loading ? (
                    <Grid item xs={12} sx={{ textAlign: 'center', py: 4 }}>
                        <CircularProgress />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Đang tải dữ liệu...
                        </Typography>
                    </Grid>
                ) : categories.length === 0 ? (
                    <Grid item xs={12} sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                            Không có phân loại nào
                        </Typography>
                    </Grid>
                ) : (
                    categories.map((category) => (
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
                                            Số sản phẩm: {category.productCount}
                                        </Typography>
                                        <Chip
                                            label={getStatusLabel(category.status)}
                                            color={getStatusColor(category.status) as 'success' | 'warning' | 'error' | 'default' | 'primary' | 'secondary' | 'info'}
                                            size="small"
                                        />
                                    </Box>

                                    <Typography variant="caption" color="text.secondary">
                                        Tạo: {new Date(category.createdAt).toLocaleDateString('vi-VN')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>

            {/* Detailed Table */}
            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Chi tiết Phân loại
                    </Typography>
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tên phân loại</TableCell>
                                    <TableCell>Mô tả</TableCell>
                                    <TableCell align="center">Số sản phẩm</TableCell>
                                    <TableCell align="center">Trạng thái</TableCell>
                                    <TableCell align="center">Ngày tạo</TableCell>
                                    <TableCell align="center">Hành động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                            <CircularProgress />
                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                Đang tải dữ liệu...
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : categories.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Không có phân loại nào
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    categories.map((category) => (
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
                                                <Typography variant="body2">
                                                    {category.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {category.productCount}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={getStatusLabel(category.status)}
                                                    color={getStatusColor(category.status) as 'success' | 'warning' | 'error' | 'default' | 'primary' | 'secondary' | 'info'}
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
                                    ))
                                )}
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
                    {selectedCategory?.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
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
                        Bạn có chắc chắn muốn xóa phân loại "{selectedCategory?.name}"?
                        Hành động này sẽ ảnh hưởng đến {selectedCategory?.productCount} sản phẩm và không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Hủy</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Status Toggle Confirmation Dialog */}
            <Dialog
                open={statusDialogOpen}
                onClose={handleStatusCancel}
                PaperProps={{
                    sx: { overflow: 'visible' }
                }}
            >
                <DialogTitle>Xác nhận thay đổi trạng thái</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn {selectedCategory?.status === 'active' ? 'vô hiệu hóa' : 'kích hoạt'} phân loại "{selectedCategory?.name}"?
                        {selectedCategory?.status === 'active' && ' Phân loại này sẽ không hiển thị trong danh sách sản phẩm.'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleStatusCancel}>Hủy</Button>
                    <Button
                        onClick={handleStatusConfirm}
                        color={selectedCategory?.status === 'active' ? 'warning' : 'success'}
                        variant="contained"
                    >
                        {selectedCategory?.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
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
                    {formMode === 'add' ? '🏷️ Thêm Phân loại Mới' : '✏️ Chỉnh sửa Phân loại'}
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tên phân loại"
                                value={formData.name}
                                onChange={handleFormChange('name')}
                                error={!!errors.name}
                                helperText={errors.name}
                                placeholder="VD: Sâm Ngọc Linh"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Slug"
                                value={formData.slug}
                                onChange={handleFormChange('slug')}
                                error={!!errors.slug}
                                helperText={errors.slug || "URL-friendly identifier (VD: sam-ngoc-linh)"}
                                placeholder="VD: sam-ngoc-linh"
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
                                placeholder="Mô tả chi tiết về phân loại sâm này..."
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
                        {formMode === 'add' ? 'Thêm phân loại' : 'Cập nhật'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default GinsengCategories;
