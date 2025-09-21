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
    Avatar,
} from '@mui/material';
import {
    Add as AddIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    LocationOn as LocationIcon,
} from '@mui/icons-material';

interface GinsengOrigin {
    id: number;
    name: string;
    country: string;
    description: string;
    productCount: number;
    status: 'active' | 'inactive';
    createdAt: string;
    flag?: string;
}

const GinsengOrigins: React.FC = () => {
    const [origins, setOrigins] = useState<GinsengOrigin[]>([
        {
            id: 1,
            name: 'Kontum',
            country: 'Việt Nam',
            description: 'Vùng núi Ngọc Linh, Kontum - nơi có khí hậu và đất đai lý tưởng cho sâm Ngọc Linh',
            productCount: 18,
            status: 'active',
            createdAt: '2024-01-15',
            flag: '🇻🇳'
        },
        {
            id: 2,
            name: 'Korea',
            country: 'Hàn Quốc',
            description: 'Các tỉnh Gangwon, Chungbuk của Hàn Quốc - nơi sản xuất sâm chất lượng cao',
            productCount: 12,
            status: 'active',
            createdAt: '2024-01-10',
            flag: '🇰🇷'
        },
        {
            id: 3,
            name: 'Canada',
            country: 'Canada',
            description: 'Tỉnh Ontario và British Columbia - sâm Canada có chất lượng xuất khẩu',
            productCount: 5,
            status: 'active',
            createdAt: '2024-01-08',
            flag: '🇨🇦'
        },
        {
            id: 4,
            name: 'China',
            country: 'Trung Quốc',
            description: 'Các tỉnh Jilin, Liaoning - vùng truyền thống trồng sâm của Trung Quốc',
            productCount: 8,
            status: 'inactive',
            createdAt: '2024-01-05',
            flag: '🇨🇳'
        },
        {
            id: 5,
            name: 'USA',
            country: 'Mỹ',
            description: 'Wisconsin và các bang phía bắc - sâm Mỹ có hương vị đặc trưng',
            productCount: 3,
            status: 'active',
            createdAt: '2024-01-03',
            flag: '🇺🇸'
        },
    ]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedOrigin, setSelectedOrigin] = useState<GinsengOrigin | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        description: '',
        status: 'active' as const,
        flag: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, origin: GinsengOrigin) => {
        setAnchorEl(event.currentTarget);
        setSelectedOrigin(origin);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedOrigin(null);
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

    const handleDeleteConfirm = () => {
        if (selectedOrigin) {
            setOrigins(origins.filter(origin => origin.id !== selectedOrigin.id));
            setDeleteDialogOpen(false);
            setSelectedOrigin(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
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
            (formMode === 'add' || origin.id !== selectedOrigin?.id)
        );

        if (duplicateName) {
            newErrors.name = 'Tên xuất xứ đã tồn tại';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = () => {
        if (validateForm()) {
            if (formMode === 'add') {
                const newOrigin: GinsengOrigin = {
                    id: Math.max(...origins.map(o => o.id)) + 1,
                    name: formData.name,
                    country: formData.country,
                    description: formData.description,
                    status: formData.status,
                    flag: formData.flag,
                    productCount: 0,
                    createdAt: new Date().toISOString().split('T')[0],
                };
                setOrigins([...origins, newOrigin]);
            } else if (formMode === 'edit' && selectedOrigin) {
                setOrigins(origins.map(origin =>
                    origin.id === selectedOrigin.id
                        ? {
                            ...origin,
                            name: formData.name,
                            country: formData.country,
                            description: formData.description,
                            status: formData.status,
                            flag: formData.flag
                        }
                        : origin
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
                {origins.map((origin) => (
                    <Grid item xs={12} md={6} lg={4} key={origin.id}>
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
                ))}
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
                                {origins.map((origin) => (
                                    <TableRow key={origin.id} hover>
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
        </Box>
    );
};

export default GinsengOrigins;
