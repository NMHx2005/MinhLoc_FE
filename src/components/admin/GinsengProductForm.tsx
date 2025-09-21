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
    InputAdornment,
    Avatar,
    IconButton,
} from '@mui/material';
import {
    CloudUpload as UploadIcon,
    Photo as PhotoIcon,
} from '@mui/icons-material';

interface GinsengProduct {
    id: number;
    name: string;
    category: string;
    origin: string;
    price: number;
    stock: number;
    status: 'active' | 'inactive' | 'out_of_stock';
    description: string;
    image: string;
    createdAt: string;
    weight: string;
    grade: string;
}

interface GinsengProductFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<GinsengProduct>) => void;
    mode: 'add' | 'edit';
    initialData?: GinsengProduct | null;
}

const GinsengProductForm: React.FC<GinsengProductFormProps> = ({
    open,
    onClose,
    onSubmit,
    mode,
    initialData
}) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        origin: '',
        price: 0,
        stock: 0,
        status: 'active' as const,
        description: '',
        image: '/placeholder-ginseng.jpg',
        weight: '',
        grade: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialData && mode === 'edit') {
            setFormData({
                name: initialData.name,
                category: initialData.category,
                origin: initialData.origin,
                price: initialData.price,
                stock: initialData.stock,
                status: initialData.status,
                description: initialData.description,
                image: initialData.image,
                weight: initialData.weight,
                grade: initialData.grade,
            });
        } else {
            setFormData({
                name: '',
                category: '',
                origin: '',
                price: 0,
                stock: 0,
                status: 'active',
                description: '',
                image: '/placeholder-ginseng.jpg',
                weight: '',
                grade: '',
            });
        }
        setErrors({});
    }, [initialData, mode, open]);

    const categories = [
        'Sâm Ngọc Linh',
        'Sâm Hàn Quốc',
        'Korean Red',
        'Khác'
    ];

    const origins = [
        'Kontum',
        'Korea',
        'Canada',
        'China',
        'USA'
    ];

    const grades = [
        'Premium',
        'A+',
        'A',
        'B+',
        'B',
        'C'
    ];

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: field === 'price' || field === 'stock' ? Number(value) : value
        }));

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

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Tên sản phẩm là bắt buộc';
        }

        if (!formData.category) {
            newErrors.category = 'Phân loại là bắt buộc';
        }

        if (!formData.origin) {
            newErrors.origin = 'Xuất xứ là bắt buộc';
        }

        if (formData.price <= 0) {
            newErrors.price = 'Giá bán phải lớn hơn 0';
        }

        if (formData.stock < 0) {
            newErrors.stock = 'Số lượng tồn kho không thể âm';
        }

        if (!formData.weight.trim()) {
            newErrors.weight = 'Trọng lượng là bắt buộc';
        }

        if (!formData.grade) {
            newErrors.grade = 'Cấp độ là bắt buộc';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Mô tả là bắt buộc';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
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
                    image: e.target?.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { overflow: 'visible' }
            }}
        >
            <DialogTitle>
                {mode === 'add' ? '🌿 Thêm Sản phẩm Sâm Mới' : '✏️ Chỉnh sửa Sản phẩm Sâm'}
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    {/* Product Image */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="subtitle2" sx={{ mb: 2 }}>
                                Hình ảnh sản phẩm
                            </Typography>
                            <Avatar
                                src={formData.image}
                                sx={{
                                    width: 120,
                                    height: 120,
                                    mx: 'auto',
                                    mb: 2,
                                    bgcolor: '#f5f5f5'
                                }}
                            >
                                <PhotoIcon sx={{ fontSize: 40, color: '#999' }} />
                            </Avatar>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-upload"
                                type="file"
                                onChange={handleImageUpload}
                            />
                            <label htmlFor="image-upload">
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
                        </Box>
                    </Grid>

                    {/* Product Information */}
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Tên sản phẩm"
                                    value={formData.name}
                                    onChange={handleChange('name')}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    placeholder="VD: Sâm Ngọc Linh Cao Cấp"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth error={!!errors.category}>
                                    <InputLabel>Phân loại</InputLabel>
                                    <Select
                                        value={formData.category}
                                        label="Phân loại"
                                        onChange={handleSelectChange('category')}
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
                                <FormControl fullWidth error={!!errors.origin}>
                                    <InputLabel>Xuất xứ</InputLabel>
                                    <Select
                                        value={formData.origin}
                                        label="Xuất xứ"
                                        onChange={handleSelectChange('origin')}
                                    >
                                        {origins.map(origin => (
                                            <MenuItem key={origin} value={origin}>
                                                {origin}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.origin && (
                                        <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                                            {errors.origin}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Giá bán"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange('price')}
                                    error={!!errors.price}
                                    helperText={errors.price}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">đ</InputAdornment>,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Số lượng tồn kho"
                                    type="number"
                                    value={formData.stock}
                                    onChange={handleChange('stock')}
                                    error={!!errors.stock}
                                    helperText={errors.stock}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Trọng lượng"
                                    value={formData.weight}
                                    onChange={handleChange('weight')}
                                    error={!!errors.weight}
                                    helperText={errors.weight}
                                    placeholder="VD: 50g, 100g"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth error={!!errors.grade}>
                                    <InputLabel>Cấp độ</InputLabel>
                                    <Select
                                        value={formData.grade}
                                        label="Cấp độ"
                                        onChange={handleSelectChange('grade')}
                                    >
                                        {grades.map(grade => (
                                            <MenuItem key={grade} value={grade}>
                                                {grade}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.grade && (
                                        <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                                            {errors.grade}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Trạng thái</InputLabel>
                                    <Select
                                        value={formData.status}
                                        label="Trạng thái"
                                        onChange={handleSelectChange('status')}
                                    >
                                        <MenuItem value="active">Đang bán</MenuItem>
                                        <MenuItem value="inactive">Ngừng bán</MenuItem>
                                        <MenuItem value="out_of_stock">Hết hàng</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mô tả sản phẩm"
                                    multiline
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleChange('description')}
                                    error={!!errors.description}
                                    helperText={errors.description}
                                    placeholder="Mô tả chi tiết về sản phẩm sâm..."
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose}>
                    Hủy
                </Button>
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
                    {mode === 'add' ? 'Thêm sản phẩm' : 'Cập nhật'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GinsengProductForm;
