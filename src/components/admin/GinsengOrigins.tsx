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
    Avatar,
    Alert,
    CircularProgress,
    Snackbar,
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    LocationOn as LocationIcon,
} from '@mui/icons-material';
import { ginsengService } from '../../services/admin/ginsengService';
import type { GinsengOrigin } from '../../services/admin/ginsengService';

const GinsengOrigins: React.FC = () => {
    const [origins, setOrigins] = useState<GinsengOrigin[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedOrigin, setSelectedOrigin] = useState<GinsengOrigin | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        description: '',
        status: 'active' as 'active' | 'inactive',
        flag: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Load origins on component mount
    useEffect(() => {
        loadOrigins();
    }, []);

    const loadOrigins = async () => {
        try {
            setLoading(true);
            setError(null);
            const originsData = await ginsengService.getOrigins();
            setOrigins(originsData);
        } catch (err) {
            console.error('Error loading origins:', err);
            setError('Không thể tải danh sách xuất xứ');
        } finally {
            setLoading(false);
        }
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, origin: GinsengOrigin) => {
        setAnchorEl(event.currentTarget);
        setSelectedOrigin(origin);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        // Don't reset selectedOrigin here to preserve data for form operations
    };

    const handleEdit = () => {
        if (selectedOrigin) {
            setFormMode('edit');
            setFormData({
                name: selectedOrigin.name,
                country: selectedOrigin.country,
                description: selectedOrigin.description,
                status: selectedOrigin.status,
                flag: selectedOrigin.flag || ''
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
        if (selectedOrigin) {
            try {
                setLoading(true);
                await ginsengService.deleteOrigin(selectedOrigin._id);
                setSnackbarMessage('Xóa xuất xứ thành công');
                setSnackbarOpen(true);
                loadOrigins(); // Reload origins
                setDeleteDialogOpen(false);
                setSelectedOrigin(null);
            } catch (err) {
                console.error('Error deleting origin:', err);
                setError('Không thể xóa xuất xứ');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedOrigin(null);
    };

    const handleStatusConfirm = async () => {
        if (selectedOrigin) {
            try {
                setLoading(true);
                const newStatus = selectedOrigin.status === 'active' ? 'inactive' : 'active';
                await ginsengService.updateOrigin({
                    _id: selectedOrigin._id,
                    name: selectedOrigin.name,
                    country: selectedOrigin.country,
                    description: selectedOrigin.description,
                    status: newStatus,
                    flag: selectedOrigin.flag
                });
                setSnackbarMessage(`Đã ${newStatus === 'active' ? 'kích hoạt' : 'vô hiệu hóa'} xuất xứ thành công`);
                setSnackbarOpen(true);
                loadOrigins(); // Reload origins
                setStatusDialogOpen(false);
                setSelectedOrigin(null);
            } catch (err) {
                console.error('Error updating origin status:', err);
                setError('Không thể cập nhật trạng thái xuất xứ');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleStatusCancel = () => {
        setStatusDialogOpen(false);
        setSelectedOrigin(null);
    };

    const handleAddOrigin = () => {
        setFormMode('add');
        setFormData({
            name: '',
            country: '',
            description: '',
            status: 'active',
            flag: ''
        });
        setErrors({});
        setFormDialogOpen(true);
    };

    const handleFormClose = () => {
        setFormDialogOpen(false);
        setSelectedOrigin(null);
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
            newErrors.name = 'Tên xuất xứ là bắt buộc';
        }

        if (!formData.country.trim()) {
            newErrors.country = 'Tên quốc gia là bắt buộc';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Mô tả là bắt buộc';
        }

        // Check for duplicate name (exclude current origin when editing)
        const duplicateName = origins.find(origin =>
            origin.name.toLowerCase() === formData.name.toLowerCase() &&
            (formMode === 'add' || origin._id !== selectedOrigin?._id)
        );

        if (duplicateName) {
            newErrors.name = 'Tên xuất xứ đã tồn tại';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async () => {
        if (validateForm()) {
            try {
                setLoading(true);
                if (formMode === 'add') {
                    await ginsengService.createOrigin(formData);
                    setSnackbarMessage('Thêm xuất xứ thành công');
                } else if (selectedOrigin) {
                    await ginsengService.updateOrigin({
                        _id: selectedOrigin._id,
                        ...formData
                    });
                    setSnackbarMessage('Cập nhật xuất xứ thành công');
                }
                setSnackbarOpen(true);
                loadOrigins(); // Reload origins
                setFormDialogOpen(false);
                setSelectedOrigin(null);
                setErrors({});
            } catch (err) {
                console.error('Error submitting origin:', err);
                setError(formMode === 'add' ? 'Không thể thêm xuất xứ' : 'Không thể cập nhật xuất xứ');
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
                    Xuất xứ Sâm ({origins.length})
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddOrigin}
                    sx={{
                        backgroundColor: '#E7C873',
                        color: '#000',
                        '&:hover': {
                            backgroundColor: '#d4b86a',
                        },
                    }}
                >
                    Thêm Xuất xứ
                </Button>
            </Box>

            {/* Origins Grid */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {loading ? (
                    <Grid item xs={12} sx={{ textAlign: 'center', py: 4 }}>
                        <CircularProgress />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Đang tải dữ liệu...
                        </Typography>
                    </Grid>
                ) : origins.length === 0 ? (
                    <Grid item xs={12} sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                            Không có xuất xứ nào
                        </Typography>
                    </Grid>
                ) : (
                    origins.map((origin) => (
                        <Grid item xs={12} md={6} lg={4} key={origin._id}>
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
                                            {origin.flag ? (
                                                <Typography variant="h6">{origin.flag}</Typography>
                                            ) : (
                                                <LocationIcon sx={{ color: '#E7C873' }} />
                                            )}
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    {origin.name}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {origin.country}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleMenuOpen(e, origin)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </Box>

                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 60 }}>
                                        {origin.description}
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            Số sản phẩm: {origin.productCount}
                                        </Typography>
                                        <Chip
                                            label={getStatusLabel(origin.status)}
                                            color={getStatusColor(origin.status) as any}
                                            size="small"
                                        />
                                    </Box>

                                    <Typography variant="caption" color="text.secondary">
                                        Tạo: {new Date(origin.createdAt).toLocaleDateString('vi-VN')}
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
                        Chi tiết Xuất xứ
                    </Typography>
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Xuất xứ</TableCell>
                                    <TableCell>Quốc gia</TableCell>
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
                                        <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                            <CircularProgress />
                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                Đang tải dữ liệu...
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : origins.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Không có xuất xứ nào
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    origins.map((origin) => (
                                        <TableRow key={origin._id} hover>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    {origin.flag ? (
                                                        <Avatar sx={{ width: 32, height: 32, fontSize: '1.2rem' }}>
                                                            {origin.flag}
                                                        </Avatar>
                                                    ) : (
                                                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#E7C873' }}>
                                                            <LocationIcon />
                                                        </Avatar>
                                                    )}
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                        {origin.name}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {origin.country}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ maxWidth: 300 }}>
                                                    {origin.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {origin.productCount}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={getStatusLabel(origin.status)}
                                                    color={getStatusColor(origin.status) as any}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2">
                                                    {new Date(origin.createdAt).toLocaleDateString('vi-VN')}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    onClick={(e) => handleMenuOpen(e, origin)}
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
                    <LocationIcon sx={{ mr: 1 }} />
                    {selectedOrigin?.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
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
                        Bạn có chắc chắn muốn xóa xuất xứ "{selectedOrigin?.name}"?
                        Hành động này sẽ ảnh hưởng đến {selectedOrigin?.productCount} sản phẩm và không thể hoàn tác.
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
                        Bạn có chắc chắn muốn {selectedOrigin?.status === 'active' ? 'vô hiệu hóa' : 'kích hoạt'} xuất xứ "{selectedOrigin?.name}"?
                        {selectedOrigin?.status === 'active' && ' Xuất xứ này sẽ không hiển thị trong danh sách sản phẩm.'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleStatusCancel}>Hủy</Button>
                    <Button
                        onClick={handleStatusConfirm}
                        color={selectedOrigin?.status === 'active' ? 'warning' : 'success'}
                        variant="contained"
                    >
                        {selectedOrigin?.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
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
                    {formMode === 'add' ? '🌍 Thêm Xuất xứ Mới' : '✏️ Chỉnh sửa Xuất xứ'}
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Tên xuất xứ"
                                value={formData.name}
                                onChange={handleFormChange('name')}
                                error={!!errors.name}
                                helperText={errors.name}
                                placeholder="VD: Kontum, Korea"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Quốc gia"
                                value={formData.country}
                                onChange={handleFormChange('country')}
                                error={!!errors.country}
                                helperText={errors.country}
                                placeholder="VD: Việt Nam, Hàn Quốc"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Emoji cờ (tùy chọn)"
                                value={formData.flag}
                                onChange={handleFormChange('flag')}
                                placeholder="VD: 🇻🇳, 🇰🇷, 🇨🇦"
                                helperText="Thêm emoji cờ quốc gia để hiển thị đẹp hơn"
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
                                placeholder="Mô tả chi tiết về vùng xuất xứ, khí hậu, chất lượng sâm..."
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
                        {formMode === 'add' ? 'Thêm xuất xứ' : 'Cập nhật'}
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

export default GinsengOrigins;
